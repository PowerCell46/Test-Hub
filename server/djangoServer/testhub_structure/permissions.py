from rest_framework import permissions


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Teacher').exists()


class IsUnauthenticated(permissions.BasePermission):
    """
    Allows only unauthenticated users.
    """

    def has_permission(self, request, view):
        return not request.user.is_authenticated
