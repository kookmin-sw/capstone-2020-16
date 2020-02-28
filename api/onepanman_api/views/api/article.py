import django_filters
from rest_framework import viewsets, filters

from onepanman_api.models import Article
from onepanman_api.serializers.article import ArticleSerializer, ArticleCommentSerializer


class CustomSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        if request.query_params.get('title_only'):
            return ['title']
        if request.query_params.get('content_only'):
            return ['content']
        if request.query_params.get('author_name_only'):
            return ['author__user_userInfo_user__nickname']

        return super(CustomSearchFilter, self).get_search_fields(view, request)


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, CustomSearchFilter, )
    filter_fields = ('tag',)
    search_fields = ['title', 'content', 'author__user_userInfo_user__nickname']


class ArticleCommentViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleCommentSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.SearchFilter, )
    filter_fields = ('tag',)
    search_fields = ['title', 'content', 'author__user_userInfo_user__nickname']