import django_filters
from rest_framework import viewsets

from onepanman_api.models import Game, UserInformationInProblem
from onepanman_api.serializers.game import GameSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('problem', 'challenger', 'opposite')

    def create(self, request, *args, **kwargs):
        #print(request.data)
        return super().create(request, *args, **kwargs)


def update_problemTier(userid, problemid):
    queryset = UserInformationInProblem.objects.all().filter(problem=problemid).order_by('-score')
    length = len(queryset)

    user = queryset.filter(user=userid)[0]
    userScore = user.score
    queryset = queryset.exclude(user=userid)

    highs = queryset.filter(score__gte=userScore)

    if len(highs) == 0:
        user.tier = "Challenger"
        return

    if len(highs) < length/10:
        user.tier = "Diamond"
        return



