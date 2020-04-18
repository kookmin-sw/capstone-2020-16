from django.contrib import admin

from .. import models


@admin.register(models.UserInformationInProblem)
class UserInformationInProblemAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'get_userid', 'user', 'problem', 'score', 'tier', 'code', 'playing', 'available_game']

    def get_userid(self, obj):
        return obj.user.pk;

    get_userid.short_description = 'userid'

    class Meta:
        model = models.UserInformationInProblem

