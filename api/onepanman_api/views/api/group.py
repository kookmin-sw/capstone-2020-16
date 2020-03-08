from django.contrib.auth.models import Group
from onepanman_api.permissions import IsAdminUser, IsLoggedInUserOrAdmin, UserReadOnly
from rest_framework import viewsets
from onepanman_api.serializers.group import GroupSerializer, GroupFullInfoSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    permission_classes = [UserReadOnly]


class GroupFullInfoViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('groupInfo__ranking')
    serializer_class = GroupFullInfoSerializer

    permission_classes = [UserReadOnly]
