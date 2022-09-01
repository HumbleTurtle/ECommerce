import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers, viewsets
from rest_framework.parsers import MultiPartParser, FileUploadParser
from rest_framework.response import Response
from rest_framework import status

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return '{0}_{1}'.format( uuid.uuid4(), filename)

class Product(models.Model):
  name = models.CharField(max_length=50)
  description = models.TextField()
  image = models.FileField(upload_to=(user_directory_path), null=True)
  price = models.IntegerField(default=100000)
  
  def __str__(self):
    return f'{self.name} | Price {self.price}'

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ['pk', 'name', 'description', 'image', 'price']

  def to_representation(self, instance):
      response = super(ProductSerializer, self).to_representation(instance)
      if instance.image:
          response['image'] = instance.image.url
      return response

class ProductViewset(viewsets.ModelViewSet):
  parser_classes = (MultiPartParser, )
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

  def list(self, request, *args, **kwargs):
    queryset = self.queryset

    page = self.paginate_queryset(queryset)
    serializer = self.get_serializer(page, many=True)
    response = self.get_paginated_response(serializer.data)
    
    return response
