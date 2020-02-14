from rest_framework import viewsets

from onepanman_api.models import UserInformationInProblem
from onepanman_api.serializers.userInformationInProblem import UserInformationInProblemSerializer


class UserInformationInProblemViewSet(viewsets.ModelViewSet):
    queryset = UserInformationInProblem
    serializer_class = UserInformationInProblemSerializer
