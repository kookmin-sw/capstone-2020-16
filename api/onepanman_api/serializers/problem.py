from rest_framework import serializers
from django.contrib.auth.models import User

from .. import models


class ProblemSerializer(serializers.ModelSerializer):

    thumbnail = serializers.ImageField(use_url=True)

    class Meta:
        model = models.Problem
        fields = ['id', 'editor', 'title', 'description', 'limit_time', 'limit_memory', 'date', 'thumbnail', 'rule', 'board_size', 'board_info']
