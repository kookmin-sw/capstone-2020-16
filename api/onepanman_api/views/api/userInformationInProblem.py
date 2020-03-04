import json

import django_filters
from rest_framework import viewsets, status

from onepanman_api.models import UserInformationInProblem
from onepanman_api.serializers.userInformationInProblem import UserInformationInProblemSerializer
from rest_framework.response import Response

from django.core import serializers


class UserInformationInProblemViewSet(viewsets.ModelViewSet):
    queryset = UserInformationInProblem.objects.all().order_by('problem', '-score')
    serializer_class = UserInformationInProblemSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('user', 'problem', 'tier', 'score')
    # ordering_fields = ('user', 'problem', 'score')
    # ordering = ('user',)

    def update(self, request, *args, **kwargs):
        try:
            data = super().update(request, *args, **kwargs)
            self.update_tier(data.data["user"], data.data["problem"])

            result = self.queryset.filter(user=data.data["user"], problem=data.data["problem"])
            result_json = serializers.serialize('json', result)
            result_json = json.loads(result_json)[0]
            result_json = result_json["fields"]

            return Response(result_json, status=status.HTTP_200_OK)

        except Exception as e:
            print("UPDATE ERROR : {}".format(e))

            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update_tier(self, userid, problemid):
        instance_all = self.queryset.filter(problem=problemid)
        instance = instance_all.filter(user=userid)[0]
        instance_all = instance_all.exclude(user=userid)

        user_score = instance.score

        length_all = len(instance_all)
        instance_high = instance_all.filter(score__gte=user_score)

        print("나보다 높은 사람의 수 : {}".format(len(instance_high)))

        if len(instance_high) == 0:
            instance.tier = "Challenger"

        elif len(instance_high) < length_all/10:
            instance.tier = "Diamond"

        elif len(instance_high) < (length_all/100)*35:
            instance.tier = "Platinum"

        elif len(instance_high) < (length_all/100)*65:
            instance.tier = "Gold"

        elif len(instance_high) < (length_all/100)*90:
            instance.tier = "Silver"

        else :
            instance.tier = "Bronze"

        instance.save()

