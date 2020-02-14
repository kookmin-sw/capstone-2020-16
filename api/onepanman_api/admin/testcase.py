from django.contrib import admin

from .. import models


@admin.register(models.Testcase)
class TestcaseAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['id', 'problem', 'testcase_index', 'testcase']
    
    class Meta:
        model = models.Testcase

