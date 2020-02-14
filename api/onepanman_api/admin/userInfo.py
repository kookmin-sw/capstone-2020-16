from django.contrib import admin

from .. import models


@admin.register(models.UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['user', 'language', 'heart', 'theme', 'isCodeOpen', 'group', 'date' ]

    class Meta:
        model = models.UserInfo

