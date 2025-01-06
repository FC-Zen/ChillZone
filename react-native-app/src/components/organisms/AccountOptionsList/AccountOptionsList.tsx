import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { LinksModal } from '@components/organisms/LinksModal';
import { PasswordModal } from '@components/organisms/PasswordModal';
import { ResetPasswordModal } from '@components/organisms/ResetPasswordModal';
import { ChangeProfilePictureModal } from '@components/organisms/ChangeProfilePictureModal';
import { EditInfoModal } from '@components/organisms/EditInfoModal';
import { OrdersModal } from '@components/organisms/OrdersModal';
import ordersData from 'src/assets/data/commands.json';
import { ReservationsModal } from '@components/organisms/ReservationsModal';
import { colors } from '@theme';
import { Button } from '@components/molecules';

export const AccountOptionsList: React.FC = () => {
  // États pour les modales et les fonctionnalités
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('fr'); // Langue actuelle (par défaut : français)
  const [isLinksModalOpen, setLinksModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isChangeProfileModalOpen, setChangeProfileModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);

  // Fonction pour changer le thème
  const handleToggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Fonction pour changer de langue
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    setCurrentLanguage(newLanguage);

    // Si vous utilisez i18next, ajoutez :
    // i18next.changeLanguage(newLanguage);

    Alert.alert(
      'Langue changée',
      `Langue actuelle : ${newLanguage.toUpperCase()}`
    );
  };

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      {/* Boutons d'actions */}
      <Button
        title="Mes réservations"
        icon={{ name: 'BookMark', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={() => setReservationsModalOpen(true)}
      />
      <Button
        title="Mes commandes"
        icon={{ name: 'Hamburger', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={() => setOrderModalOpen(true)}
      />
      <Button
        title="Modifier mes informations"
        icon={{ name: 'Following', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={() => setEditInfoModalOpen(true)}
      />
      <Button
        title="Modifier mon mot de passe"
        icon={{ name: 'Lock', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={() => setPasswordModalOpen(true)}
      />
      <Button
        title="Réinitialiser mon mot de passe"
        icon={{ name: 'Refresh', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={() => setResetModalOpen(true)}
      />
      <View style={styles.row}>
        <Button
          title={
            isDarkTheme
              ? 'Désactiver le thème sombre'
              : 'Activer le thème sombre'
          }
          icon={{ name: 'Fill', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={handleToggleTheme}
        />
        <ToggleSwitch value={isDarkTheme} onChange={handleToggleTheme} />
      </View>
      <Button
        title={`Changer de langue (${currentLanguage === 'fr' ? 'FR' : 'EN'})`}
        icon={{ name: 'Setting', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={handleChangeLanguage}
      />
      <TouchableOpacity
        style={styles.newsButton}
        onPress={() => setLinksModalOpen(true)}
      >
        <Text style={styles.newsText}>Actualités de l’université</Text>
      </TouchableOpacity>

      {/* Modales */}
      <LinksModal
        isOpen={isLinksModalOpen}
        onClose={() => setLinksModalOpen(false)}
      />
      <EditInfoModal
        isOpen={isEditInfoModalOpen}
        onClose={() => setEditInfoModalOpen(false)}
        onConfirm={function (data: {
          firstName: string;
          lastName: string;
          phone: string;
          email: string;
        }): void {
          throw new Error('Function not implemented.');
        }}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
      />
      <ChangeProfilePictureModal
        isOpen={isChangeProfileModalOpen}
        onClose={() => setChangeProfileModalOpen(false)}
      />
      <OrdersModal
        isOpen={isOrderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        orders={ordersData}
      />
      <ReservationsModal
        isOpen={isReservationsModalOpen}
        onClose={() => setReservationsModalOpen(false)}
      />
      <OrdersModal
        isOpen={isOrderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        orders={ordersData}
      />
      <ReservationsModal
        isOpen={isReservationsModalOpen}
        onClose={() => setReservationsModalOpen(false)}
      />
      <OrdersModal
        isOpen={isOrderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        orders={ordersData}
      />
      <ReservationsModal
        isOpen={isReservationsModalOpen}
        onClose={() => setReservationsModalOpen(false)}
      />
    </View>
  );
};

// Styles pour le composant
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lightContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#333',
    padding: 20,
  },
  newsButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.resolutionBlue,
    borderRadius: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  newsText: {
    color: colors.resolutionBlue,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
