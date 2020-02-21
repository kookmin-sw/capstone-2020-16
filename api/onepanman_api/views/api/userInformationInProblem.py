import django_filters
from rest_framework import viewsets

from onepanman_api.models import UserInformationInProblem
from onepanman_api.serializers.userInformationInProblem import UserInformationInProblemSerializer


class UserInformationInProblemViewSet(viewsets.ModelViewSet):
    queryset = UserInformationInProblem.objects.all()
    serializer_class = UserInformationInProblemSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['user', 'problem', 'tier']