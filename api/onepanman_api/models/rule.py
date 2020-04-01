from django.db import models


class Rule(models.Model):
    """
    Rule Information for making problem
    """

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
    )

    ruleClass = models.CharField(
        "CLASS",
        db_column="RULECLASS",
        max_length=50,
        default="착수",
    )

    ruleType = models.CharField(
        "TYPE",
        db_column="TYPE",
        max_length=50,
        default="이동",
    )

    number = models.IntegerField(
        "OBJECT NUMBER",
        db_column="OBJECTNUM",
        default=1,
    )

    description = models.CharField(
        "DESCRIPTION",
        db_column="DESCRIPTION",
        max_length=200,
        default="규칙 설명",
    )

    def __str__(self):
        return "{}_{}_{}_{}_{}".format(self.id, self.ruleClass, self.ruleType, self.number, self.description)

    class Meta:
        db_table = "RULE"
        ordering = ['id', 'ruleClass', 'ruleType', 'number']
        verbose_name = "규칙"
        verbose_name_plural = "규칙 정보"
