from django.contrib import admin

from .. import models


@admin.register(models.Problem)
class ProblemAdmin(admin.ModelAdmin):
    """
    문제관리(기본정보)
    """
    list_display = ['id', 'editor', 'title', 'description', 'limit_time', 'limit_memory', 'date']

    class Meta:
        model = models.Problem
