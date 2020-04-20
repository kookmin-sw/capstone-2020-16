from rest_framework import serializers

from .. import models


class GameSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Game
        fields = ['id', 'problem', 'placement_record', 'challenger', 'opposite', 'record', 'winner', 'date',
                  'challenger_code', 'opposite_code', 'result', 'error_msg', 'challenger_score', 'opposite_score',
                  'challenger_name', 'opposite_name']
