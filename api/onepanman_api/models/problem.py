from django.db import models
from django.contrib.auth.models import User


class Problem(models.Model):
    """
    Problem
    """
    id = models.AutoField(
        '서로게이트키',
        db_column='ID',
        null=False,
        primary_key=True
    )

    editor = models.ForeignKey(
        User,
        verbose_name='작성자',
        db_column='EDITOR', 
        primary_key=False,
        on_delete=models.PROTECT,
        related_name="user_problem_editor",
    )

    title = models.CharField(
        '문제이름',
        db_column='TITLE',
        max_length=50,
        null=False,
        blank=False,
        default=" ",
    )

    description = models.FileField(
        '문제PDF',
        db_column='DESCRIPTION',
        null=False,
        blank=False,
        default='media/default.jpg'
    )

    limit_time = models.IntegerField(
        '제한시간(ms)',
        db_column='LIMIT_TIME',
        null=False,
        blank=False,
        default=1000
    )

    limit_memory = models.IntegerField(
        '제한메모리(MB)',
        db_column='LIMIT_MEMORY',
        null=False,
        blank=False,
        default=128
    )

    date = models.DateTimeField(
        '작성/수정일',
        db_column='DATE',
        auto_now_add=True
    )

    level = models.IntegerField(
        '문제난이도',
        db_column='LEVEL',
        null=False,
        blank=False,
        default=1,
    )

    popularity = models.IntegerField(
        '인기도',
        db_column='POPULARITY',
        null=False,
        blank=False,
        default=0,
    )

    icon = models.ImageField(
        '문제아이콘',
        db_column='ICON',
        default="media/default.jpg",
    )

    thumbnail = models.ImageField(
        '문제썸네일',
        db_column='THUMBNAIL',
        default="media/default.jpg"
    )

    board_size = models.IntegerField(
        "보드 크기",
        db_column="BOARD_SIZE",
        default=8,
    )

    board_info = models.TextField(
        "시작 보드 정보",
        db_column="BOARD_INFO",
        default="0",
    )

    rule = models.TextField(
        "문제 규칙",
        db_column="RULE",
        default='{"obj_num": ,"placement" : , "action" : , "ending": ,}',
    )

    def __str__(self):
        return '{}_{}_{}'.format(self.id, self.title, self.editor.username)

    class Meta:
        db_table = 'PROBLEM'
        ordering = ['id', 'editor__id']
        verbose_name = '문제:기본정보'
        verbose_name_plural = '문제:기본정보'
