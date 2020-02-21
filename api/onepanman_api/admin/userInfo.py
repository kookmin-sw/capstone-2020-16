from django.contrib import admin

from .. import models


@admin.register(models.UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['user', 'language', 'heart', 'nickname', 'isCodeOpen', 'group', 'date', 'profileImage' ]

    class Meta:
        model = models.UserInfo

