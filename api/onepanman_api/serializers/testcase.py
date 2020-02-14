from rest_framework import serializers

from .. import models


class TestcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Testcase
        fields = ['problem', 'testcase_index', 'testcase' ]