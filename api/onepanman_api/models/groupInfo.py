from django.contrib.auth.models import Group
from django.db import models

class GroupInfo(models.Model):
    """
    Group Information
    """

    group = models.OneToOneField(
        Group,
        verbose_name="그룹",
        primary_key=True,
        null=False,
        on_delete=models.PROTECT,
        related_name="groupInfo",
    )

    ranking = models.IntegerField(
        "랭킹",
        db_column="RANKING",
        null=True,
    )

    score = models.IntegerField(
        "점수",
        db_column="SCORE",
        default=0,
    )

    def __str__(self):
        return '{}_{}_{}'.format(self.group.primary_key, self.group.name, self.ranking)

    class Meta:
        db_table = "GROUPINFO"
        ordering = ['group__id']
        verbose_name = '그룹정보'
        verbose_name_plural = '그룹정보'
