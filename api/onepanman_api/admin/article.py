from django.contrib import admin

from .. import models


@admin.register(models.Article)
class ArticleAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'author', 'title', 'content', 'tag', 'date', 'view', 'like' ]

    class Meta:
        model = models.Article

