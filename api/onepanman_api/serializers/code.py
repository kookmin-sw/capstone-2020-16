from rest_framework import serializers

from .. import models


class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Code
        fields = ['id', 'author', 'problem', 'language', 'name', 'code', 'available_game', 'status', 'date']
