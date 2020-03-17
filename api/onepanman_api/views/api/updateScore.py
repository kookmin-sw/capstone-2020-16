from onepanman_api.models import UserInformationInProblem, UserInfo


def update_tier(problemid):
    instance_all = UserInformationInProblem.objects.all().filter(problem=problemid).order_by('-score')

    for instance in instance_all:
        print("instance : {}".format(instance))
        user_score = instance.score
        instances = instance_all.exclude(id=instance.id)

        length_all = len(instances)
        instance_high = instances.filter(score__gte=user_score)

        #print("나보다 높은 사람의 수 : {}".format(len(instance_high)))

        if len(instance_high) == 0:  # 1등
            instance.tier = "Challenger"

        elif len(instance_high) < length_all/10:   # 상위 10%
            instance.tier = "Diamond"

        elif len(instance_high) < (length_all/100)*35:    # 상위 35%
            instance.tier = "Platinum"

        elif len(instance_high) < (length_all/100)*60:    # 상위 65%
            instance.tier = "Gold"

        elif len(instance_high) < (length_all/100)*90:    # 상위 90%
            instance.tier = "Silver"

        else:       # 상위 100%
            instance.tier = "Bronze"

        instance.save()

# 유저의 전체 티어를 업데이트하는 함수
def update_totalTier():
    users = UserInfo.objects.all().order_by('-tier_score')

    for user in users:

        tiers = UserInformationInProblem.objects.all().filter(user=user.pk)

        # 각 티어 별로 점수를 매기고 합산!
        score = 0

        for instance in tiers:
            tier = instance.tier

            if tier == "Challenger":
                score += 100
            elif tier == "Diamond":
                score += 70
            elif tier == "Platinum":
                score += 60
            elif tier == "Gold":
                score += 40
            elif tier == "Silver":
                score += 20
            elif tier == "Bronze":
                score += 10

        user.tier_score = score
        user.save()

        others = users.exclude(user=user.pk)
        high_users = others.filter(tier_score__gte=user.tier_score)

        high_length = len(high_users)
        total_length = len(others)

        if high_length < 1:
            user.tier = "Challenger"
        elif high_length < total_length/10:
            user.tier = "Diamond"
        elif high_length < (total_length/100)*35:
            user.tier = "Platinum"
        elif high_length < (total_length/100)*65:
            user.tier = "Gold"
        elif high_length < (total_length/100)*90:
            user.tier = "Silver"
        else:
            user.tier = "Bronze"

        user.save()