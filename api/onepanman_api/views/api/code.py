import django_filters
from rest_framework import viewsets

from onepanman_api.models import Code
from onepanman_api.serializers.code import CodeSerializer
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView

from onepanman_api.permissions import CodePermission


class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('author', 'problem', 'available_game')

    permission_classes = [CodePermission]

    def create(self, request, *args, **kwargs):
        data = super().create(request, *args, **kwargs)

        # 여기서 celery 코드 추가!

        return Response(data.data)

class MyCodeView(APIView):

    permission_classes = [CodePermission]

    def get(self, request, version):

        queryset = Code.objects.all().filter(author=request.user.pk)
        serializer = CodeSerializer(queryset, many=True)

        return Response(serializer.data)
