from django.contrib.auth.models import User
from onepanman_api.permissions import IsLoggedInUserOrAdmin
from rest_framework import viewsets, status

from onepanman_api.serializers.user import UserSerializer, UserFullInfoSerializer
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [IsLoggedInUserOrAdmin]


class UserFullInfoViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserFullInfoSerializer

    permission_classes = [IsLoggedInUserOrAdmin]

