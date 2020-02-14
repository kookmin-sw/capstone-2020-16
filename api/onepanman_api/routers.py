from rest_framework import routers


class AppRouter(routers.DefaultRouter):
    def __init__(self, *args, **kwargs):
        super(AppRouter, self).__init__(*args, **kwargs)