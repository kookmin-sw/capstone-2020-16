from django.contrib.auth.models import User
from django.db import models

class Friend(models.Model):
    """
    Friend
    """

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
        null=False,
    )

    user1 = models.ForeignKey(
        User,
        verbose_name="유저 1",
        db_column="USER1",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="user_friend_user1",
    )

    user2 = models.ForeignKey(
        User,
        verbose_name="유저 2",
        db_column="USER2",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="user_friend_user2",
    )

    isAccept = models.BooleanField(
        "수락여부",
        db_column="isAccept",
        null=False,
        default=False,
    )

    date = models.DateTimeField(
        "신청/수락 날짜",
        db_column="DATE",
        auto_now_add=True,
    )

    def __str__(self):
        return '{}_{}'.format(self.user1.username, self.user2.username)

    class Meta:
        db_table = "FRIEND"
        ordering = ['id']
        verbose_name = "친구정보"
        verbose_name_plural = "친구정보"

