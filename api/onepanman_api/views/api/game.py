import django_filters

from onepanman_api.serializers import UserInformationInProblemSerializer, CodeSerializer
from rest_framework import viewsets

from onepanman_api.models import Game, UserInformationInProblem, Code
from onepanman_api.serializers.game import GameSerializer

from rest_framework.response import Response

from onepanman_api.views.api.updateScore import update_totalTier, update_tier, update_groupRanking, update_groupScore
from rest_framework.views import APIView

from django.db.models import Q

from onepanman_api.permissions import UserReadOnly

from onepanman_api.permissions import game
from onepanman_api.util.getIp import get_client_ip


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('problem', 'challenger', 'opposite')

    permission_classes = [game]

    def game_score(self, data, c_score, o_score):
        games = self.queryset.filter(id=data["id"])[0]

        game_data = {
            "problem": data["problem"],
            "problem": data['problem'],
            "challenger": data['challenger'],
            "opposite": data['opposite'],
            "challenger_code": data['challenger_code'],
            "opposite_code": data['opposite_code'],
            "record": "0",
            "challenger_name": data['challenger_name'],
            "opposite_name": data['opposite_name'],
            "challenger_score_flu": c_score,
            "opposite_score_flu": o_score
        }

        serializer = self.serializer_class(data=game_data)
        serializer.is_valid(raise_exception=True)
        valid_data = serializer.validated_data

        games.challenger_score_flu = valid_data["challenger_score_flu"]
        games.opposite_score_flu = valid_data["opposite_score_flu"]

        games.save()

    def game_error(self, data):
        result = data["result"]
        print(data)
        queryset = UserInformationInProblem.objects.all()
        codeset = Code.objects.all()

        if result == "challenger_error":
            error_user = queryset.filter(user=data["challenger"], problem=data["problem"])[0]
            normal_user = queryset.filter(user=data["opposite"], problem=data["problem"])[0]
            error_code = codeset.filter(id=data["challenger_code"])[0]
        else:
            error_user = queryset.filter(user=data["opposite"], problem=data["problem"])[0]
            normal_user = queryset.filter(user=data["challenger"], problem=data["problem"])[0]
            error_code = codeset.filter(id=data["opposite_code"])[0]

        try:
            # update code to not available to game
            code_data = {
                "id": error_code.id,
                "author": error_user.pk,
                "language": error_code.language.id,
                "name": error_code.name,
                "available_game": False,
                "problem": error_user.problem.pk,
                "code": error_code.code,
            }

            code_serializer = CodeSerializer(data=code_data)
            code_serializer.is_valid(raise_exception=True)
            valid_code = code_serializer.validated_data

            error_code.available_game = valid_code["available_game"]

        except Exception as e:
            print("game_error - update code error : {}".format(e))

        try:
            # update error user's score
            error_score = error_user.score - 50

            error_user_data = {
                "id": error_user.id,
                "score": error_score,
                "user": error_user.pk,
                "code": error_code.id,
                "available_game": False,
                "playing": False,
            }

            UIIPserializer = UserInformationInProblemSerializer(data=error_user_data)
            UIIPserializer.is_valid(raise_exception=True)
            valid_UIIP = UIIPserializer.validated_data

            error_user.score = valid_UIIP["score"]
            error_user.available_game = valid_UIIP["available_game"]
            error_user.code = valid_UIIP["code"]
            error_user.playing = valid_UIIP["playing"]

        except Exception as e:
            print("game_error - error user's score update error : {}".format(e))

        try:
            # update normal user's score
            normal_score = normal_user.score + 20

            normal_user_data = {
                "id": normal_user.id,
                "score": normal_score,
                "user": normal_user.pk,
                "code": normal_user.code.id,
                "playing": False,
            }

            UIIPserializer = UserInformationInProblemSerializer(data=normal_user_data)
            UIIPserializer.is_valid(raise_exception=True)
            valid_UIIP = UIIPserializer.validated_data

            normal_user.score = valid_UIIP["score"]
            normal_user.code = valid_UIIP["code"]
            normal_user.playing = valid_UIIP["playing"]

        except Exception as e:
            print("game_error - normal user's score error : {}".format(e))

        if result =="challenger_error":
            self.game_score(data, -50, 20)
        else:
            self.game_score(data, 20, -50)

        # save
        error_user.save()
        normal_user.save()
        error_code.save()

    def game_finish(self, data):
        winner = data["winner"]

        queryset = UserInformationInProblem.objects.all()

        challenger = queryset.filter(user=data["challenger"], problem=data["problem"])[0]
        opposite = queryset.filter(user=data["opposite"], problem=data["problem"])[0]

        # bonus score
        score_bonus = challenger.score - opposite.score

        if score_bonus < 0:
            score_bonus = -1*score_bonus

        if score_bonus > 20:
            score_bonus = 20

        # update score
        if winner == "challenger":
            if challenger.score < opposite.score:
                challenger_score_flu = 20 + score_bonus
                opposite_score_flu = -20 - score_bonus
            else :
                challenger_score_flu = 20
                opposite_score_flu = -20
        elif winner == "opposite":
            if challenger.score > opposite.score:
                challenger_score_flu = -20 - score_bonus
                opposite_score_flu = 20 + score_bonus
            else:
                challenger_score_flu = -20
                opposite_score_flu = 20
        elif winner == "draw":
            challenger_score_flu = 0
            opposite_score_flu = 0

        challenger_score = challenger.score + challenger_score_flu
        opposite_score = opposite.score + opposite_score_flu

        self.game_score(data, challenger_score_flu, opposite_score_flu)

        challenger_data = {
            "id": challenger.id,
            "user": challenger.user.pk,
            "score": challenger_score,
            "code": data["challenger_code"],
            "playing": False,
        }

        opposite_data = {
            "id": opposite.id,
            "user": opposite.user.pk,
            "score": opposite_score,
            "code": data["opposite_code"],
            "playing": False,
        }

        try:
            serializer = UserInformationInProblemSerializer(data=challenger_data)
            serializer.is_valid(raise_exception=True)
            challenger_data_validated = serializer.validated_data

            serializer = UserInformationInProblemSerializer(data=opposite_data)
            serializer.is_valid(raise_exception=True)
            opposite_data_validated = serializer.validated_data

            challenger.score = challenger_data_validated["score"]
            challenger.code = challenger_data_validated["code"]
            challenger.playing = challenger_data_validated["playing"]

            opposite.score = opposite_data_validated["score"]
            opposite.code = opposite_data_validated["code"]
            opposite.playing = opposite_data_validated["playing"]

        except Exception as e:
            print("game_finish - update user score & code error : {} ".format(e))

        challenger.save()
        opposite.save()

    def update(self, request, *args, **kwargs):

        data = super().update(request, *args, **kwargs)
        data = data.data
        result = data["result"]

        if result == "playing":
            return Response(data)

        if result == "challenger_error" or result == "opposite_error":
            self.game_error(data)

        if result == "finish":
            self.game_finish(data)


        update_tier(problemid=data["problem"])
        update_totalTier()
        update_groupScore()
        update_groupRanking()

        game_data = Game.objects.all().filter(id=data["id"])[0]
        data["challenger_score_flu"] = game_data.challenger_score_flu
        data["opposite_score_flu"] = game_data.opposite_score_flu
        return Response(data)


class MyGameView(APIView):

    permission_classes = [UserReadOnly]

    def get(self, request, version):

        queryset = Game.objects.all().filter(Q(challenger=request.user.pk) | Q(opposite=request.user.pk))
        serializer = GameSerializer(queryset, many=True)

        return Response(serializer.data)