from django.contrib.auth.models import Group
from rest_framework import viewsets
from onepanman_api.serializers.group import GroupSerializer, GroupFullInfoSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupFullInfoViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('groupInfo__ranking')
    serializer_class = GroupFullInfoSerializer
