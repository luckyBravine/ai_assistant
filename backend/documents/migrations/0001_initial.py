# Generated by Django 5.0.7 on 2024-08-01 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Files',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(upload_to='store/documents/')),
            ],
        ),
    ]