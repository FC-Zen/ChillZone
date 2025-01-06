import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
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
import { styles } from './style';
import { translationService } from '@services';

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

  // Gestion du changement de langue
  const [currentLanguage, setCurrentLanguage] = useState(
    translationService.getCurrentLanguage()
  );

  const handleChangeLanguage = () => {
    translationService.toggleLanguage();
  };

  // Gestion du thème sombre
  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

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
