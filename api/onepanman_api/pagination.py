from rest_framework import pagination
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param


class AppPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        next_url = self.get_next_link()
        previous_url = self.get_previous_link()
        first_url = self.get_first_link()
        last_url = self.get_last_link()
        links = {
            'current': self.get_current_link()
        }
        if next_url:
            links.setdefault('next', next_url)
        if previous_url:
            links.setdefault('previous', previous_url)
        if first_url and first_url != previous_url:
            links.setdefault('first', first_url)
        if last_url and last_url != next_url:
            links.setdefault('last', last_url)

        return Response({
            'links': links,
            'count': self.page.paginator.count,
            'results': data,
        })

    def get_current_link(self):
        url = self.request.build_absolute_uri()
        if self.page.number == 1:
            return remove_query_param(url, self.page_query_param)
        return replace_query_param(
            url,
            self.page_query_param,
            self.page.number,
        )

    def get_first_link(self):
        if not self.page.has_previous():
            return None
        else:
            url = self.request.build_absolute_uri()
            return remove_query_param(url, self.page_query_param)

    def get_last_link(self):
        if not self.page.has_next():
            return None
        else:
            url = self.request.build_absolute_uri()
            return replace_query_param(
                url,
                self.page_query_param,
                self.page.paginator.num_pages,
            )
