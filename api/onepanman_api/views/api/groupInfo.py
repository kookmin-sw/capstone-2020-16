from rest_framework import viewsets

from onepanman_api.models import GroupInfo
from onepanman_api.serializers.gruopInfo import GroupInfoSerializer


class GroupInfoViewSet(viewsets.ModelViewSet):
    queryset = GroupInfo
    serializer_class = GroupInfoSerializer
