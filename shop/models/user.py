import json

import traceback
import uuid
from django.db import models, IntegrityError
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from django.core.validators import validate_email
from django.apps import apps
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from final.settings import logger

class User(AbstractUser):
  pass

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

@api_view(['POST'])
@permission_classes([AllowAny]) 
def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny]) 
def logout_view(request):
    try:
        logout(request)
        return Response(status=status.HTTP_200_OK)

    except:
        traceback.format_exc()
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny]) 
def register_view(request):
      if request.method == "POST":

        data = request.data
        username = data.get("username")
        email = data.get("email")
     
        # Ensure password matches confirmation
        password = data.get("password")
        confirmation = data.get("confirmationPassword")

        response = dict()
        response['status'] = None


        validation_errors = []

        if len(username) == 0:
            validation_errors.append("Must type an username.")

        if len(password) < 8:
            validation_errors.append("Passwords must have a length of 8 characters.")

        if password != confirmation:
            validation_errors.append("Passwords do not match.")

        try:
            validate_email(email)
        except:
            validation_errors.append("Please enter a valid email")

        if len(validation_errors) > 0:
            response["message"] = validation_errors
            response["status"] = status.HTTP_400_BAD_REQUEST

        if response['status'] is None: 
            # Attempt to create new user
            try:
                user = apps.get_model('shop.User').objects.create_user(username, email, password)
                user.save()
                response["message"] = ["User created sucessfully."]
                response["status"] = status.HTTP_200_OK
                login(request, user)

            except IntegrityError as ex:
                logger.info(ex.__class__.__name__)
                response["message"] = ["Username already taken."]
                response["status"] = status.HTTP_409_CONFLICT
            except Exception as ex:
                response["message"] = ["Unexpected error."]
                response["status"] = status.HTTP_409_CONFLICT

        return Response( response, status=response['status'])
