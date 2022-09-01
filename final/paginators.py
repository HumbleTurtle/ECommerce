import math
from django.conf import settings
from rest_framework import pagination
from rest_framework.response import Response

from .settings import logger

class CustomPaginator(pagination.LimitOffsetPagination):
  def get_paginated_response(self, data):
    return Response({
        'links': {
            'next': self.get_next_link(),
            'previous': self.get_previous_link()
        },
        'count': self.count,
        'total_pages': math.ceil( self.count / self.limit ),
        'page': math.floor( self.offset / self.limit +1 ),
        'results': data
    })