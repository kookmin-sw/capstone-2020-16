from django.contrib.auth.models import User
from rest_framework import serializers
from .userInfo import UserInfoSerializer
from ..models import UserInfo


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email']


class UserFullInfoSerializer(serializers.ModelSerializer):

    userInfo = UserInfoSerializer(required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'userInfo']

    def create(self, validated_data):
        userInfo_data = validated_data.pop('userInfo')
        user = User.objects.create(**validated_data)
        userInfo = UserInfo.objects.create(user=user, **userInfo_data)

        return user