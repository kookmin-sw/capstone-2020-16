from onepanman_api import models
from rest_framework import serializers


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rule
        fields = ['id', 'ruleClass', 'ruleType', 'number', 'description']
