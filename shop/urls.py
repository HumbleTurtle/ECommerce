from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from shop.models import user

from shop.models import ProductViewset, DestinationViewset, OrderViewset, CityViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'destinations', DestinationViewset)
router.register(r'orders', OrderViewset)
router.register(r'products', ProductViewset)
router.register(r'cities', CityViewset)

urlpatterns = [
  path('', include(router.urls)),
  path('register/', user.register_view,  name="register"),
  path('login/', user.login_view,  name="login"),
  path('logout/', user.logout_view,  name="logout"),  
]
