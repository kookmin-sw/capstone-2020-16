from onepanman_api.models import UserInformationInProblem

from onepanman_api.serializers import UserInformationInProblemSerializer


def update_playing(userid, problemid, status):
    user = UserInformationInProblem.objects.all().filter(user=userid, problem=problemid)

    if len(user) < 1:
        print("userInformationInProblem 객체를 찾을 수 없습니다.")
        return

    user = user[0]

    data = {
        'id': user.id,
        'user': user.user.pk,
        'playing': status,
    }

    UIIPserializer = UserInformationInProblemSerializer(data=data)
    UIIPserializer.is_valid(raise_exception=True)
    valid_data = UIIPserializer.validated_data

    user.playing = valid_data["playing"]


    user.save()

