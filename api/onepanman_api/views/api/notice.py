from rest_framework import viewsets

from onepanman_api.models import Notice
from onepanman_api.serializers.notice import NoticeSerializer


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice
    serializer_class = NoticeSerializer
