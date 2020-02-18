from django.contrib.auth.models import Group
from rest_framework import viewsets
from onepanman_api.serializers.group import GroupSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group
    serializer_class = GroupSerializer