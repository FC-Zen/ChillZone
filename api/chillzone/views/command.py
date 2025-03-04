from rest_framework import status
from rest_framework.response import Response
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from chillzone.models import CommandComposition, LineContent, Command, CommandLine

class UserCommandView(APIView):
    permission_classes = [IsAuthenticated]

    def calculate_command_total(self, command):
        total = 0
        command_compositions = CommandComposition.objects.filter(command=command)
        
        for composition in command_compositions:
            command_line = composition.line
            quantity = command_line.quantity
            
            line_contents = LineContent.objects.filter(command_line=command_line)
            
            menu_found = False
            for line_content in line_contents:
                if line_content.menu and not menu_found:
                    total += line_content.menu.price * quantity
                    menu_found = True
                elif line_content.meal and not menu_found:
                    total += line_content.meal.price * quantity
        
        return round(total, 2)
    
    def get(self, request) :
        user = request.user
        today = now().date()

        command_id = request.data.get("id")

        if command_id:
            command = get_object_or_404(Command, id=command_id, user=user)
            total_price = self.calculate_command_total(command)

            return Response({
                "id": command.id,
                "payment_method": command.payment_method,
                "status": command.status,
                "qrcode_link": command.qrcode_link.url if command.qrcode_link else None,
                "pickup_time": command.pickup_time.strftime('%H:%M:%S'),
                "creation_date": command.creation_date.strftime('%Y-%m-%d %H:%M:%S'),
                "restauration_place": command.restauration_place.name,
                "total_price": total_price,
            }, status=status.HTTP_200_OK)

        else :
            today_orders = Command.objects.filter(creation_date__date=today, user=user)
            past_orders = Command.objects.filter(creation_date__date__lt=today, user=user)

            today_orders_data = [
                {
                    "id": command.id,
                    "payment_method": command.payment_method,
                    "status": command.status,
                    "qrcode_link": command.qrcode_link.url if command.qrcode_link else None,
                    "pickup_time": command.pickup_time.strftime('%H:%M:%S'),
                    "creation_date": command.creation_date.strftime('%Y-%m-%d %H:%M:%S'),
                    "restauration_place": command.restauration_place.name,
                    "total_price": self.calculate_command_total(command),
                }
                for command in today_orders
            ]

            past_orders_data = [
                {
                    "id": command.id,
                    "payment_method": command.payment_method,
                    "status": command.status,
                    "qrcode_link": command.qrcode_link.url if command.qrcode_link else None,
                    "pickup_time": command.pickup_time.strftime('%H:%M:%S'),
                    "creation_date": command.creation_date.strftime('%Y-%m-%d %H:%M:%S'),
                    "restauration_place": command.restauration_place.name,
                    "total_price": self.calculate_command_total(command),
                }
                for command in past_orders
            ]

            return Response({
                "today_orders": today_orders_data,
                "past_orders": past_orders_data
            }, status=status.HTTP_200_OK)