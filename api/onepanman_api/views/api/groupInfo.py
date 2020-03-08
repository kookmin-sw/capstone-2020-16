from django.contrib.auth.models import Group
from django.db.models.signals import post_save
from django.dispatch import receiver
from onepanman_api import models
from onepanman_api.permissions import IsAdminUser, IsLoggedInUserOrAdmin, UserReadOnly
from rest_framework import viewsets

from onepanman_api.models import GroupInfo
from onepanman_api.serializers.gruopInfo import GroupInfoSerializer


class GroupInfoViewSet(viewsets.ModelViewSet):
    queryset = GroupInfo.objects.all()
    serializer_class = GroupInfoSerializer

    permission_classes = [UserReadOnly]


@receiver(post_save, sender=Group)
def create_user_info(sender, instance, created, **kwargs):
    if created:
        models.GroupInfo.objects.create(group=instance)

