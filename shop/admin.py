from django.contrib import admin

from shop.models import Product, City, Destination, OrderStatus

# Register your models here.
admin.site.register(Product)
admin.site.register(City)
admin.site.register(Destination)
admin.site.register(OrderStatus)