from django.contrib.auth.models import User
from django.db import models

from onepanman_api.models import Problem, Language


class Code(models.Model):
    """
    Code
    """

    id = models.AutoField(
        "ID",
        db_column='ID',
        primary_key=True,
        null=False,
        blank=False,
    )

    author = models.ForeignKey(
        User,
        verbose_name="작성자",
        db_column="AUTHOR",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="user_code_author",
    )

    problem = models.ForeignKey(
        Problem,
        verbose_name="문제",
        db_column="PROBLEM",
        null=False,
        on_delete=models.PROTECT,
        related_name="problem_code_problem",
    )

    language = models.ForeignKey(
        Language,
        verbose_name="언어",
        db_column="LANGUAGE",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="language_code_language",
    )

    name = models.CharField(
        "codename",
        db_column="NAME",
        max_length=20,
    )

    code = models.TextField(
        "코드",
        db_column="CODE",
        null=False,
    )

    available_game = models.BooleanField(
        "게임가능코드",
        db_column="AVAILABLE_GAME",
        default=True,
    )

    date = models.DateTimeField(
        "작성/수정일",
        db_column="DATE",
        auto_now_add=True,
    )

    status = models.CharField(
        "상태",
        db_column="STATUS",
        default="FAIL",
        max_length=50,
    )

    def __str__(self):
        return '{}_{}_{}_{}'.format(self.id, self.author.username, self.problem.title, self.language.name)

    class Meta:
        db_table = "CODE"
        ordering = ['id', 'problem__id', 'author__id']
        verbose_name = "코드정보"
        verbose_name_plural = "코드정보"


