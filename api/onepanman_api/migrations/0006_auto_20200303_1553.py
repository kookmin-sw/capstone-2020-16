# Generated by Django 2.2.10 on 2020-03-03 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onepanman_api', '0005_auto_20200301_1749'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='problem',
            name='board_shape',
        ),
        migrations.AddField(
            model_name='game',
            name='turn',
            field=models.CharField(choices=[('challenger', 'challenger'), ('opposite', 'opposite')], db_column='TURN', default='challenger', max_length=50, verbose_name='선수'),
        ),
        migrations.AddField(
            model_name='problem',
            name='board_info',
            field=models.IntegerField(db_column='BOARD_INFO', default=0, verbose_name='시작 보드 정보'),
        ),
    ]