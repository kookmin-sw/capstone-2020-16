from rest_auth.registration.views import RegisterView
from django.contrib.auth.models import User
from onepanman_api.permissions import OnlyMyandAdmin
from rest_framework import viewsets, status

from onepanman_api.serializers.user import UserSerializer, UserFullInfoSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

from onepanman_api.models import UserInfo


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [OnlyMyandAdmin]


class MyUserView(APIView):

    permission_classes = [OnlyMyandAdmin]

    def get(self, request, version):
        instance = User.objects.get(username=request.user.username)
        serializer = UserFullInfoSerializer(instance)

        return Response(serializer.data)


class UserFullInfoViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserFullInfoSerializer

    permission_classes = [OnlyMyandAdmin]

class RegisterView(RegisterView):

    def create(self, request, *args, **kwargs):
        data = super().create(request, *args, **kwargs)
        user = User.objects.filter(pk=data.data['user']['pk'])[0]
        userInfo = UserInfo.objects.create(user=user)

        return Response(data.data, status=status.HTTP_201_CREATED)



