from django.contrib.auth.models import User
from django.db import models
from datetime import datetime
from onepanman_api.models.article import Article



class Comment(models.Model):
    """
    Comment
    ( article의 댓글 )
    """

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
        null=False,
    )

    article = models.ForeignKey(
        Article,
        verbose_name="게시글",
        db_column="ARTICLE",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="article_comment_article"
    )

    comment_index = models.IntegerField(
        "댓글 번호",
        db_column="COMMENT_INDEX",
        null=False,
        default=0,
    )

    comment = models.TextField(
        "댓글",
        db_column="COMMENT",
        null=False,
        default=" ",
    )

    like = models.IntegerField(
        "추천수",
        db_column="LIKE",
        null=False,
        blank=False,
        default=0,
    )

    hate = models.IntegerField(
        "비추천수",
        db_column="HATE",
        null=False,
        blank=False,
        default=0,
    )
    
    author = models.ForeignKey(
        User,
        verbose_name="작성자",
        db_column="AUTHOR",
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="user_comment_author",
    )

    date = models.DateTimeField(
        "작성시간",
        db_column="DATE",
        auto_now_add=True,
        null = True,
    )

    def __str__(self):
        return '게시글 : {}, 작성자: {}'.format(self.article.title, self.author.username)
    
    class Meta:
        db_table = "COMMENT"
        ordering = ['id', 'article__id', 'comment_index']
        verbose_name = "댓글 정보"
        verbose_name_plural = "댓글 정보"
    