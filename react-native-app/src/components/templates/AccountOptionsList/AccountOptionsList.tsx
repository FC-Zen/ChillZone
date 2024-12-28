import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Divider } from '@components/atoms/Divider';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { Button } from '@components/molecules';
import { colors } from '@theme';
import fr from 'src/assets/fr.json'; // Fichier FR
import en from 'src/assets/en.json'; // Fichier EN

import { styles } from './style';

export type AccountOptionsListProps = {
  isDarkTheme: boolean;
  currentLanguage: 'fr' | 'en';
  onToggleTheme: () => void;
  onChangeLanguage: (newLang: 'fr' | 'en') => void;
  onOpenReservationsModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenEditInfoModal: () => void;
  onOpenPasswordModal: () => void;
  onOpenResetPasswordModal: () => void;
  onOpenLinksModal: () => void;
};

export const AccountOptionsList: React.FC<AccountOptionsListProps> = ({
  isDarkTheme,
  currentLanguage,
  onToggleTheme,
  onChangeLanguage,
  onOpenReservationsModal,
  onOpenOrdersModal,
  onOpenEditInfoModal,
  onOpenPasswordModal,
  onOpenResetPasswordModal,
  onOpenLinksModal,
}) => {
  // 1. Choix du fichier JSON en fonction de la langue
  const accountOptionsData = currentLanguage === 'fr' ? fr : en;

  // 2. Fonction pour basculer la langue FR <-> EN
  const toggleLanguage = () => {
    const newLang = currentLanguage === 'fr' ? 'en' : 'fr';
    onChangeLanguage(newLang);
  };

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      {/* Boutons d'actions */}
      <Button
        title={accountOptionsData.headers.recapReservation}
        icon={{ name: 'BookMark', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={onOpenReservationsModal}
      />
      <Divider />
      <Button
        title={accountOptionsData.headers.recapCommands}
        icon={{ name: 'Hamburger', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={onOpenOrdersModal}
      />
      <Divider />
      <Button
        title={accountOptionsData.modals.infoChange}
        icon={{ name: 'Following', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={onOpenEditInfoModal}
      />
      <Divider />
      <Button
        title={accountOptionsData.modals.pwdChange}
        icon={{ name: 'Lock', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={onOpenPasswordModal}
      />
      <Divider />
      <Button
        title={accountOptionsData.buttons.auth.resetPwd}
        icon={{ name: 'Refresh', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={onOpenResetPasswordModal}
      />
      <Divider />
      <View style={styles.row}>
        <Button
          title={
            isDarkTheme
              ? accountOptionsData.buttons.profile.lightTheme
              : accountOptionsData.buttons.profile.darkTheme
          }
          icon={{ name: 'Fill', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onToggleTheme}
        />
        <ToggleSwitch />
      </View>
      <Divider />
      <Button
        // on utilise accountOptionsData pour la traduction
        title={`${accountOptionsData.buttons.profile.changelng} (${
          currentLanguage === 'fr'
            ? accountOptionsData.buttons.profile.fr
            : accountOptionsData.buttons.profile.en
        })`}
        icon={{ name: 'Setting', color: colors.white }}
        variant="icon"
        color={colors.resolutionBlue}
        textColor={colors.white}
        onPress={toggleLanguage} // on appelle la fonction pour basculer la langue
      />
      <Divider />
      <TouchableOpacity style={styles.newsButton} onPress={onOpenLinksModal}>
        <Text style={styles.newsText}>
          {accountOptionsData.buttons.profile.actus}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
