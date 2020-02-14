from django.db.models import QuerySet

from rest_framework import status
from rest_framework.response import Response

from ... import schemas


class VersionedSchemaMixin(object):
    schema = schemas.VersionedAutoSchema()

    def get_response_for(self, instance, created=False, serializer_class=None):
        if serializer_class:
            self.serializer_class = serializer_class

        serializer = self.get_serializer(instance)

        if created:
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        return Response(serializer.data)

    def get_response_list_for(self, queryset, serializer_class=None):
        page = self.paginate_queryset(queryset)

        if serializer_class:
            self.serializer_class = serializer_class

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
