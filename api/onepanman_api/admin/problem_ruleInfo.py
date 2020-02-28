from django.contrib import admin
from onepanman_api import models


@admin.register(models.ProblemRuleInfo)
class ProblemRuleInfoAdmin(admin.ModelAdmin):

    list_display = ['id', 'problem', 'rule']

    class Meta:
        model = models.ProblemRuleInfo