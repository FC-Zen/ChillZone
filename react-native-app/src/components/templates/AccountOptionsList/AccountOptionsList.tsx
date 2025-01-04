import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Divider } from '@components/atoms/Divider';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { Button } from '@components/molecules';
import { colors } from '@theme';
import { SelectorPolygon } from '@components/atoms/Icons';
import fr from 'src/assets/fr.json';
import en from 'src/assets/en.json';

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
  const accountOptionsData = currentLanguage === 'fr' ? fr : en;

  // Détermine l'image du drapeau en fonction de la langue actuelle
  const flagImage =
    currentLanguage === 'fr'
      ? require('src/assets/Images/fr.png') // Drapeau français
      : require('src/assets/Images/en.png'); // Drapeau anglais

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'fr' ? 'en' : 'fr';
    onChangeLanguage(newLang);
  };

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      {/* Section Réservations */}
      <View style={styles.card}>
        <Button
          title={accountOptionsData.headers.recapReservation}
          icon={{ name: 'BookMark', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenReservationsModal}
        />
      </View>

      {/* Section Commandes */}
      <View style={styles.card}>
        <Button
          title={accountOptionsData.headers.recapCommands}
          icon={{ name: 'Hamburger', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenOrdersModal}
        />
      </View>

      {/* Section Informations */}
      <View style={styles.card}>
        <Button
          title={accountOptionsData.modals.infoChange}
          icon={{ name: 'Following', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenEditInfoModal}
        />
      </View>

      {/* Section Modification */}
      <View style={styles.card}>
        <Button
          title={accountOptionsData.modals.pwdChange}
          icon={{ name: 'Lock', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenPasswordModal}
        />
        <Button
          title={accountOptionsData.buttons.auth.resetPwd}
          icon={{ name: 'Refresh', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenResetPasswordModal}
        />
      </View>

      {/* Section Thème et Langue */}
      <View style={styles.card}>
        <View style={styles.row}>
          {/* Bouton Thème */}
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
            //il manque le onpress c'est pour ça qu'il y'a une erreur rouge
          />
          {/* ToggleSwitch */}
          <ToggleSwitch value={isDarkTheme} onToggle={onToggleTheme} />
        </View>
        {/* Bouton Langue */}
        <TouchableOpacity style={styles.languageRow} onPress={toggleLanguage}>
          <View style={styles.languageContent}>
            <View style={styles.languageIconWrapper}>
              <Button
                title={accountOptionsData.buttons.profile.changelng}
                icon={{ name: 'Setting', color: colors.white }}
                variant="icon"
                color="transparent"
                textColor={colors.white}
                //il manque le onpress c'est pour ça qu'il y'a une erreur rouge
              />
            </View>
          </View>
          <View style={styles.languageSelectorWrapper}>
            <Image source={flagImage} style={styles.flag} />
            <SelectorPolygon width={10} height={9} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Section Actualités */}
      <TouchableOpacity style={styles.newsButton} onPress={onOpenLinksModal}>
        <Text style={styles.newsText}>
          {accountOptionsData.buttons.profile.actus}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
