import django_filters
from rest_framework import viewsets

from onepanman_api.models import Code
from onepanman_api.serializers.code import CodeSerializer


class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('author', 'problem', 'available_game', )