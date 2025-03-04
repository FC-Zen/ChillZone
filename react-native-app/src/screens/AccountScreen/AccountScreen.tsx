import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { AccountTemplate } from '@components/templates';
import { styles } from './style';
import { logoutUser, sendPasswordRecoveryEmail, translationService } from '@services';
import { useNavigation } from '@hooks';
import { ROUTE } from '@enums';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '@contexts';
import { changeProfilePicture, deleteProfilePicture, updateInfoUser, updatePassword } from '@services/AccountServices';
import { useTranslation } from 'react-i18next';
import { SnackBar } from '@components';

export const AccountScreen: React.FC = () => {
  // États pour les modales
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isEditInfoModalOpen, setEditInfoModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: 'success' | 'error';
    message: string;
  }>({
    open: false,
    severity: 'success',
    message: '',
  });

  // Navigation
  const { t } = useTranslation();
  const navigation = useNavigation();

  // États pour le thème sombre et la langue
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Données utilisateur
  const userContext = UserContext.getInstance().getUser();
  const [userData, setUserData] = useState({
    first_name: userContext.first_name,
    last_name: userContext.last_name,
    phone: userContext.phone,
    email: userContext.email,
    photo_link : userContext.photo_link
  });

  // État pour le mot de passe et email
  const [email, setEmail] = useState(userData.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation du mot de passe
  const newPasswordValidation = {
    minLength: newPassword.length >= 12,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecialChar: /[@$!%*?&]/.test(newPassword),
  };

  // Gestion des champs d'input
  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };
  
  // Actions pour les modales
  const handleConfirmEditInfo = async () => {
    try {
      const res = await updateInfoUser(
        {
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
        },
        t
      );
      if (res?.success) {
        setSnackbar({ open: true, severity: 'success', message: res.message });
      }
      setEditInfoModalOpen(false);
    } catch {
      setSnackbar({ open: true, severity: 'error', message: 'Une erreur est survenue lors de la mise à jour.' });
    }
  };

  const handleResetPassword = async () => {
    try {
      if (email) {
        const res = await sendPasswordRecoveryEmail({ email: email });
        if (res?.success) {
          setSnackbar({ open: true, severity: 'success', message: res.message });
        }
      }
      setResetModalOpen(false);
    } catch {
      setSnackbar({ open: true, severity: 'error', message: 'Une erreur est survenue.' });
    }
  };

  const handleSubmitPasswordChange = async () => {
    try {
      const res = await updatePassword(
        {
          password_actual: oldPassword,
          password: newPassword,
          confirmPassword: confirmPassword,
        },
        t
      );
      if (res?.success) {
        setSnackbar({ open: true, severity: 'success', message: res.message });
      }
      setPasswordModalOpen(false);
    } catch {
      setSnackbar({ open: true, severity: 'error', message: 'La mise à jour du mot de passe a échoué.' });
    }
  };


  const handleChangePicture = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert("Permission d'accès aux images refusée !");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (result.canceled) {
        console.log('Sélection annulée');
        return;
      }
  
      const selectedImage = result.assets[0];
  
      const formData = new FormData();
      formData.append('photo_link', {
        uri: selectedImage.uri,
        name: selectedImage.fileName || 'profile.jpg',
        type: 'image/jpeg'
      } as any);
      const res = await changeProfilePicture(formData);
      if (res?.success) {
        UserContext.getInstance().setUser({ ...userContext, photo_link: res.data.photo_link });
        setUserData((prev) => ({ ...prev, photo_link: res.data.photo_link }));
        setSnackbar({ open: true, severity: 'success', message: res.message });
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’image:', error);
    }
  };
  
  
  const handleDeletePicture = async () => {
    try {
      const res = await deleteProfilePicture();
      if (res?.success) {
        UserContext.getInstance().setUser({ ...userContext, photo_link: res.data.photo_link });
        setUserData((prev) => ({ ...prev, photo_link: res.data.photo_link }));      
        setSnackbar({ open: true, severity: 'success', message: res.message });
      }
    } catch (error) {
      setSnackbar({ open: true, severity: 'error', message: (error as any).message || 'Une erreur est survenue.' });
    }
  };

  //Force la déconnexion surtout si on a un rememberMe d'actif
  const handleLogout = async () => {
    const logout = await logoutUser(true);
    console.log("Logout: ",logout);

    if(logout.success === true){
      console.log("Logout bon on retourne à la connexion ");
      navigation.navigate(ROUTE.LOGIN_SCREEN)
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, isDarkTheme && styles.darkContainer]}
    >
      <SnackBar
        visible={snackbar.open}
        message={snackbar.message}
        onDismiss={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      />

      <AccountTemplate
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
        currentLanguage={translationService.getCurrentLanguage()}
        onChangeLanguage={() => translationService.toggleLanguage()}
        onOpenPasswordModal={() => setPasswordModalOpen(true)}
        onClosePasswordModal={() => setPasswordModalOpen(false)}
        onOpenResetPasswordModal={() => setResetModalOpen(true)}
        onCloseResetModal={() => setResetModalOpen(false)}
        onOpenEditInfoModal={() => setEditInfoModalOpen(true)}
        onCloseEditInfoModal={() => setEditInfoModalOpen(false)}
        onNavigateToReservations={() => navigation.navigate(ROUTE.RESERVATION_SUMMARY)}
        onNavigateToCommand={() => navigation.navigate(ROUTE.COMMAND_SUMMARY)}
        onChangePicture={handleChangePicture}
        onDeletePicture={handleDeletePicture}
        isPasswordModalOpen={isPasswordModalOpen}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        newPasswordValidation={newPasswordValidation}
        onSubmitPasswordChange={handleSubmitPasswordChange}
        isResetModalOpen={isResetModalOpen}
        email={email}
        setEmail={setEmail}
        handleResetPassword={handleResetPassword}
        isEditInfoModalOpen={isEditInfoModalOpen}
        userData={userData}
        handleInputChange={handleInputChange}
        handleConfirmEditInfo={handleConfirmEditInfo}
        isModalOpen={isModalOpen}
        onOpenModal={() => setModalOpen(true)}
        onCloseModal={() => setModalOpen(false)}
        onBackPress={() => navigation.navigate(ROUTE.HOME)}
        handleLogout={handleLogout}
      />
    </SafeAreaView>
  );
};
