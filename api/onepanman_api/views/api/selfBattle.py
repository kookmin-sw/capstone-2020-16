import json, redis
from .. import tasks
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from onepanman_api.models import UserInformationInProblem, Problem, Code

from onepanman_api.permissions import selfBattlePermission


class SelfBattle(APIView):

    permission_classes = [selfBattlePermission]

    def post(self, request, *args, **kwargs):

        user = UserInformationInProblem.objects.all().filter(user=request.user.pk, problem=request.data['problem'])[0]
        code = Code.objects.all().filter(id=request.data['code'])[0]
        problem = Problem.objects.all().filter(id=request.data['problem'])[0]
        rule = json.loads(problem.rule)
        try:
            matchInfo = {
                "challenger": user.user.pk,
                "opposite": user.user.pk,
                "challenger_code_id": code.id,
                "opposite_code_id": code.id,
                "challenger_code": code.code,
                "opposite_code": code.code,
                "challenger_language": code.language.name,
                "opposite_language": code.language.name,
                "problem": problem.id,
                "obj_num": rule["obj_num"],
                "placement": rule["placement"],
                "action": rule["action"],
                "ending": rule["ending"],
                "board_size": problem.board_size,
                "board_info": request.data['board_info'],
                "placement_info": request.data['placement_info']
            }
        except Exception as e :
            print("matchInfo_Error : {}".format(e))

        try:
            # celery에 넘겨줌
            result = tasks.play_with_me.delay(matchInfo)

            # redis로 받음
            r = redis.StrictRedis(host="192.168.23.13", port=6379, db=0)
            dict_name = str(user.user.pk) + '_' + str(code.id)
            print(dict_name)

            while r.exists(dict_name) == 0:
                pass
            json_dict = r.get(dict_name).decode('utf-8')
            test_dict = dict(json.loads(json_dict))
        except Exception as e:
            print("redis&celery error : {}".format(e))

        return Response(test_dict, status=status.HTTP_200_OK)
