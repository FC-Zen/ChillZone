import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { Button } from '@components/molecules';
import { colors } from '@theme';
import { SelectorPolygon } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { styles } from './style';
import { translationService } from '@services';

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
};

export const AccountOptionsList: React.FC<AccountOptionsListProps> = ({
  isDarkTheme,
  onToggleTheme,
  onOpenReservationsModal,
  onOpenOrdersModal,
  onOpenEditInfoModal,
  onOpenPasswordModal,
  onOpenResetPasswordModal,
}) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation(); // Utilisation de la navigation

  // État local pour la langue actuelle
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Mise à jour de l'état lorsque la langue change dans i18n
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);

    // Nettoyage de l'écouteur d'événements
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Détermine l'image du drapeau en fonction de la langue actuelle
  const flagImage =
    currentLanguage === 'fr'
      ? require('src/assets/Images/fr.png') // Drapeau français
      : require('src/assets/Images/en.png'); // Drapeau anglais

  // Fonction de basculement de la langue
  const toggleLanguage = () => {
    const newLang = currentLanguage === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang); // Met à jour la langue dans i18n
  };

  return (
    <View style={isDarkTheme ? styles.darkContainer : styles.lightContainer}>
      {/* Section Réservations */}
      <View style={styles.card}>
        <Button
          title={t('buttons.profile.reservations')}
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
          title={t('buttons.profile.commands')}
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
          title={t('buttons.profile.changeInfo')}
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
          title={t('modals.pwdChange')}
          icon={{ name: 'Lock', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenPasswordModal}
        />
        <Button
          title={t('buttons.auth.resetPwd')}
          icon={{ name: 'Refresh', color: colors.white }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onOpenResetPasswordModal}
          style={styles.resetPasswordButton} // Appliquer un style spécifique ici
        />
      </View>

      {/* Section Thème et Langue */}
      <View style={styles.card}>
        <View style={styles.row}>
          {/* Bouton Thème */}
          <Button
            title={
              isDarkTheme
                ? t('buttons.profile.lightTheme')
                : t('buttons.profile.darkTheme')
            }
            icon={{ name: 'Fill', color: colors.white }}
            variant="icon"
            color={colors.resolutionBlue}
            textColor={colors.white}
          />
          {/* ToggleSwitch */}
          <ToggleSwitch value={isDarkTheme} onToggle={onToggleTheme} />
        </View>

        {/* Bouton Langue */}
        <TouchableOpacity style={styles.languageRow} onPress={toggleLanguage}>
          <View style={styles.languageContent}>
            <View style={styles.languageIconWrapper}>
              <Button
                title={t('buttons.profile.changelng')}
                icon={{ name: 'Setting', color: colors.white }}
                variant="icon"
                color={colors.resolutionBlue}
                textColor={colors.white}
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
      <TouchableOpacity
        style={styles.newsButton}
        onPress={() => navigation.navigate(ROUTE.LINKS)}
      >
        <Text style={styles.newsText}>{t('buttons.profile.actus')}</Text>
      </TouchableOpacity>
    </View>
  );
};
