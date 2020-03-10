from rest_framework import serializers
from django.contrib.auth.models import User

from .. import models


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Problem
        fields = ['id', 'editor', 'title', 'description', 'limit_time', 'limit_memory', 'date', 'level', 'popularity',
                  'icon', 'thumbnail', 'rule']
