from rest_framework import serializers

from .. import models


class UserInfoSerializer(serializers.ModelSerializer):

    profileImage = serializers.ImageField(use_url=True)

    class Meta:
        model = models.UserInfo
        fields = ['language', 'heart', 'nickname', 'isCodeOpen', 'group', 'date', 'profileImage', 'tier']