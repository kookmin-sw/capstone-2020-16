from rest_framework import viewsets

from onepanman_api.models import Testcase
from onepanman_api.serializers.testcase import TestcaseSerializer


class TestcaseViewSet(viewsets.ModelViewSet):
    queryset = Testcase
    serializer_class = TestcaseSerializer
