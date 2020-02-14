from rest_framework import viewsets

from onepanman_api.models import Friend
from onepanman_api.serializers.friend import FriendSerializer


class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend
    serializer_class = FriendSerializer