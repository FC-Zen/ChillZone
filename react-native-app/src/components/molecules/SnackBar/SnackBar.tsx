import React from 'react';
import { Snackbar } from 'react-native-paper';
import { styles } from './style';

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
      style={[
        styles.snackbar,
        { backgroundColor: severity === 'error' ? 'red' : 'green' },
      ]}
      action={{
        label: '✖',
        onPress: onDismiss,
        color: 'white',
      }}
    >
      {message}
    </Snackbar>
  );
};

export default SnackBar;
