import django_filters
from rest_framework import viewsets

from onepanman_api.models import Article
from onepanman_api.serializers.article import ArticleSerializer, ArticleCommentSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    search_fields = [
        '^title'
    ]

class ArticleCommentViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleCommentSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
