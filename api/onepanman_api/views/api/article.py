from rest_framework import viewsets

from onepanman_api.models import Article
from onepanman_api.serializers.article import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer