from rest_framework import viewsets

from onepanman_api.models import Game
from onepanman_api.serializers.game import GameSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer