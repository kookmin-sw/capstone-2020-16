from rest_framework import serializers

from .. import models
from .comment import CommentSerializer
from .user import UserFullInfoSerializer


class ArticleSerializer(serializers.ModelSerializer):

    author_name = serializers.CharField(read_only=True, source="author.user_userInfo_user.nickname")

    class Meta:
        model = models.Article
        fields = ['id', 'author', 'author_name', 'title', 'content', 'date', 'tag', 'view', 'like']


class ArticleCommentSerializer(serializers.ModelSerializer):

    comment = CommentSerializer(required=False, many=True)
    author_name = serializers.CharField(read_only=True, source="author.user_userInfo_user.nickname")

    class Meta:
        model = models.Article
        fields = ['id', 'author', 'author_name', 'title', 'content', 'date', 'tag', 'view', 'like', 'comment']
