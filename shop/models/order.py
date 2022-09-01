import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser
from rest_framework import serializers, viewsets
from django.db import transaction
from django.apps import apps
from final.settings import logger
from shop.models.destination import ReadDestinationSerializer
from shop.models.orderStatus import OrderStatusSerializer
from shop.models.productOrder import ReadProductOrderSerializer, WriteProductOrderSerializer
from rest_framework import status
from rest_framework.response import Response

from shop.models.user import UserSerializer
from shop.models.product import Product
from shop.util.ReadWriteSerializer import ReadWriteSerializerMixin
from rest_framework.decorators import action

class Order(models.Model):
  destination = models.ForeignKey('Destination', models.CASCADE)
  # product_orders = models.ManyToOneRel(to='ProductOrders', field='order', field_name='order')
  
  create_date = models.DateTimeField(default=now)
  modified_date = models.DateTimeField(default=now, null=True)
  cancelled_date = models.DateTimeField(blank=True, null=True)

  status = models.ForeignKey('OrderStatus', default=1, on_delete=models.DO_NOTHING)

  delivery_date = models.DateTimeField(blank=False, null=False)  
  user = models.ForeignKey('user', default=None, blank=True, null=True, on_delete=models.CASCADE)

class ReadOrderSerializer(serializers.ModelSerializer):

  destination = ReadDestinationSerializer(read_only=True)
  product_orders = ReadProductOrderSerializer(read_only=True, many=True)
  total = serializers.SerializerMethodField('get_total')
  user = UserSerializer(read_only=True)
  status = OrderStatusSerializer()

  def get_total(self, obj):
    return obj.product_orders.aggregate(total_price=models.Sum(models.F('price')*models.F('quantity')))['total_price']
    
  class Meta:
    model = Order
    fields = ['pk', 'status', 'destination', 'create_date', 'total', 'modified_date', 'cancelled_date', 'delivery_date', 'user', 'product_orders']
    read_only_fields = [ 'product_orders', 'user']

class WriteOrderSerializer(serializers.ModelSerializer):

  class Meta:
    model = Order
    fields = ['pk', 'destination', 'create_date', 'modified_date', 'cancelled_date', 'delivery_date', 'user', 'product_orders']
    read_only_fields = [ 'product_orders', 'user']

class ListOrderSerializer(serializers.ModelSerializer):
  destination = ReadDestinationSerializer(read_only=True)
  total = serializers.SerializerMethodField('get_total')
  user = UserSerializer(read_only=True)
  status = OrderStatusSerializer()

  def get_total(self, obj):
    return obj.product_orders.aggregate(total_price=models.Sum(models.F('price')*models.F('quantity')))['total_price']
    
  class Meta:
    model = Order
    fields = ['pk', 'destination', 'status', 'create_date', 'total', 'modified_date', 'cancelled_date', 'delivery_date', 'user',]
    read_only_fields = [ 'user']

    
class OrderViewset(ReadWriteSerializerMixin, viewsets.ModelViewSet):
  queryset = Order.objects.all().order_by('-pk')

  read_serializer_class = ReadOrderSerializer
  list_serializer_class = ListOrderSerializer
  write_serializer_class = WriteOrderSerializer

  @action(methods=['put'], detail=False, url_path='(?P<order>\w+)/cancel', url_name='Cancel order')
  def cancel_order(self, request, order):
    try:
      order_instance = Order.objects.filter(pk=order).first()
      order_instance.status = apps.get_model('shop.OrderStatus').objects.filter(pk=3).first()
      order_instance.save()
      return Response(status=status.HTTP_200_OK)
    except:
      return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
  def create(self, request):
    product_orders = request.data.pop('product_orders')

    with transaction.atomic():
      orderSerializer = self.get_serializer(data=request.data)

      if orderSerializer.is_valid():
        order = orderSerializer.save(user=request.user)

        for product_order in product_orders:
          product_orders_serializer = WriteProductOrderSerializer(data=product_order)
          
          if product_orders_serializer.is_valid():
            product = Product.objects.filter(pk=product_order['product']).first()
            logger.info(product)

            product_orders_serializer.save(order=order, price = product.price)

        return Response( status=status.HTTP_200_OK )
      logger.info(orderSerializer.errors)
    return Response( status=status.HTTP_500_INTERNAL_SERVER_ERROR)