from rest_framework.routers import SimpleRouter
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from django.http.request import QueryDict
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from django.urls import path


def setSerializer(model, serializer):
    model.__serializer = serializer
    return model


def get_view_set(param, _class, _app_name):
    _class_instance = _class()

    class GenericViewSet(ModelViewSet):
        app_name = "{}".format(_app_name)
        view_name = "{}".format(param)

        queryset = getattr(_class_instance, param).objects.all()
        serializer_class = getattr(getattr(_class_instance, param), "__serializer")

        def get_serializer(self, *args, **kwargs):
            if isinstance(kwargs.get("data", {}), list):
                kwargs["many"] = True

            return super().get_serializer(*args, **kwargs)

        def get_queryset(self, *args, **kwargs):
            request_params = []
            try:
                request_params = self.request._request.GET.items()
            except:
                pass

            _model = getattr(_class_instance, param)
            _model_fields = [f.name for f in _model._meta.get_fields()]

            queryset = _model.objects.all()

            init_filter = {}
            try:
                init_filters = getattr(_class_instance, "_init_filters")
                try:
                    init_filter = init_filters[param]
                except KeyError:
                    pass
            except AttributeError:
                pass

            filter_actions = {
                "get-request-user": self.request.user,
            }

            for filter_key, filter_value in init_filter.items():
                if filter_value in filter_actions.keys():
                    init_filter[filter_key] = filter_actions[filter_value]

            queryset = queryset.filter(**init_filter)

            fltrs = [
                (key, item)
                for (key, item) in request_params
                if key.split("__")[0] in _model_fields
            ]

            filter_dictionary = {}
            for key, item in fltrs:
                if item[0] == "[":
                    item = [value for value in item[1:-1].split(",")]
                filter_dictionary[key] = item
            try:
                queryset = queryset.filter(**filter_dictionary)
            except:
                pass

            return queryset

    return GenericViewSet


def get_router(_class, _app_name):
    router = SimpleRouter()

    for param in get_class_params(_class):
        if param[0] != "_":
            router.register(r"{}".format(param), get_view_set(param, _class, _app_name))

    return router


def get_class_params(_class):
    example = _class()
    members = []
    for attr in dir(example):
        has_serializer = False
        try:
            serializer_class = getattr(getattr(example, attr), "__serializer")
            if serializer_class:
                has_serializer = True
        except AttributeError:
            pass

        if has_serializer and not attr.startswith("_"):
            members.append(attr)

    return members


def get_functionality_view_set(function, _class, _app_name, endpoint_name=None):
    _class_instance = _class()

    class FunctionApiViewSet(APIView):
        app_name = _app_name
        view_name = function
        stripped_name = endpoint_name

        def __unwrap_request_data(self, data):
            if isinstance(data, QueryDict):
                unwrapped_data = {}
                for key, value in data.lists():
                    unwrapped_data[key] = value[0] if len(value) == 1 else value
                return unwrapped_data
            else:
                return data

        def post(self, request):
            func = None
            if self.stripped_name:
                func = getattr(_class_instance, "ajax_post_" + self.stripped_name)
            else:
                func = getattr(_class_instance, function)
            try:
                if self.stripped_name:
                    response_data = func(serialized=True, request=request)
                else:
                    response_data = func(
                        **self.__unwrap_request_data(request.data),
                        serialized=True,
                        request=request
                    )
                if isinstance(response_data, HttpResponse):
                    return response_data
                else:
                    return Response(data=response_data, status=status.HTTP_200_OK)
            except TypeError as e:
                return Response(
                    data={"error": e.args[0]}, status=status.HTTP_400_BAD_REQUEST
                )

        def get(self, request):
            if not self.stripped_name:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

            func = getattr(_class_instance, "ajax_get_" + self.stripped_name)
            try:
                response_data = func(serialized=True, request=request)
                if isinstance(response_data, HttpResponse):
                    return response_data
                else:
                    return Response(data=response_data, status=status.HTTP_200_OK)
            except TypeError as e:
                return Response(
                    data={"error": e.args[0]}, status=status.HTTP_400_BAD_REQUEST
                )

        def delete(self, request, **kwargs):
            if not self.stripped_name:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

            func = getattr(_class_instance, "ajax_delete_" + self.stripped_name)
            try:
                response_data = func(**kwargs, serialized=True, request=request)
                if isinstance(response_data, HttpResponse):
                    return response_data
                else:
                    return Response(data=response_data, status=status.HTTP_200_OK)
            except TypeError as e:
                return Response(
                    data={"error": e.args[0]}, status=status.HTTP_400_BAD_REQUEST
                )

        def put(self, request, **kwargs):
            if not self.stripped_name:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

            func = getattr(_class_instance, "ajax_put_" + self.stripped_name)
            try:
                response_data = func(**kwargs, serialized=True, request=request)
                if isinstance(response_data, HttpResponse):
                    return response_data
                else:
                    return Response(data=response_data, status=status.HTTP_200_OK)
            except TypeError as e:
                return Response(
                    data={"error": e.args[0]}, status=status.HTTP_400_BAD_REQUEST
                )

    return FunctionApiViewSet


def get_functionality_paths(_class, _app_name):
    functionality = []

    for function in get_class_methods(_class):
        if function.startswith("ajax_"):
            splitted = function.split("_")
            method = splitted[1]
            function_name = "_".join(splitted[2:])

            if method in ["put", "delete"]:
                functionality.append(
                    path(
                        r"{}/<int:id>/".format(function_name),
                        get_functionality_view_set(
                            function_name, _class, _app_name, function_name
                        ).as_view(),
                    )
                )
            else:
                functionality.append(
                    path(
                        r"{}/".format(function_name),
                        get_functionality_view_set(
                            function_name, _class, _app_name, function_name
                        ).as_view(),
                    )
                )

        elif function[0] != "_":
            functionality.append(
                path(
                    r"{}/".format(function),
                    get_functionality_view_set(function, _class, _app_name).as_view(),
                )
            )

    return functionality


def get_class_methods(_class):
    example = _class()
    members = []
    for attr in dir(example):
        has_serializer = False
        try:
            serializer_class = getattr(getattr(example, attr), "__serializer")
            if serializer_class:
                has_serializer = True
        except AttributeError:
            pass

        if callable(getattr(example, attr)) and not attr.startswith("_"):
            if not has_serializer:
                members.append(attr)

    return members
