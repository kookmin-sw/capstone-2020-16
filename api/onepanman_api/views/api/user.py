from django.contrib.auth.models import User
from onepanman_api.permissions import IsLoggedInUserOrAdmin, OnlyMyandAdmin
from rest_framework import viewsets, status

from onepanman_api.serializers.user import UserSerializer, UserFullInfoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #permission_classes = [IsLoggedInUserOrAdmin]

class MyUserView(APIView):

    #permission_classes = [OnlyMyandAdmin]

    def get(self, request, version):
        instance = User.objects.get(username=request.user.username)
        serializer = UserFullInfoSerializer(instance)

        return Response(serializer.data)

class UserFullInfoViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserFullInfoSerializer

    #permission_classes = [IsLoggedInUserOrAdmin]

