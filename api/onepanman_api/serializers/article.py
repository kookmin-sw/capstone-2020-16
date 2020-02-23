from rest_framework import serializers

from .. import models
from .comment import CommentSerializer


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Article
        fields = ['id', 'author', 'title', 'content', 'date', 'tag', 'view', 'like']


class ArticleCommentSerializer(serializers.ModelSerializer):

    comment = CommentSerializer(required=False, many=True)

    class Meta:
        model = models.Article
        fields = ['id', 'author', 'title', 'content', 'date', 'tag', 'view', 'like', 'comment']
