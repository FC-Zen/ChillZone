import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { ToggleSwitch } from '@components/atoms/ToggleSwitch';
import { Button } from '@components/molecules';
import { colors, typography } from '@theme';
import { SelectorPolygon } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import { styles } from './style';
import { translationService } from '@services/translationService';

export type AccountOptionsListProps = {
  isDarkTheme: boolean;
  currentLanguage: string;
  onToggleTheme: () => void;
  onChangeLanguage: () => void;
  onOpenEditInfoModal: () => void;
  onOpenPasswordModal: () => void;
  onOpenResetPasswordModal: () => void;
  onNavigateToReservations: () => void;
  onNavigateToCommand: () => void;
};

export const AccountOptionsList: React.FC<AccountOptionsListProps> = ({
  isDarkTheme,
  onToggleTheme,
  onOpenEditInfoModal,
  onOpenPasswordModal,
  onOpenResetPasswordModal,
  onNavigateToReservations,
  onNavigateToCommand,
}) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const [currentLanguage, setCurrentLanguage] = useState(
    translationService.getCurrentLanguage() // Utilise le service pour récupérer la langue actuelle
  );

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
  }, []);

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
          icon={{
            name: 'BookMark',
            color: colors.white,
            width: 24,
            height: 24,
          }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onNavigateToReservations}
        />
      </View>

      {/* Section Commandes */}
      <View style={styles.card}>
        <Button
          title={t('buttons.profile.commands')}
          icon={{
            name: 'Hamburger',
            color: colors.white,
            width: 24,
            height: 20,
          }}
          variant="icon"
          color={colors.resolutionBlue}
          textColor={colors.white}
          onPress={onNavigateToCommand} // Remplacer par le screen
          style={styles.commandsButton}
        />
      </View>

      {/* Section Informations */}
      <View style={styles.card2}>
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
      <View style={styles.card2}>
        <View style={styles.col}>
          <Button
            title={t('modals.pwdChange')}
            icon={{ name: 'Lock', color: colors.white }}
            variant="icon"
            style={styles.resetButton}
            color={colors.resolutionBlue}
            textColor={colors.white}
            onPress={onOpenPasswordModal}
          />
          <Button
            title={t('buttons.auth.resetPwd')}
            icon={{ name: 'Refresh', color: colors.white }}
            variant="icon"
            style={styles.resetButton}
            color={colors.resolutionBlue}
            textColor={colors.white}
            onPress={onOpenResetPasswordModal}
          />
        </View>
      </View>

      {/* Section Thème et Langue */}
      <View style={styles.card2}>
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
            <View>
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

      <TouchableOpacity>
        <Button
          title={t('buttons.profile.actus')}
          onPress={() => navigation.navigate(ROUTE.LINKS)}
          variant="news"
          textColor={colors.resolutionBlue}
        />
      </TouchableOpacity>
    </View>
  );
};
