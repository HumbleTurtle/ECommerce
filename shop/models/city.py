import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers, viewsets

class City(models.Model):
  name = models.CharField(max_length=100)

  class Meta:
    verbose_name_plural = 'Cities'

  def __str__(self):
        return self.name

class CitySerializer(serializers.ModelSerializer):
  class Meta:
    model = City
    fields = ['pk', 'name']

class CityViewset(viewsets.ModelViewSet):
  queryset = City.objects.all()
  serializer_class = CitySerializer