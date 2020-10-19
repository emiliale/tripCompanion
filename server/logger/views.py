from logger.models import Log
from logger.serializers import LogSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class LoggerViewSet(ModelViewSet):

    queryset = Log.objects.filter(system="dummy")
    serializer_class = LogSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        return Log.objects.all().order_by("-created")

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        paginator = LimitOffsetPagination()
        log_page = paginator.paginate_queryset(queryset, self.request)

        serializer = self.get_serializer(log_page, many=True)
        return Response(serializer.data)
