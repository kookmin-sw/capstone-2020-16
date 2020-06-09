import json

import django_filters
from django.contrib.auth.models import User
from onepanman_api.permissions import UserReadOnly
from rest_framework import viewsets, status

from onepanman_api.models import UserInformationInProblem, UserInfo
from onepanman_api.serializers.userInformationInProblem import UserInformationInProblemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.core import serializers
from rest_framework.views import APIView


class UserInformationInProblemViewSet(viewsets.ModelViewSet):
    queryset = UserInformationInProblem.objects.all().order_by('problem', '-score')
    serializer_class = UserInformationInProblemSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('user', 'problem', 'tier', 'score')
    # ordering_fields = ('user', 'problem', 'score')
    # ordering = ('user',)

    permission_classes = [UserReadOnly]


class MyUserInformationInProblemView(APIView):

    permission_classes = [UserReadOnly]

    def get(self, request, version):

        queryset = UserInformationInProblem.objects.all().filter(user=request.user.pk)
        serializer = UserInformationInProblemSerializer(queryset, many=True)

        return Response(serializer.data)

class rank(APIView):

    def get(self, request, version):

        queryset = UserInformationInProblem.objects.all().filter(problem=request.query_params['problem']).order_by('-score')
        serializer = UserInformationInProblemSerializer(queryset, many=True)

        print(serializer.data[0])
        users = User.objects.all()
        data = serializer.data
        data2 = []
        for i in range(len(data)):
            user = users.filter(pk=data[i]['user'])[0]
            data[i]["username"] = user.username

            rank_data = {
                "user": user.pk,
                "username": user.username,
                "tier": data[i]["tier"],
                "score": data[i]["score"]
            }

            data2.append(rank_data)



        return Response(data2)