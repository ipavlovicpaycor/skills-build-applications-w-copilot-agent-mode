# Models for users, teams, activities, leaderboard, and workouts
from djongo import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name

class User(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    team = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.email

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField(help_text='Duration in minutes')
    date = models.DateField()

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return f"{self.user} - {self.type}"

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

    class Meta:
        app_label = 'octofit_tracker'

    def __str__(self):
        return f"{self.user} - {self.score}"
