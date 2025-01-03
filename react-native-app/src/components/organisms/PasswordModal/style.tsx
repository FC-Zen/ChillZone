import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: '#2E2A85',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    position: 'relative', // Nécessaire pour positionner la croix
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  validationTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  validationTag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  validTag: {
    backgroundColor: '#DFF2E0',
    borderColor: '#00A859',
    borderWidth: 1,
  },
  invalidTag: {
    backgroundColor: '#FFE6E6',
    borderColor: '#FF5A5A',
    borderWidth: 1,
  },
  validationTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  validText: {
    color: '#00A859',
  },
  invalidText: {
    color: '#FF5A5A',
  },
  button: {
    backgroundColor: '#005745',
    borderRadius: 50,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
