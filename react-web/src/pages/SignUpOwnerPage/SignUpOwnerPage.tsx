import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { SnackBar } from '@components';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@hooks';
import { SignUpOwnerAccountTemplate, SignUpOwnerFinishTemplate, SignUpOwnerRestaurantTemplate } from '@components/templates';
import { ROUTE } from '@enums';
import { addOwnerInscription, getEstablishments } from '@services/OwnerServices';

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
        password_verified : "",
        name : "",
        description : "",
        opening_time : "",
        closing_time : "",
        location : "",
        restauration_type : "",
        phone_restaurant : "",
        establishments : "",
    });

    const fieldsFormData = {
        first_name: { name: 'first_name', label: t('fields.common.first_name') },
        last_name: { name: 'last_name', label: t('fields.common.last_name') },
        type: { name: 'type', label: t('fields.common.type') },
        email: { name: 'email', label: t('fields.common.mail') },
        phone: { name: 'phone', label: t('fields.common.phone') },
        password: { name: 'password', label: t('fields.auth.password') },
        password_verified: { name: 'password_verified', label: t('fields.auth.verifyNewPassword') },
        name: { name: 'name', label: t('fields.common.last_name') },
        description: { name: 'description', label: t('fields.common.description') },
        opening_time: { name: 'opening_time', label: t('fields.hours.opening_time') },
        closing_time: { name: 'closing_time', label: t('fields.hours.closing_time') },
        location: { name: 'location', label: t('fields.common.location') },
        restauration_type: { name: 'restauration_type', label: t('fields.common.category') },
        phone_restaurant: { name: 'phone_restaurant', label: t('fields.common.phone') },
        establishments: { name: 'establishments', label: t('fields.common.establishment') },
    };      

    const options = [
        { value: 'fridge', label: t('categories.fridge') },
        { value: 'restaurant', label: t('categories.restaurant') },
    ];

    const [establishments, setEstablishments] = useState<{ id: number; name: string }[]>([]);

    const fetchUserData = async () => {
        try {
        const res = await getEstablishments(); // SERVICES
        if (res) {
            setEstablishments(res.establishments); 
        }
        } catch (error) {
        console.error('Erreur lors du chargement des données utilisateurs:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleInputChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        //console.log(formData);
    };

    const [file, setFile] = React.useState<File | null>(null);

    const handleFileChange = (filedata: File) => {
        setFile(filedata);
        console.log(file);
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
            if (formData.password != formData.password_verified) {
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
            const formDataToSend = new FormData();
            (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            if (file) {
                formDataToSend.append("photo_link", file);
            } 
            console.log(formDataToSend);
            const res = await addOwnerInscription(formDataToSend);
            if (res) {
                setStatePage("final");
            } else {
                setStatePage("account");
                setSnackbar({
                    open: true,
                    severity: 'error',
                    message: "Erreur d'inscription",
                });
            }
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
                        handleFileChange={handleFileChange}
                        fields={fieldsFormData}
                        formData={formData}
                        options={options}
                        optionsEstablishments={establishments}
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
