from django.contrib.auth.models import User
from rest_framework import serializers
from .userInfo import UserInfoSerializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model  = User
        fields = ['username', 'email']


class UserFullInfoSerializer(serializers.ModelSerializer):

    user_userInfo_user = UserInfoSerializer(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'user_userInfo_user']