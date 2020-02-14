from rest_framework import serializers

from .. import models


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Friend
        fields = ['user1', 'user2', 'isAccept', 'date']