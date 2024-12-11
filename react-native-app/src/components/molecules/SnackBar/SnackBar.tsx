import React from 'react';
import { Snackbar } from 'react-native-paper';

export type SnackBarProps = {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  severity?: 'error' | 'success';
};

export const SnackBar: React.FC<SnackBarProps> = ({
  visible,
  message,
  onDismiss,
  severity,
}) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={4000}
      style={[{ backgroundColor: severity === 'error' ? 'red' : 'green' }]}
      action={{
        label: '✖',
        onPress: onDismiss,
        color: 'white',
      }}
      wrapperStyle={{
        zIndex: 999,
        top: '5%',
        borderRadius: 4,
        margin: 16,
      }}
    >
      {message}
    </Snackbar>
  );
};

export default SnackBar;
