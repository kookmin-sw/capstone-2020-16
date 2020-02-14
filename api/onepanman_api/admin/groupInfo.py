from django.contrib import admin

from .. import models


@admin.register(models.GroupInfo)
class GroupInfoAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['group', 'ranking']
    
    class Meta:
        model = models.GroupInfo

