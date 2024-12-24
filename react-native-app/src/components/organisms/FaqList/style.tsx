import { colors, layout } from '@theme';
import { fonts, typography } from '@theme/typography';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  //Style for a container for a defined category
  container: {
    backgroundColor:  colors.white,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    borderBlockColor: colors.black,
    borderColor: colors.black, 
    borderWidth: 1, 
    borderRadius: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, 
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  // Style for the category title
  title: {
    fontFamily: fonts.semiBold,
    fontSize: typography.h3.fontSize,
  }
});
