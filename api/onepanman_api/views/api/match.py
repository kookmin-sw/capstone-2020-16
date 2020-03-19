import json

from onepanman_api import serializers
from onepanman_api.permissions import IsAdminUser, OnlyAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from onepanman_api.models import UserInformationInProblem, Problem, Game
import random


class GetCoreResponse(Response):

    def close(self):
        matchInfo = self.data

        # 여기에 celery 호출하는 코드!

        result = play_game(matchInfo).delay()


class Match(APIView):

    permission_classes = [OnlyAdminUser]

    # 유저와 문제정보로 상대방을 매칭하고, 매칭 정보를 반환하는 함수
    def match(self, userid, problemid, codeid):

        queryset_up = UserInformationInProblem.objects.all().filter(problem=problemid, available_game=True).order_by('-score')
        challenger = queryset_up.filter(user=userid)

        # 유저가 이 문제가 처음일 경우
        if len(challenger) < 1:
            challenger = self.create_instance(userid, problemid, codeid)

            if not challenger:
                return False

            create_challenger = True

        else:
            challenger = challenger[0]
            create_challenger = False

        queryset_up = queryset_up.exclude(user=userid)

        high_scores = queryset_up.filter(score__gte=challenger.score).order_by('-score')
        low_scores  = queryset_up.filter(score__lte=challenger.score).order_by('-score')

        try:
            if len(queryset_up) < 6:     # 게임을 플레이한 사람이 6명 미만인 경우
                opposite_index = random.randint(0, len(queryset_up)-1)

                opposite = queryset_up[opposite_index]

            elif create_challenger:  # challenger가 이 게임이 첫판인 경우
                middle = int(len(queryset_up) / 2)
                opposite_index = random.randint(-2, 3) + middle
                opposite = queryset_up[opposite_index]

            elif len(high_scores) < 3:  # challenger가 top3인 경우 ( 위에 3명이 없는 경우 )
                opposite_list = high_scores[:]
                low_range = (3 + (3 - len(high_scores)))
                opposite_list += low_scores[:low_range]
                opposite_index = random.randint(0, 5)

                opposite = opposite_list[opposite_index]

            elif len(low_scores) < 3:  # challenger가 최하위권인 경우 ( 아래에 3명이 없는 경우 )
                opposite_list = low_scores[:]
                high_range = len(high_scores) - (3 + (3 - len(low_scores)))
                opposite_list += high_scores[high_range:]
                opposite_index = random.randint(0, 5)
                # print("low length : {} , high length : {} , index : {} , list length : {} , high range : {}".format(len(low_scores), len(high_scores), opposite_index, len(opposite_list), high_range))
                opposite = opposite_list[opposite_index]

            else:
                opposite_list = high_scores[-3:] + low_scores[:3]
                opposite_index = random.randint(0,5)
                opposite = opposite_list[opposite_index]

        except Exception as e:
            print("매칭 에러 : {}".format(e))



        # 문제 규칙 정보 추가
        problems = Problem.objects.all().filter(id=problemid)
        problem = problems[0]

        try:
            rule = problem.rule
            rule = json.loads(rule)

        except Exception as e:
            print("fail to read rule information : {}".format(e))

        matchInfo = {
            "challenger": challenger.user.pk,
            "opposite": opposite.user.pk,
            "challenger_code_id": challenger.code.id,
            "opposite_code_id": opposite.code.id,
            "challenger_code": challenger.code.code,
            "opposite_code": opposite.code.code,
            "challenger_language": challenger.code.language.name,
            "opposite_language": opposite.code.language.name,
            "problem": int(problemid),
            "obj_num": rule["obj_num"],
            "placement": rule["placement"],
            "action": rule["action"],
            "ending": rule["ending"],
            "board_size": problem.board_size,
            "board_info": problem.board_info,
        }

        scores = {
            "challenger": challenger.score,
            "opposite": opposite.score,
        }

        #print(matchInfo)

        return matchInfo, scores

    # 게임에 사용될 인스턴스를 만들고, 그 id를 반환하는 함수
    def get_GameId(self, info, scores):
        print(scores)
        print(type(scores))
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
            )

        except Exception as e:
            print("game data 생성 중 에러 발생 : {}".format(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)


        game_id = instance.id

        matchInfo['match_id'] = game_id

        return matchInfo

    # UserInformationInProblem instance를 만드는 함수
    def create_instance(self, userid, problemid, codeid):
        try :
            data = {
                "user": userid,
                "problem": problemid,
                "code": codeid,
                "tier": "Bronze",
                "score": 50,
            }

            serializer = serializers.UserInformationInProblemSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data

            instance = UserInformationInProblem.objects.create(
                user=validated_data["user"],
                problem=validated_data["problem"],
                code=validated_data["code"],
                tier=validated_data["tier"],
                score=validated_data["score"],
            )

            return instance
        except Exception as e:
            print("Error: create UserInformationInProblem instance :: {}".format(e))
            return False

    def get(self, request, version):
        try:
            data = request.data

            userid = data['userid']
            problemid = data['problemid']
            codeid = data['codeid']

        except Exception as e:
            print("get function {}".format(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)

        matchInfo, scores = self.match(userid, problemid, codeid)
        matchInfo = self.get_GameId(matchInfo, scores)

        return GetCoreResponse(matchInfo)








