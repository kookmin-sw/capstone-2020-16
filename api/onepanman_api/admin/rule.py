from onepanman_api import models
from django.contrib import admin

@admin.register(models.Rule)
class RuleAdmin(admin.ModelAdmin):
    """
       규칙정보
    """
    list_display = ['id', 'ruleClass', 'ruleType', 'number', 'description']

    class Meta:
        model = models.Rule
