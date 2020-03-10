import django_filters
from onepanman_api.serializers import UserInformationInProblemSerializer
from rest_framework import viewsets

from onepanman_api.models import Game, UserInformationInProblem
from onepanman_api.serializers.game import GameSerializer
from onepanman_api.permissions import IsAdminUser, IsLoggedInUserOrAdmin, OnlyAdminUser
from rest_framework.response import Response


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('problem', 'challenger', 'opposite')

    permission_classes = [OnlyAdminUser]

    def update(self, request, *args, **kwargs):
        data = super().update(request, *args, **kwargs)

        queryset = UserInformationInProblem.objects.all()

        data = data.data
        challenger_id = data["challenger"]
        opposite_id = data["opposite"]
        winner = data["winner"]

        challenger = queryset.filter(user=challenger_id)[0]
        opposite = queryset.filter(user=opposite_id)[0]

        if winner == "challenger":
            challenger_score = challenger.score + 10
            opposite_score = opposite.score - 10

        elif winner == "opposite":
            challenger_score = challenger.score - 10
            opposite_score = opposite.score + 10

        elif winner == "draw":
            challenger_score = challenger.score
            opposite_score = opposite.score

        challenger_data = {
            "user": data["challenger"],
            "code": data["challenger_code"],
            "score": challenger_score,
        }

        opposite_data = {
            "user": data["opposite"],
            "code": data["opposite_code"],
            "score": opposite_score,
        }

        serializer = UserInformationInProblemSerializer(data=challenger_data)
        serializer.is_valid(raise_exception=True)
        challenger_data = serializer.validated_data

        serializer = UserInformationInProblemSerializer(data=opposite_data)
        serializer.is_valid(raise_exception=True)
        opposite_data = serializer.validated_data

        challenger.code = challenger_data["code"]
        challenger.score = challenger_data["score"]

        opposite.code = opposite_data["code"]
        opposite.score = opposite_score["score"]



        challenger.save()
        opposite.save()

        return Response(data)



