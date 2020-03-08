from rest_framework import permissions


class IsLoggedInUserOrAdmin(permissions.BasePermission):

    # list 허용
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        # retrieve 허용
        if request.method in permissions.SAFE_METHODS:
            print("SAFE")
            return True

        # 수정 삭제는 당사자와 관리자만.
        return obj.username == request.user or request.user.is_staff


class UserReadOnly(permissions.BasePermission):

    # list 허용
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        # retrieve 허용
        if request.method in permissions.SAFE_METHODS:
            print("SAFE")
            return True

        # 수정 삭제는 당사자와 관리자만.
        return request.user.is_staff


class IsAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff


class OnlyAdminUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff
