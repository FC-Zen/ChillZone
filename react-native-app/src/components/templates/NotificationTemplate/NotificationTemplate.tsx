import React from 'react';
import { View } from 'react-native';
import { NotificationList } from '@components/organisms/NotificationList';
import { PageHeader } from '@components/molecules/PageHeader';
import { styles } from './style';
import { PageHeaderProps } from '../../molecules/PageHeader';
import { NotificationProps } from '@components/molecules/Notification';
import { PopupProps } from '@components/molecules/NotificationPopup';
import { NotificationPopupProps } from '@components/molecules/NotificationPopup';

export type NotificationTemplateProps = {
  notificationsData: NotificationProps[];
  popupProps: PopupProps;
  pageHeaderProps: PageHeaderProps;
};

export const NotificationTemplate : React.FC<NotificationTemplateProps> = ({
  notificationsData,
  popupProps,
  pageHeaderProps,
}) => {
    return (
      <View style={styles.container}>
        <PageHeader title={pageHeaderProps.title} variant={pageHeaderProps.variant} icon={pageHeaderProps.icon} onBackPress={pageHeaderProps.onBackPress} />
        <NotificationList 
          notifications={notificationsData} 
          popupProps={popupProps}
        />
      </View>
    );
};
