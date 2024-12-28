import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Divider } from '@components/atoms/Divider';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { colors } from '@theme';
import { Button } from '@components/molecules';

export type AccountOptionsListProps = {
  isDarkTheme: boolean;
  currentLanguage: string;
  onToggleTheme: () => void;
  onChangeLanguage: () => void;
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
}) => (
  <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
    {/* Boutons d'actions */}
    <Button
      title="Mes réservations"
      icon={{ name: 'BookMark', color: colors.white }}
      variant="icon"
      color={colors.resolutionBlue}
      textColor={colors.white}
      onPress={onOpenReservationsModal}
    />
    <Divider />
    <Button
      title="Mes commandes"
      icon={{ name: 'Hamburger', color: colors.white }}
      variant="icon"
      color={colors.resolutionBlue}
      textColor={colors.white}
      onPress={onOpenOrdersModal}
    />
    <Divider />
    <Button
      title="Modifier mes informations"
      icon={{ name: 'Following', color: colors.white }}
      variant="icon"
      color={colors.resolutionBlue}
      textColor={colors.white}
      onPress={onOpenEditInfoModal}
    />
    <Divider />
    <Button
      title="Modifier mon mot de passe"
      icon={{ name: 'Lock', color: colors.white }}
      variant="icon"
      color={colors.resolutionBlue}
      textColor={colors.white}
      onPress={onOpenPasswordModal}
    />
    <Divider />
    <Button
      title="Réinitialiser mon mot de passe"
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
          isDarkTheme ? 'Désactiver le thème sombre' : 'Activer le thème sombre'
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
      title={`Changer de langue (${currentLanguage === 'fr' ? 'FR' : 'EN'})`}
      icon={{ name: 'Setting', color: colors.white }}
      variant="icon"
      color={colors.resolutionBlue}
      textColor={colors.white}
      onPress={onChangeLanguage}
    />
    <Divider />
    <TouchableOpacity style={styles.newsButton} onPress={onOpenLinksModal}>
      <Text style={styles.newsText}>Actualités de l’université</Text>
    </TouchableOpacity>
  </View>
);

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
