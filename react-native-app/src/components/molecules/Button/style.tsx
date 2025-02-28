import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';
import { ButtonProps } from './Button';
import { Icon } from '@components/atoms';

export const ButtonWrapper: FC<ButtonProps> = ({
  variant,
  style,
  onPress,
  title,
  icon,
  color,
  textColor,
  textSize,
  textFont,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress || undefined}
      style={[
        styles.button,
        variant === 'primary' && { backgroundColor: colors.resolutionBlue },
        variant === 'secondary' && { backgroundColor: colors.white },
        variant === 'icon' && styles.iconVariant,
        variant === 'news' && styles.newsVariant,
        color && { backgroundColor: color },
        style,
      ]}
    >
      {variant === 'icon' && icon && <Icon {...icon} />}
      <Text
        style={[
          styles.text,
          { color: textColor, fontFamily: textFont, fontSize: textSize },
          variant === 'icon' && styles.iconText, // Style spécifique pour le texte avec icône
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: layout.radius.xxxl,
    borderWidth: layout.size['0'],
    borderColor: colors.white,
    zIndex: 10,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontSize: typography.h3.fontSize,
    fontFamily: typography.h3.fontFamily,
    flexWrap: 'wrap',
    fontWeight: '600',
  },
  iconVariant: {
    flexDirection: 'row',
    justifyContent: 'center', // Contenu aligné à gauche
    alignItems: 'center',
    paddingHorizontal: 10, // Espace intérieur horizontal
  },
  iconText: {
    textAlign: 'left', // Alignement du texte à gauche
    marginLeft: 10, // Espacement entre l'icône et le texte
  },
  newsVariant: {
    display: 'flex',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.resolutionBlue,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  newsText: {
    color: colors.resolutionBlue,
    fontSize: typography.h4.fontSize,
    fontFamily: typography.h2.fontFamily,
    textAlign: 'center',
  },
});
