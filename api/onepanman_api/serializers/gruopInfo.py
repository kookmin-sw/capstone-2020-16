from rest_framework import serializers

from .. import models


class GroupInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GroupInfo
        fields = ['group', 'ranking']