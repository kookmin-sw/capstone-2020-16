from django.contrib.auth.models import User, Group
from django.db import models

from onepanman_api.models import Language


class UserInfo(models.Model):
    """
    User Information
    """

    user = models.OneToOneField(
        User,
        verbose_name="유저",
        db_column="USER",
        primary_key=True,
        on_delete=models.PROTECT,
    )

    language = models.ForeignKey(
        Language,
        verbose_name="주 사용 언어",
        db_column="LANGUAGE",
        on_delete=models.PROTECT,
        related_name="language_userInfo_language",
        default=0,
    )

    heart = models.IntegerField(
        "하트",
        db_column="HEART",
        null=False,
        default=5,
    )

    theme = models.IntegerField(
        "테마정보",
        db_column="THEME",
        null=False,
        default=0,
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
        on_delete=models.PROTECT,
        related_name="group_userInfo_group",
    )
    
    date = models.DateTimeField(
        "가입날짜",
        db_column="DATE",
        auto_now_add=True,
    )

    objects = models.Manager()

    def __str__(self):
        return '이름 : {}, 주 사용언어 : {}'.format(self.user.username, self.language.name)

    class Meta:
        db_table = "USERINFO"
        ordering = ['user']
        verbose_name = "유저 정보"
        verbose_name_plural = "유저 정보"