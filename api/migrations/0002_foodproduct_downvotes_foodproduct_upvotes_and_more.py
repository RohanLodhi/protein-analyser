# Generated by Django 5.2 on 2025-04-10 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='foodproduct',
            name='downvotes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='foodproduct',
            name='upvotes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='proteinpowder',
            name='downvotes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='proteinpowder',
            name='upvotes',
            field=models.IntegerField(default=0),
        ),
    ]
