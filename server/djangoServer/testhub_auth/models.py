from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='user_images/')  # , default='default.jpg' ADD A DEFAULT IMAGE IN THE FOLDER!
    phone_number = models.CharField(max_length=10, null=True, blank=True)
    nationality = models.CharField(max_length=25, null=True, blank=True)
    gender = models.CharField(choices=(('Male', 'Male'), ('Female', 'Female')), null=True, blank=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    instance.userprofile.save()
