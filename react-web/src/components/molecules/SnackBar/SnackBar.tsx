import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  severity = 'success',
}) => {
  return (
    <Snackbar
      open={visible}
      autoHideDuration={4000}
      onClose={onDismiss}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        zIndex: 999,
        margin: 2,
      }}
    >
      <Alert onClose={onDismiss} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
