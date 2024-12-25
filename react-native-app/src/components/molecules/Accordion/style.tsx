import { StyleSheet } from 'react-native';
import { colors, layout, typography } from '@theme';

export const styles = StyleSheet.create({
  accordion: {
    display: 'flex',
    width:'100%',
    marginBottom: 10,
    backgroundColor: colors.resolutionBlue,
    borderBlockColor: colors.white,
    borderColor: colors.white, 
    borderWidth: 1, 
    borderRadius: 10,
    padding: 0,
  },
  title: {
    color: colors.white,
    textAlign: 'left',
    fontFamily: typography.h4.fontFamily,
    fontSize: typography.h4.fontSize,
    flexWrap: 'wrap',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  answer: {
    color: colors.black, 
    fontFamily: typography.h4.fontFamily,
    fontSize: typography.h4.fontSize,
    flexWrap: 'wrap', 
    width: '100%', 
    paddingVertical: 5,
    marginBottom: 10,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
