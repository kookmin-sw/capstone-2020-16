from django.db import models
from onepanman_api.models import Problem, RuleInfo


class ProblemRuleInfo(models.Model):
    """
    About rule information for each problem
    """

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
    )

    problem = models.ForeignKey(
        Problem,
        verbose_name="문제",
        db_column="PROBLEM",
        on_delete=models.PROTECT,
    )

    rule = models.ForeignKey(
        RuleInfo,
        verbose_name="규칙",
        db_column="RULE",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return "{}_{}".format(self.problem.title, self.rule.name)

    class Meta:
        db_table = "PROBLEMRULEINFO"
        ordering = ['id']
        verbose_name = "문제 별 규칙정보"
        verbose_name_plural = "문제 별 규칙정보"