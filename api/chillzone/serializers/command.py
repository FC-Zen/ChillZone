from rest_framework import serializers
from chillzone.models import Command, LineContent, CommandComposition

class CommandSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()

    class Meta:
        model = Command
        fields = [
            'id', 'payment_method', 'status', 'qrcode_link', 'pickup_time', 'creation_date', 
            'total_price', 'customer_name'
        ]

    def get_total_price(self, obj):
        """Calcule le prix total de la commande."""
        total = 0
        command_compositions = CommandComposition.objects.filter(command=obj)

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

    def get_customer_name(self, obj):
        """Retourne le nom complet du client."""
        return f"{obj.user.first_name} {obj.user.last_name}".strip()
    
class CommandUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    status = serializers.ChoiceField(choices=[status[0] for status in Command.STATUS_CHOICES])

class CommandCreateSerializer(serializers.Serializer):
    payment_method = serializers.CharField(max_length=50)
    pickup_time = serializers.TimeField()
    lines = serializers.ListField(child=serializers.DictField(), required=True)