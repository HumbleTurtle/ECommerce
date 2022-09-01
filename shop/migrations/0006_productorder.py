# Generated by Django 4.0.3 on 2022-08-28 04:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_remove_order_products'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=0)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shop.product')),
            ],
        ),
    ]