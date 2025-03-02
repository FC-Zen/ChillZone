import requests
from icalendar import Calendar
from datetime import datetime
import pytz
import re

class CalendarService:

    paris_tz = pytz.timezone("Europe/Paris")

    @staticmethod
    def get_events_from_ical(ical_url):
        """Récupère les événements d'un calendrier iCal"""
        
        url = re.sub(r"(nbWeeks=)\d+", r"\g<1>52", ical_url) if "nbWeeks=" in ical_url else ical_url

        try:
            response = requests.get(url)
            ical = Calendar.from_ical(response.text)
            events = []

            for component in ical.walk():
                if component.name == "VEVENT":

                    start_dt = component.get('DTSTART').dt
                    end_dt = component.get('DTEND').dt

                    if isinstance(start_dt, datetime):
                        if start_dt.tzinfo is None:
                            start_dt = pytz.utc.localize(start_dt)
                        start_dt = start_dt.astimezone(CalendarService.paris_tz)

                    if isinstance(end_dt, datetime):
                        if end_dt.tzinfo is None:
                            end_dt = pytz.utc.localize(end_dt)
                        end_dt = end_dt.astimezone(CalendarService.paris_tz)

                    formatted_start = start_dt.strftime('%Y-%m-%d %H:%M:%S%z')
                    formatted_end = end_dt.strftime('%Y-%m-%d %H:%M:%S%z')

                    desc = component.get("description").split('\n')
                    desc = [line for line in desc if line]
                    desc = desc[:-1]

                    for i in range(1, len(desc)):
                        if 'TP' in desc[i] or 'TD' in desc[i]:
                            desc[i], desc[0] = desc[0], desc[i]
                            break

                    event = {
                        'id': str(component.get('UID')),
                        "title": component.get("summary"),
                        "start_time": formatted_start,
                        "end_time": formatted_end,
                        "location": component.get("location"),
                        "description": ';'.join(desc)
                    }
                    events.append(event)
            return events
        except Exception as e:
            print(f"Erreur lors de la récupération des événements du calendrier iCal : {e}")
            return []