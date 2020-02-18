from django.db import models

from onepanman_api.models import Problem


class Testcase(models.Model):
    """
    TestCase
    """

    id = models.AutoField(
        'ID',
        db_column='ID',
        primary_key=True,
        null=False,
        blank=False,
    )

    problem = models.ForeignKey(
        Problem,
        db_column='PROBLEM',
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="problem_testcase_problem",
    )


    # partial index
    testcase_index = models.IntegerField(
        'TestCase 번호',
        db_column='TESTCASE_INDEX',
        null=False,
        blank=False,
    )

    testcase = models.TextField(
        'TestCase',
        db_column='TESTCASE',
        null=False,
        blank=False,
    )

    def __str__(self):
        return '{}의 {}번째 testcase'.format(self.problem.title,self.testcase_index)


    class Meta:
        db_table = 'TESTCASE'
        ordering = ['id','problem__id']
        verbose_name = '테스트케이스'
        verbose_name_plural = '테스트케이스'
        
