from django.contrib.auth.models import User
from django.db import models

class Notice(models.Model):
    """
    Notice
    알림
    """

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
    )

    sender = models.ForeignKey(
        User,
        verbose_name="발신자",
        db_column="SENDER",
        on_delete=models.PROTECT,
        related_name="user_notice_sender",
        default=0,
    )

    receiver = models.ForeignKey(
        User,
        verbose_name="수신자",
        db_column="RECEIVER",
        on_delete=models.PROTECT,
        related_name="user_notice_receiver",
        default=0,
    )

    title = models.CharField(
        "제목",
        db_column="TITLE",
        max_length=50,
        null=False,
        blank=False,
    )

    content = models.TextField(
        "내용",
        db_column="CONTENT",
        null=False,
        blank=False,
    )

    date = models.DateTimeField(
        "작성시간",
        db_column="DATE",
        auto_now_add=True,
    )

    isRead = models.BooleanField(
        "읽음여부",
        db_column="isREAD",
        null=False,
        default=False,
    )

    def __str__(self):
        return '발신 : {}, 수신 : {}, 날짜 : {}'.format(self.sender.name, self.receiver.name, self.date)

    class Meta:
        db_table = "NOTICE"
        ordering = ['id', 'date']
        verbose_name = "알림정보"
        verbose_name_plural = "알림정보"
    