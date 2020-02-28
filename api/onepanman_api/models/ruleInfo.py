from django.db import models

class RuleInfo(models.Model):
    """
    Rule Information
    """

    choice_type = (
        ('placement', '착수'),
        ('action', '액션'),
        ('ending', '엔딩'),
    )

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
    )

    name = models.CharField(
        "rule name",
        db_column="NAME",
        unique=True,
        null=False,
        max_length=30,
    )

    description = models.TextField(
        "규칙설명",
        db_column="DESCRIPTION",
        null=False,
    )

    type = models.CharField(
        "규칙종류",
        db_column="TYPE",
        null=False,
        blank=False,
        max_length=30,
        choices = choice_type,
    )

    def __str__(self):
        return '{}_{}'.format(self.type, self.name)

    class Meta:
        db_table = "RULEINFO"
        ordering = ['id','type']
        verbose_name = "규칙정보"
        verbose_name_plural = "규칙정보"

    
