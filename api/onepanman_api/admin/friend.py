from django.contrib import admin

from .. import models


@admin.register(models.Friend)
class FriendAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'user1', 'user2', 'isAccept']

    class Meta:
        model = models.Friend

