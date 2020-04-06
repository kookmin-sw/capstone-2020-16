from django.contrib.auth.models import Group
from rest_framework import serializers
from .gruopInfo import GroupInfoSerializer
from ..models import GroupInfo


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


class GroupFullInfoSerializer(serializers.ModelSerializer):

    groupInfo = GroupInfoSerializer(required=False)

    class Meta:
        model = Group
        fields = ['name', 'groupInfo']

    def create(self, validated_data):
        groupInfo_data = validated_data.pop('groupInfo')
        group = Group.objects.create(**validated_data)
        groupInfo = GroupInfo.objects.create(group=group, **groupInfo_data)

        return group
