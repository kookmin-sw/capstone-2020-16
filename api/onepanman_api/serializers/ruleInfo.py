from rest_framework import serializers

from .. import models


class RuleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RuleInfo
        fields = ['name', 'description', 'type']