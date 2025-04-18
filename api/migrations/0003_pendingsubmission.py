# Generated by Django 5.2 on 2025-04-10 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_foodproduct_downvotes_foodproduct_upvotes_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PendingSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_type', models.CharField(choices=[('protein', 'Protein Powder'), ('food', 'Food Product')], max_length=10)),
                ('data', models.JSONField()),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
