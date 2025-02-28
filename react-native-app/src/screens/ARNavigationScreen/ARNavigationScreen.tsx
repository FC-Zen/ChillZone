import React from 'react';
import { View, Linking } from 'react-native';
import { styles } from './styles';
import { ARNavigationTemplate } from '@components';
import { useTranslation } from 'react-i18next';

export const ARNavigationScreen = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <ARNavigationTemplate 
                title={t('headers.maintenance')}
                redirectionMessage={t('maintenance.redirect')}
                infoMessage={t('maintenance.intro')}
                videoTitle={t('maintenance.videoTitle')}
                onRedirection={() => Linking.openURL('https://github.com/Roland-Fan-ZHANG/IUT-Meaux-app')}
            />
        </View>
    )
}
