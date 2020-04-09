from django.contrib.auth.models import Group
from onepanman_api.permissions import LeaderandAdmin
from rest_framework import viewsets
from onepanman_api.serializers.group import GroupSerializer, GroupFullInfoSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    permission_classes = [LeaderandAdmin]


class GroupFullInfoViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('groupInfo__ranking')
    serializer_class = GroupFullInfoSerializer

    permission_classes = [LeaderandAdmin]

    def create(self, request, *args, **kwargs):
        _mutable = request.data._mutable
        request.data._mutable = True
        request.data['groupInfo.leader'] = request.user.pk
        request.data._mutable = _mutable

        return super().create(request, *args, **kwargs)

