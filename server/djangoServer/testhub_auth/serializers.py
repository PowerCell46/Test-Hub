from django.contrib.auth.models import User
from rest_framework import serializers

from djangoServer.testhub_auth.models import UserProfile


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    image = serializers.ImageField(allow_null=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'image']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        account = User(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        account.set_password(password)
        account.save()

        UserProfile.objects.update_or_create(user=account, defaults={'image': self.validated_data.get('image')})
        return account


class UserProfileDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
