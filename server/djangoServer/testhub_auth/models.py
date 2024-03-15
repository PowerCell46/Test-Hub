from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_details')
    image = models.ImageField(upload_to='user_images/', default='user_images/defaultProfilePic.png')
    phone_number = models.CharField(max_length=10, null=True, blank=True)
    nationality = models.CharField(max_length=25, null=True, blank=True)
    gender = models.CharField(choices=(('Male', 'Male'), ('Female', 'Female')), null=True, blank=True, max_length=20)
    is_deleted = models.BooleanField(default=False)

    def soft_delete(self):
        self.is_deleted = True
        self.save()

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        instance.user_details.save()

