from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.utils.timezone import now, timedelta

from chillzone.models import Calendar, Event
from chillzone.serializers import CalendarSerializer, UpdateCalendarSerializer
from chillzone.services import CalendarService

class CalendarView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateCalendarSerializer

    def get(self, request):

        try:
            calendar = Calendar.objects.get(user=request.user)
        except Calendar.DoesNotExist:
            return Response({"error": "No calendar found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CalendarSerializer(calendar)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    def post(self, request):

        url = request.data.get('url')
        user = request.user

        if not url:
            return Response({'error': 'url is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        calendar, created = Calendar.objects.get_or_create(
            user=user,
            defaults={"title": f"Calendrier de {user.first_name} {user.last_name}", "url": url}
        )

        if not created:
            calendar.url = url
            calendar.save()

            Event.objects.filter(calendar=calendar).delete()

        events = CalendarService.get_events_from_ical(url)
        for event in events:
            Event.objects.create(
                id=event['id'],
                title=event['title'],
                start_time=event['start_time'],
                end_time=event['end_time'],
                location=event['location'],
                description=event['description'],
                calendar=calendar
            )

        return self.get(request)
    
    def put(self, request):
        try:
            calendar = Calendar.objects.get(user=request.user)
        except Calendar.DoesNotExist:
            return Response({"error": "No calendar found"}, status=status.HTTP_404_NOT_FOUND)

        if calendar.reload and calendar.reload > now():
            return Response({'error': f'Calendar will be reloadable at {calendar.reload}'}, status=status.HTTP_400_BAD_REQUEST)

        Event.objects.filter(calendar=calendar).delete()

        events = CalendarService.get_events_from_ical(calendar.url)
        for event in events:
            Event.objects.create(
                id=event['id'],
                title=event['title'],
                start_time=event['start_time'],
                end_time=event['end_time'],
                location=event['location'],
                description=event['description'],
                calendar=calendar
            )

        calendar.reload = now() + timedelta(days=1)
        calendar.save()

        serializer = CalendarSerializer(calendar)
        return Response(serializer.data, status=status.HTTP_200_OK)

