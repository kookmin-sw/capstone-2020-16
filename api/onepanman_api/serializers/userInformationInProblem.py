from rest_framework import serializers

from .. import models


class UserInformationInProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserInformationInProblem
        fields = ['id', 'user', 'problem', 'score', 'tier', 'code', 'available_game']
