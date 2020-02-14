from rest_framework import viewsets

from onepanman_api.models import Code
from onepanman_api.serializers.code import CodeSerializer


class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer