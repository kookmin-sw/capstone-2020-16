from django.db import models

class Language(models.Model):
    """
    Language
    """

    id = models.AutoField(
        'ID',
        db_column='ID',
        primary_key=True,
        null=False,
        blank=False,
    )

    name = models.CharField(
        'language name',
        db_column='NAME',
        null=False,
        blank=False,
        unique=True,
        max_length=30,
    )

    compileMessage = models.TextField(
        '컴파일명령어',
        db_column='COMPILEMESSAGE',
        null=False,
    )

    runMessage = models.TextField(
        '런명령어',
        db_column='RUNMESSAGE',
        null=False,
    )

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'LANGUAGE'
        ordering = ['id', 'name']
        verbose_name = '언어'
        verbose_name_plural = '언어'
    
