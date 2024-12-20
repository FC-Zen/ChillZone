import { StyleSheet } from 'react-native';
import { colors, layout } from '@theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: layout.window.width,
    height: layout.window.height * 0.35,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderColor: colors.resolutionBlue,
    borderWidth: 4,
    elevation: 5,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: colors.resolutionBlue,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 5,
  },
  iconContainer2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
});
