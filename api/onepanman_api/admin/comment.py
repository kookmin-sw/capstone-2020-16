from django.contrib import admin

from .. import models


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'article', 'comment_index', 'like', 'hate', 'author', 'date' ]

    class Meta:
        model = models.Comment

