import { View } from 'react-native';
import { styles } from './style';
import { Overlay, PageHeader } from '@components';

export const ReservationSummaryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <PageHeader title="Résumé de la réservation" variant="back" />
      <Overlay
        title="Réservation"
        date="10/10/2024"
        etage="Etage 1"
        horaire="12h00-13h00"
        location="IUT Champs sur Marne"
        salle="Salle 001"
        titleBtn="Annuler la réservation"
      />
    </View>
  );
};
