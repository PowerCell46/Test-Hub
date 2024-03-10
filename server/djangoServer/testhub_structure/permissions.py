from rest_framework import permissions


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        print(request.user.groups)
        return request.user.groups.filter(name='Teachers').exists()


class IsUnauthenticated(permissions.BasePermission):
    """
    Allows only unauthenticated users.
    """

    def has_permission(self, request, view):
        return not request.user.is_authenticated
