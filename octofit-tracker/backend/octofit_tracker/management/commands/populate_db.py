from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes team')
        dc = Team.objects.create(name='DC', description='DC superheroes team')

        # Create Users
        tony = User.objects.create(email='tony@stark.com', username='IronMan', team='Marvel')
        steve = User.objects.create(email='steve@rogers.com', username='CaptainAmerica', team='Marvel')
        bruce = User.objects.create(email='bruce@wayne.com', username='Batman', team='DC')
        clark = User.objects.create(email='clark@kent.com', username='Superman', team='DC')
        peter = User.objects.create(email='peter@parker.com', username='SpiderMan', team='Marvel')

        # Create Workouts
        Workout.objects.create(name='Pushups', description='Upper body workout')
        Workout.objects.create(name='Running', description='Cardio workout')
        Workout.objects.create(name='Squats', description='Lower body workout')

        # Create Activities
        today = timezone.now().date()
        Activity.objects.create(user='tony@stark.com', type='Running', duration=30, date=today)
        Activity.objects.create(user='steve@rogers.com', type='Pushups', duration=20, date=today)
        Activity.objects.create(user='bruce@wayne.com', type='Running', duration=25, date=today)
        Activity.objects.create(user='clark@kent.com', type='Squats', duration=15, date=today)
        Activity.objects.create(user='peter@parker.com', type='Running', duration=40, date=today)

        # Create Leaderboard
        Leaderboard.objects.create(user='tony@stark.com', score=100)
        Leaderboard.objects.create(user='steve@rogers.com', score=90)
        Leaderboard.objects.create(user='bruce@wayne.com', score=95)
        Leaderboard.objects.create(user='clark@kent.com', score=85)
        Leaderboard.objects.create(user='peter@parker.com', score=110)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
