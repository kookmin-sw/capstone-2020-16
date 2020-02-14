from django.contrib import admin

from .. import models


@admin.register(models.RuleInfo)
class RuleInfoAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'name', 'description', 'type']
    
    class Meta:
        model = models.RuleInfo

