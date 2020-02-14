from rest_framework import serializers

from .. import models


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notice
        fields = ['sender', 'receiver', 'title', 'content', 'date', 'isRead']