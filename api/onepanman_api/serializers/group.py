from django.contrib.auth.models import Group
from rest_framework import serializers
from .gruopInfo import GroupInfoSerializer

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['name']


class GroupFullInfoSerializer(serializers.ModelSerializer):

    groupInfo = GroupInfoSerializer(required=False)

    class Meta:
        model = Group
        fields = ['name', 'groupInfo']