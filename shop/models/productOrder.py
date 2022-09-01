from dataclasses import field
import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from shop.models.product import ProductSerializer
from shop.util.ReadWriteSerializer import ReadWriteSerializerMixin
from shop.models.city import CitySerializer
from final.settings import logger
from shop.models.user import User

class ProductOrder(models.Model):
  product = models.ForeignKey('Product', on_delete=models.CASCADE, default=None, null=True)
  order = models.ForeignKey('Order', related_name='product_orders', on_delete=models.CASCADE, default=None, null=True)

  quantity = models.IntegerField(default=0, null=False)
  price = models.FloatField(default=0, null=False)

class WriteProductOrderSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = ProductOrder
    fields = ['pk', 'product',  'order', 'quantity', 'price']

class ReadProductOrderSerializer(serializers.ModelSerializer):
  product = ProductSerializer()
  
  class Meta:
    model = ProductOrder
    fields = ['pk', 'product',  'order', 'quantity', 'price']
