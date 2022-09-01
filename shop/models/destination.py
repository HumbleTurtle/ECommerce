import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from shop.util.ReadWriteSerializer import ReadWriteSerializerMixin
from shop.models.city import CitySerializer

from shop.models.user import User

from final.settings import logger

class Destination(models.Model):
  user = models.ForeignKey('shop.User', models.CASCADE)
  address = models.CharField(max_length=200)
  city = models.ForeignKey('shop.City', models.DO_NOTHING, null=True)
  
  long = models.FloatField(blank=True, null=True)
  lat  = models.FloatField(blank=True, null=True)

  def __str__(self):
    return f'{self.address} || {self.city.name}'

class ReadDestinationSerializer(serializers.ModelSerializer):
  city = CitySerializer(read_only=True)

  class Meta:
    model = Destination
    fields = ['pk', 'user', 'address', 'long', 'lat', 'city']
    read_only_fields = ['user']

class WriteDestinationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Destination
    fields = ['pk', 'user', 'address', 'long', 'lat', 'city']
    read_only_fields = ['user']

class DestinationViewset(ReadWriteSerializerMixin, viewsets.ModelViewSet):
  queryset = Destination.objects.all()
  read_serializer_class = ReadDestinationSerializer
  write_serializer_class = WriteDestinationSerializer

  def perform_create(self, serializer):
      req = serializer.context['request']
      serializer.save(user=req.user)
  
  def perform_update(self, serializer):
      req = serializer.context['request']
      serializer.save(user=req.user)