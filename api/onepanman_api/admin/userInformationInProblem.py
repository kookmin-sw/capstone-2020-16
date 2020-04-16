from django.contrib import admin

from .. import models


@admin.register(models.UserInformationInProblem)
class UserInformationInProblemAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'user', 'problem', 'score', 'tier', 'code', 'playing', 'available_game']
    
    class Meta:
        model = models.UserInformationInProblem

