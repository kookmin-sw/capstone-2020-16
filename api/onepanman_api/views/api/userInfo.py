from rest_framework import viewsets

from onepanman_api.models import UserInfo
from onepanman_api.serializers.userInfo import UserInfoSerializer


class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
