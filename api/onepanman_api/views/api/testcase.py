import django_filters
from rest_framework import viewsets

from onepanman_api.models import Testcase
from onepanman_api.serializers.testcase import TestcaseSerializer


class TestcaseViewSet(viewsets.ModelViewSet):
    queryset = Testcase.objects.all()
    serializer_class = TestcaseSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('problem', )
