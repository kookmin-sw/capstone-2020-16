from rest_framework import serializers

from .. import models


class UserInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserInfo
        fields = ['user', 'language', 'heart', 'nickname', 'isCodeOpen', 'group', 'date', 'profileImage']