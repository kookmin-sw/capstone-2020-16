from django.contrib.auth.models import User
from django.db import models

from . import Problem, Code

DEFAULT_ID = 1

class UserInformationInProblem(models.Model):
    """
    UserInformationInProblem
    User - Problem
    """

    choice_tier = (
        ('Bronze', 'Bronze'),
        ('Silver', 'Silver'),
        ('Gold', 'Gold'),
        ('Platinum', 'Platinum'),
        ('Diamond', 'Diamond'),
        ('Challenger', 'Challenger')
    )

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
        null=False,
        blank=False,
    )

    user = models.ForeignKey(
        User,
        verbose_name="유저",
        db_column="USER",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="user_userInformationInProblem_user",
    )

    problem = models.ForeignKey(
        Problem,
        verbose_name="문제",
        db_column="PROBLEM",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="problem_userInformationInProblem_problem",
        default=DEFAULT_ID,
    )

    score = models.IntegerField(
        "점수",
        db_column="SCORE",
        null=False,
        default=500,
    )

    tier = models.CharField(
        "등급",
        db_column="TIRE",
        null=False,
        default="Bronze",
        max_length=20,
        choices=choice_tier,
    )

    code = models.ForeignKey(
        Code,
        verbose_name="대표 코드",
        db_column="CODE",
        on_delete=models.PROTECT,
        default=DEFAULT_ID,
    )

    available_game = models.BooleanField(
        "게임 가능 유저",
        db_column="AVAILABLE_GAME",
        default="True",
    )

    playing = models.BooleanField(
        "게임 중",
        db_column="PLATING",
        default=False,
    )

    def __str__(self):
        return '{}_{}_{}'.format(self.problem.title, self.user.username, self.score)

    class Meta:
        db_table = "USERINFORMATIONINPROBLEM"
        ordering = ['id', 'problem__id', 'score']
        verbose_name = "문제:유저점수정보"
        verbose_name_plural = "문제:유저점수정보"


