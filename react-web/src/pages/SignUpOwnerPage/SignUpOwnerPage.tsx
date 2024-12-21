import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { SignUpOwnerAccountTemplate, SignUpOwnerFinishTemplate, SignUpOwnerRestaurantTemplate } from '@components/templates';
import { ROUTE } from '@enums';

type PageState = 'restaurant' | 'final' | 'account';

export const SignUpOwnerPage: React.FC = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [statePage, setStatePage] = useState<PageState>('account');

    const [formData, setFormData] = useState({
        first_name : "",
        last_name : "",
        type : "Owner",
        email : "",
        phone : "",
        password : "",
        verify_password : "",
        restauration_place_name : "",
        restauration_place_description : "",
        restauration_place_opening_time : "",
        restauration_place_closing_time : "",
        restauration_place_location : "",
        restauration_place_type : "",
        restauration_place_phone : "",
        link_to_establishment : "",
    });

    const fieldsFormData = {
        first_name: { name: 'first_name', label: t('fields.common.first_name') },
        last_name: { name: 'last_name', label: t('fields.common.last_name') },
        type: { name: 'type', label: t('fields.common.type') },
        email: { name: 'email', label: t('fields.common.mail') },
        phone: { name: 'phone', label: t('fields.common.phone') },
        password: { name: 'password', label: t('fields.auth.password') },
        verify_password: { name: 'verify_password', label: t('fields.auth.verifyNewPassword') },
        restauration_place_name: { name: 'restauration_place_name', label: t('fields.common.last_name') },
        restauration_place_description: { name: 'restauration_place_description', label: t('fields.common.description') },
        restauration_place_opening_time: { name: 'restauration_place_opening_time', label: t('fields.hours.opening_time') },
        restauration_place_closing_time: { name: 'restauration_place_closing_time', label: t('fields.hours.closing_time') },
        restauration_place_location: { name: 'restauration_place_location', label: t('fields.common.location') },
        restauration_place_type: { name: 'restauration_place_type', label: t('fields.common.category') },
        restauration_place_phone: { name: 'restauration_place_phone', label: t('fields.common.phone') },
        link_to_establishment: { name: 'link_to_establishment', label: t('fields.common.establishment') },
    };      

    const options = [
        { value: 'Fridge', label: t('categories.fridge') },
        { value: 'Restaurant', label: t('categories.restaurant') },
    ];

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        //console.log(formData);
    };

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        severity: 'success' | 'error';
        message: string;
    }>({
        open: false,
        severity: 'success',
        message: '',
    });

    const handlePress = async () => {
        if (statePage == "account") {
            if (formData.password != formData.verify_password) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: t('zod.passwordMismatch'),
                });
            } else {
                console.log(formData);
                setStatePage("restaurant");
            }
        }        
        else if (statePage == "restaurant") {
            console.log(formData);
            setStatePage("final");
        } else if (statePage == "final") {
            setStatePage("restaurant");
            //navigation.navigate(ROUTE.LOGIN)
        }
    };

    const handleBackPress = () => {
        setStatePage("account")
    };


    const closeSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <CssBaseline />
        <SnackBar
            visible={snackbar.open}
            message={snackbar.message} 
            severity={snackbar.severity}
            onDismiss={closeSnackbar}      
        />
        
        {
        (() => {
            switch (statePage) {
                case 'account':
                    return (
                    <SignUpOwnerAccountTemplate
                        title={t('headers.signinAccount')} 
                        buttonTitle={t('buttons.actions.continue')} 
                        onSubmitButton={handlePress}
                        handleInputChange={handleInputChange}
                        fields={fieldsFormData}
                        formData={formData}
                    />
                    );
                case 'restaurant':
                    return (
                    <SignUpOwnerRestaurantTemplate
                        title={t('headers.signinRestaurant')} 
                        buttonTitle={t('buttons.auth.confirmInscription')} 
                        buttonBackTitle={t('buttons.actions.back')} 
                        onBackButton={handleBackPress}
                        onSubmitButton={handlePress}
                        handleInputChange={handleInputChange}
                        fields={fieldsFormData}
                        formData={formData}
                        options={options}
                    />
                    );
                case 'final':
                    return (
                    <SignUpOwnerFinishTemplate 
                        title={t('headers.askAdmin')} 
                        text={t('info.infoSignIn')} 
                        buttonTitle={t('buttons.auth.return')} 
                        onPress={() => navigation.navigate(ROUTE.LOGIN)}                    
                    />
                    );
            default:
                return null;
            }
        })()
        }

        </div>
    );
};
