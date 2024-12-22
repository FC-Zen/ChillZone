import django_filters as filter

from chillzone.models import RestaurationPlace

class RestaurationPlaceFilter(filter.FilterSet):

    name = filter.CharFilter(lookup_expr='icontains')

    restauration_type = filter.MultipleChoiceFilter(choices=RestaurationPlace.TYPE_CHOICES)

    class Meta:
        model = RestaurationPlace
        fields = ['name', 'restauration_type']