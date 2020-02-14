from rest_framework import serializers

from .. import models


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Game
        fields = ['problem', 'challenger', 'opposite', 'record', 'winner', 'date', 'challenger_code', 'opposite_code']
        