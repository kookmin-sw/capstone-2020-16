# Generated by Django 2.2.10 on 2020-06-02 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onepanman_api', '0031_game_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='code',
            name='status',
            field=models.CharField(db_column='STATUS', default='FAIL', max_length=50, verbose_name='상태'),
        ),
    ]
