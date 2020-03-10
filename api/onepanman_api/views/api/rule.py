import django_filters
from onepanman_api.models import Rule
from onepanman_api.serializers import RuleSerializer
from rest_framework import viewsets


class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('ruleClass', 'ruleType')
