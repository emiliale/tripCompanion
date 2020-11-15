def timestamp_now():
    return datetime.utcnow().replace(tzinfo=timezone.utc).timestamp()
