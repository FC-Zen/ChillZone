from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from chillzone.models import FAQ
from django.shortcuts import get_object_or_404
from chillzone.serializers import FAQSerializer, AdminFAQSerializer
from collections import defaultdict

class FAQView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment if user_meta else None

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

        faqs = FAQ.objects.filter(establishment=establishment)
        categorized_faqs = defaultdict(list)

        for faq in faqs:
            categorized_faqs[faq.category].append({
                "question": faq.question,
                "answer": faq.answer
            })

        response_data = [
            {"category": category, "questions": questions}
            for category, questions in categorized_faqs.items()
        ]

        return Response(response_data, status=status.HTTP_200_OK)
    
class AdminFAQView(APIView) :
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get(self, request):
        user_meta = request.user.usermeta
        establishment = user_meta.establishment if user_meta else None

        if not establishment:
            return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)

        faqs = FAQ.objects.filter(id_establishment=establishment)

        serializer = FAQSerializer(faqs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = AdminFAQSerializer(data=request.data)
        if serializer.is_valid():

            establishment = request.user.usermeta.establishment
            if not establishment:
                return Response({"error": "No establishment associated with the user."}, status=status.HTTP_400_BAD_REQUEST)
            
            FAQ.objects.create(
                category=serializer.validated_data['category'],
                question=serializer.validated_data['question'],
                answer=serializer.validated_data['answer'],
                id_establishment=establishment
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        faq_id = request.data.get('id')
        if not faq_id:
            return Response({"error": "FAQ ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        faq = get_object_or_404(FAQ, id=faq_id)
        serializer = AdminFAQSerializer(faq, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        faq_id = request.data.get('id')
        if not faq_id:
            return Response({"error": "FAQ ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        faq = get_object_or_404(FAQ, id=faq_id)
        establishment = request.user.usermeta.establishment

        if faq.establishment != establishment:
            return Response({"error": "You do not have permission to delete this FAQ."}, status=status.HTTP_403_FORBIDDEN)

        faq.delete()
        return Response({"message": "FAQ deleted successfully."}, status=status.HTTP_200_OK)