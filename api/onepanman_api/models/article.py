from django.contrib.auth.models import User
from django.db import models

class Article(models.Model):
    """
    Article
    """

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
    )

    author = models.ForeignKey(
        User,
        verbose_name="작성자",
        db_column="AUTHOR",
        null=False,
        on_delete=models.PROTECT,
        related_name="user_article_author"
    )

    title = models.CharField(
        "제목",
        db_column="TITLE",
        null=False,
        max_length=30,
    )

    content = models.TextField(
        "내용",
        db_column="CONTENT",
        null=False,
    )

    date = models.DateTimeField(
        "작성/수정일",
        db_column="DATE",
        auto_now_add=True,
    )

    tag = models.CharField(
        "글 분류",
        db_column="TAG",
        null=False,
        default="자유",
        max_length=50,
    )

    view = models.IntegerField(
        "조회수",
        db_column="VIEW",
        null=False,
        default=0,
    )

    like = models.IntegerField(
        "추천수",
        db_column="LIKE",
        null=False,
        default=0,
    )

    def __str__(self):
        return '제목:{}, 작성자:{}, 날짜:{}'.format(self.title, self.author.username, self.date)

    class Meta:
        db_table = "ARTICLE"
        ordering = ['id', 'date']
        verbose_name = "게시글정보"
        verbose_name_plural = "게시글정보"


