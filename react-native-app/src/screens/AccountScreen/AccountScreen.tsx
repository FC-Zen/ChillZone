import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AccountTemplate } from '@components/templates/AccountTemplate';
import {
  LinksModal,
  PasswordModal,
  ResetPasswordModal,
  EditInfoModal,
  OrdersModal,
  ReservationsModal,
} from '@components/organisms';
import ordersData from 'src/assets/data/commands.json';
import i18next from 'i18next';
import { colors } from '@theme';

export const AccountScreen: React.FC = () => {
  // États pour les modales
  const [isLinksModalOpen, setLinksModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);

  // États pour le thème sombre et la langue
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    i18next.language || 'fr'
  );

  // Gestion du thème sombre
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  // Gestion du changement de langue
  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    setCurrentLanguage(newLanguage);
    i18next.changeLanguage(newLanguage);
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkTheme && styles.darkContainer]}
    >
      <AccountTemplate
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
        currentLanguage={currentLanguage}
        onChangeLanguage={handleChangeLanguage}
        onOpenLinksModal={() => setLinksModalOpen(true)}
        onOpenPasswordModal={() => setPasswordModalOpen(true)}
        onOpenResetPasswordModal={() => setResetModalOpen(true)}
        onOpenEditInfoModal={() => setEditInfoModalOpen(true)}
        onOpenOrdersModal={() => setOrderModalOpen(true)}
        onOpenReservationsModal={() => setReservationsModalOpen(true)}
      />

      {/* Modales */}
      <LinksModal
        isOpen={isLinksModalOpen}
        onClose={() => setLinksModalOpen(false)}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
      />
      <EditInfoModal
        isOpen={isEditInfoModalOpen}
        onClose={() => setEditInfoModalOpen(false)}
        onConfirm={(data) => console.log(data)}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white }, // Style par défaut
  darkContainer: { backgroundColor: colors.aquaDeep }, // Style pour le thème sombre
});
