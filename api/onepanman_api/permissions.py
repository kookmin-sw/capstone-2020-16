from rest_framework import permissions


class UserReadOnly(permissions.BasePermission):

    # list 허용
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        # retrieve 허용
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        # 수정 삭제는 관리자만.
        return request.user.is_staff


class OnlyMyandAdmin(permissions.BasePermission):

    # list허용
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        # retrieve 허용
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        # 수정 삭제는 본인과 관리자만
        return request.user.username == obj.username or request.user.is_staff