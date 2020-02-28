from onepanman_api.models import ProblemRuleInfo
from onepanman_api.serializers import ProblemRuleInfoSerializer
from rest_framework import viewsets


class ProblemRuleInfoViewSet(viewsets.ModelViewSet):
    queryset = ProblemRuleInfo.objects.all()
    serializer_class = ProblemRuleInfoSerializer

