from rest_framework import serializers

from .. import models


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Article
        fields = ['author', 'title', 'content', 'date', 'tag', 'view', 'like']