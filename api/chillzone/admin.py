from django.contrib import admin
from chillzone.models import Associate, Calendar, Category, CommandComposition, CommandLine
from chillzone.models import Command, Conflict, Establishment, Event, FAQ
from chillzone.models import IsLocated, LineContent, LinkTo, LocationReservation, Location
from chillzone.models import Log, MapFloor, Map, Meal, Menu
from chillzone.models import Navigate, Network, NotificationCenter, Notification, Reservation
from chillzone.models import RestaurationPlace, TagCategory, Tag, Tagging, UserMeta, WorkIn

admin.site.register(Associate)
admin.site.register(Calendar)
admin.site.register(Category)
admin.site.register(CommandComposition)
admin.site.register(CommandLine)
admin.site.register(Command)
admin.site.register(Conflict)
admin.site.register(Establishment)
admin.site.register(Event)
admin.site.register(FAQ)
admin.site.register(IsLocated)
admin.site.register(LineContent)
admin.site.register(LinkTo)
admin.site.register(LocationReservation)
admin.site.register(Location)
admin.site.register(Log)
admin.site.register(MapFloor)
admin.site.register(Map)
admin.site.register(Meal)
admin.site.register(Menu)
admin.site.register(Navigate)
admin.site.register(Network)
admin.site.register(NotificationCenter)
admin.site.register(Notification)
admin.site.register(Reservation)
admin.site.register(RestaurationPlace)
admin.site.register(TagCategory)
admin.site.register(Tag)
admin.site.register(Tagging)
admin.site.register(UserMeta)
admin.site.register(WorkIn)