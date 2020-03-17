from rest_framework import viewsets

from onepanman_api.models import Language
from onepanman_api.serializers.language import LanguageSerializer
from onepanman_api.permissions import IsLoggedInUserOrAdmin, IsAdminUser


class LanguageViewSet(viewsets.ModelViewSet):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer

    #permission_classes = [IsAdminUser]
