from django.contrib import admin

from .. import models


@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    """
    게임정보
    """
    list_display = ['id', 'problem', 'challenger', 'opposite', 'winner', 'result', 'challenger_score', 'opposite_score',
                    'date', 'challenger_code', 'opposite_code', 'type']

    class Meta:
        model = models.Game

