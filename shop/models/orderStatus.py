import uuid
from django.db import models
from rest_framework import serializers, viewsets

class OrderStatus(models.Model):
  name = models.CharField(max_length=100, blank=False, null=False)
  
  class Meta:
    verbose_name_plural = 'OrderStatus'

class OrderStatusSerializer(serializers.ModelSerializer):

  class Meta:
    model= OrderStatus
    fields = ['pk', 'name']

  def __str__(self):
    return f'{self.pk} {self.name}'