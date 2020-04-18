from django.contrib import admin

from .. import models


@admin.register(models.Code)
class CodeAdmin(admin.ModelAdmin):
    """
    코드 정보
    """
    list_display = ['id','get_userid' ,'author', 'problem', 'language', 'name', 'available_game', 'date' ]

    def get_userid(self, obj):
        return obj.author.pk;

    get_userid.short_description = 'userid'

    class Meta:
        model = models.Code

