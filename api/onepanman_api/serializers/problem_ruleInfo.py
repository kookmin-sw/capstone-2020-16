from onepanman_api.models.problem_ruleInfo import ProblemRuleInfo
from rest_framework import serializers


class ProblemRuleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemRuleInfo
        fields = ['id', 'problem', 'rule']
