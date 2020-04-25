import json

from onepanman_api import serializers
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from onepanman_api.models import UserInformationInProblem, Problem, Game, Code
import random
import tasks

from onepanman_api.util.create_uiip import create_instance

from onepanman_api.util.update_uiip import update_playing


class GetCoreResponse(Response):

    def close(self):
        matchInfo = self.data

        # uiip objects playing...
        challenger = matchInfo["challenger"]
        opposite = matchInfo["opposite"]
        problemid = matchInfo["problem"]
        status = True

        update_playing(challenger, problemid, status)
        update_playing(opposite, problemid, status)

        # 여기에 celery 호출하는 코드!
        result = tasks.play_game.delay(matchInfo)




class Match(APIView):

    permission_classes = [IsAuthenticated]

    # 유저와 문제정보로 상대방을 매칭하고, 매칭 정보를 반환하는 함수
    def match(self, userid, problemid, codeid):

        queryset_up = UserInformationInProblem.objects.all().select_related('code').filter(problem=problemid, playing=False).order_by('-score')
        challenger = queryset_up.filter(user=userid)

        exclude_list =[]
        for i in range(len(queryset_up)):
            code_ = queryset_up[i].code
            if code_.available_game is False:
                exclude_list.append(queryset_up[i].id)

        for e_id in exclude_list:
            queryset_up.exclude(id=e_id)

        challenger_code = Code.objects.all().filter(id=codeid)[0]

        # 유저가 게임중이면
        if len(challenger) < 1:
            return {'error': '유저가 게임중입니다'}, 0

        challenger = challenger[0]

        queryset_up = queryset_up.exclude(user=userid)

        high_scores = queryset_up.filter(score__gte=challenger.score).order_by('-score')
        low_scores  = queryset_up.filter(score__lte=challenger.score).order_by('-score')

        for i in range(5):
            try:
                if len(queryset_up) < 1:
                    return {"error": "게임을 진행할 코드가 없습니다."}, 0

                # elif len(queryset_up) < 6:     # 게임을 플레이한 사람이 6명 미만인 경우
                opposite_index = random.randint(0, len(queryset_up)-1)

                opposite = queryset_up[opposite_index]

                # elif len(high_scores) < 3:  # challenger가 top3인 경우 ( 위에 3명이 없는 경우 )
                #     opposite_list = high_scores[:]
                #     low_range = (3 + (3 - len(high_scores)))
                #     opposite_list += low_scores[:low_range]
                #     opposite_index = random.randint(0, 5)
                #
                #     opposite = opposite_list[opposite_index]
                #
                # elif len(low_scores) < 3:  # challenger가 최하위권인 경우 ( 아래에 3명이 없는 경우 )
                #     opposite_list = low_scores[:]
                #     high_range = len(high_scores) - (3 + (3 - len(low_scores)))
                #     opposite_list += high_scores[high_range:]
                #     opposite_index = random.randint(0, 5)
                #     # print("low length : {} , high length : {} , index : {} , list length : {} , high range : {}".format(len(low_scores), len(high_scores), opposite_index, len(opposite_list), high_range))
                #     opposite = opposite_list[opposite_index]
                #
                # else:
                #     high_range = len(high_scores) -3
                #     opposite_list = high_scores[high_range:] + low_scores[:3]
                #     opposite_index = random.randint(0, 5)
                #     opposite = opposite_list[opposite_index]

            except Exception as e:
                print(type(high_scores))
                print(len(high_scores))
                print("매칭 에러 : {}".format(e))

            check, error_msg = self.checkValid(opposite.user.pk, problemid, opposite.code.id)
            if check is True:
                break

        if check is False:
            return {"error": "매칭 상대 없음"}, 0

        # 문제 규칙 정보 추가
        problems = Problem.objects.all().filter(id=problemid)
        problem = problems[0]

        try:
            rule = problem.rule
            rule = json.loads(rule)

        except Exception as e:
            return {'error': 'rule 정보 가져오기 에러'},0
            print("fail to read rule information : {}".format(e))

        matchInfo = {
            "challenger": challenger.user.pk,
            "opposite": opposite.user.pk,
            "challenger_code_id": codeid,
            "opposite_code_id": opposite.code.id,
            "challenger_code": challenger_code.code,
            "opposite_code": opposite.code.code,
            "challenger_language": challenger_code.language.name,
            "opposite_language": opposite.code.language.name,
            "problem": int(problemid),
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
            "opposite": opposite.score,
        }

        #print(matchInfo)

        return matchInfo, scores

    # 게임에 사용될 인스턴스를 만들고, 그 id를 반환하는 함수
    def get_GameId(self, info, scores):
        try:
            matchInfo = info

            data = {
                "problem": matchInfo['problem'],
                "challenger": matchInfo['challenger'],
                "opposite": matchInfo['opposite'],
                "challenger_code": matchInfo['challenger_code_id'],
                "opposite_code": matchInfo['opposite_code_id'],
                "record": "0",
                "challenger_score": scores['challenger'],
                "opposite_score": scores['opposite'],
                "challenger_name": matchInfo['challenger_name'],
                "opposite_name": matchInfo['opposite_name'],
            }



            serializer = serializers.GameSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data

            print(validated_data)

            instance = Game.objects.create(
                problem=validated_data['problem'],
                challenger=validated_data['challenger'],
                opposite=validated_data['opposite'],
                challenger_code=validated_data['challenger_code'],
                opposite_code=validated_data['opposite_code'],
                record=validated_data['record'],
                challenger_score=validated_data['challenger_score'],
                opposite_score=validated_data['opposite_score'],
                challenger_name=validated_data['challenger_name'],
                opposite_name=validated_data['opposite_name']
            )

        except Exception as e:
            print("game data 생성 중 에러 발생 : {}".format(e))
            return {'error' : 'game 생성 error'}


        game_id = instance.id

        matchInfo['match_id'] = game_id

        return matchInfo

    def checkValid(self, userid, problemid, codeid):

        user_code = Code.objects.all().filter(id=codeid, author=userid)
        user_uiip = UserInformationInProblem.objects.all().filter(user=userid, problem=problemid)[0]

        if user_uiip.playing is True:
            error_msg = "user is playing"
            print(error_msg)
            return False, error_msg

        if len(user_code) < 1:
            error_msg = "No exist code"
            print(error_msg)
            return False, error_msg

        user_code = user_code[0]

        available = user_code.available_game

        if available is False:
            error_msg = "No available code"
            print(error_msg)
            return False, error_msg

        problemInCode = user_code.problem.pk

        if int(problemid) is not problemInCode:
            error_msg = "not matching problem with code"
            print(error_msg)
            return False, error_msg

        return True, "OK"

    def post(self, request, version):
        try:

            data = request.data

            userid = data['userid']
            problemid = data['problemid']
            codeid = data['codeid']

        except Exception as e:
            print("get function {}".format(e))
            return Response({"error": "유저, 문제, 코드 정보 가 유효하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        check, error_msg = self.checkValid(userid, problemid, codeid)
        if check is False:
            return Response({"error" : error_msg}, status=status.HTTP_400_BAD_REQUEST)

        matchInfo, scores = self.match(userid, problemid, codeid)

        if "error" in matchInfo:
            return Response(matchInfo, status=status.HTTP_400_BAD_REQUEST)

        matchInfo = self.get_GameId(matchInfo, scores)

        if "error" in matchInfo:
            return Response(matchInfo, status=status.HTTP_400_BAD_REQUEST)

        return GetCoreResponse(matchInfo)








