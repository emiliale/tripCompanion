import random
from django.urls import URLPattern, URLResolver


def list_urls(lis, acc=None):
    if acc is None:
        acc = []
    if not lis:
        return
    l = lis[0]
    if isinstance(l, URLPattern):
        yield acc + [str(l.pattern)]
    elif isinstance(l, URLResolver):
        yield from list_urls(l.url_patterns, acc + [str(l.pattern)])
    yield from list_urls(lis[1:], acc)


def get_status_description(choices, number):
    return [item for item in choices if item[0] == number][0][1]


def get_other_status_randomly(choices, current):
    return random.choice([item for item in choices if item[0] != current])[0]
