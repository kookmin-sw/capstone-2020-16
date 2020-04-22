# UserInformationInProblem instance를 만드는 함수
from onepanman_api.models import UserInformationInProblem
from onepanman_api.serializers import UserInformationInProblemSerializer


def create_instance(userid, problemid, codeid):
    try :
        data = {
            "user": userid,
            "problem": problemid,
            "code": codeid,
            "tier": "Bronze",
            "score": 1000,
        }

        serializer = UserInformationInProblemSerializer(data=data)
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