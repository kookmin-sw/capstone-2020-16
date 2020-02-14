from django.contrib import admin

from .. import models


@admin.register(models.Notice)
class NoticeAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'sender', 'receiver', 'title', 'content', 'isRead', 'date' ]

    class Meta:
        model = models.Notice

