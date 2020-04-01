from django.contrib.auth.models import User, Group
from django.db import models

from onepanman_api.models import Language


DEFAULT_ID = 1

class UserInfo(models.Model):
    """
    User Information
    """

    language_choice = (
        ("C", "C"),
        ("C++", "C++"),
        ("PYTHON", "PYTHON"),
        ("JAVA", "JAVA")
    )

    user = models.OneToOneField(
        User,
        verbose_name="유저",
        db_column="USER",
        primary_key=True,
        on_delete=models.PROTECT,
        related_name='user_userInfo_user',
    )

    # language = models.ForeignKey(
    #     Language,
    #     verbose_name="주 사용 언어",
    #     db_column="LANGUAGE",
    #     on_delete=models.PROTECT,
    #     related_name="language_userInfo_language",
    #     default= DEFAULT_ID,
    # )

    language = models.CharField(
        "언어",
        db_column="LANGUAGE",
        max_length=50,
        choices=language_choice,
    )

    nickname = models.CharField(
        "닉네임",
        db_column="NICKNAME",
        max_length=40,
        default="Anonymous"
    )

    heart = models.IntegerField(
        "하트",
        db_column="HEART",
        null=False,
        default=5,
    )

    isCodeOpen = models.BooleanField(
        "코드공개여부",
        db_column="isCodeOpen",
        null=False,
        default=False,
    )

    group = models.ForeignKey(
        Group,
        verbose_name="그룹",
        db_column="GROUP",
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="group_userInfo_group",
    )
    
    date = models.DateTimeField(
        "가입날짜",
        db_column="DATE",
        auto_now_add=True,
    )

    profileImage = models.TextField(
        "프로필 사진",
        db_column="PROFILEIMAGE",
        default="기본사진경로 넣기",
    )

    tier = models.CharField(
        "등급",
        db_column="TIER",
        max_length=50,
        default="Bronze",
    )

    tier_score = models.IntegerField(
        "등급 점수",
        db_column="TIER_SCORE",
        default=0,
   )

    def __str__(self):
        return '{}_{}_{}'.format(self.user.username, self.language, self.tier)

    class Meta:
        db_table = "USERINFO"
        ordering = ['user']
        verbose_name = "유저 정보"
        verbose_name_plural = "유저 정보"