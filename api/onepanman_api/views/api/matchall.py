import json
import tasks
import threading

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from onepanman_api.models import UserInformationInProblem, Problem, Game
from onepanman_api.util.update_uiip import update_playing
from onepanman_api.views.api import Match


class Matchall(APIView):

    check = False

    def post(self, request, version):

        problemid = int(request.data['problemid'])
        queryset = UserInformationInProblem.objects.all().filter(
            problem=problemid, available_game=True)

        problems = Problem.objects.all().filter(id=problemid)
        problem = problems[0]

        rule = problem.rule
        rule = json.loads(rule)

        for query in queryset:
            print(query.user.username)

        for challenger_ in queryset:
            for opposite_ in queryset:
                challenger = UserInformationInProblem.objects.all().filter(id=challenger_.id)[0]
                opposite = UserInformationInProblem.objects.all().filter(id=opposite_.id)[0]

                if challenger.user.pk == opposite.user.pk:
                    continue

                if challenger.available_game is False or challenger.code.available_game is False:
                    break

                if opposite.available_game is False or opposite.code.available_game is False:
                    continue

                match_info = {
                    "challenger": challenger.user.pk,
                    "opposite": opposite.user.pk,
                    "challenger_code_id": challenger.code.id,
                    "opposite_code_id": opposite.code.id,
                    "challenger_code": challenger.code.code,
                    "opposite_code": opposite.code.code,
                    "challenger_language": challenger.code.language.name,
                    "opposite_language": opposite.code.language.name,
                    "problem": problemid,
                    "obj_num": rule["obj_num"],
                    "placement": rule["placement"],
                    "action": rule["action"],
                    "ending": rule["ending"],
                    "board_size": problem.board_size,
                    "board_info": problem.board_info,
                    "challenger_name": challenger.user.username,
                    "opposite_name": opposite.user.username
                }

                scores = {
                    "challenger": challenger.score,
                    "opposite": opposite.score
                }

                match = Match()

                match_info = match.get_GameId(match_info, scores)

                update_playing(challenger.user.pk, problemid, True)
                update_playing(opposite.user.pk, problemid, True)

                # tasks.play_game.delay(match_info)

                self.timer(match_info['match_id'])

                while self.check is False:
                    pass

                self.check = False

        return Response(status=status.HTTP_200_OK)

    def timer(self, game_id):
        timer = threading.Timer(5, self.timer, [game_id])
        timer.start()

        game = Game.objects.all().filter(id=game_id)[0]

        if game.result != "playing":
            self.check = True
            timer.cancel()


