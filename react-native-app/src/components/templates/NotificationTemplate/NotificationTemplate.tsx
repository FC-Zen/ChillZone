import React from 'react';
import { View } from 'react-native';
import { NotificationList } from '@components/organisms/NotificationList/NotificationList';
import { PageHeader } from '@components/molecules/PageHeader';
import { styles } from './style';
import { NotificationProps } from '@components/molecules/Notification';

export type NotificationTemplateProps = {
  notifications: NotificationProps[];
  onBackPress?: () => void;
};

export const NotificationTemplate : React.FC<NotificationTemplateProps> = ({
  notifications, onBackPress
}) => {
    return (
      <View style={styles.container}>
        <PageHeader title="Notifications" variant='back' onBackPress={onBackPress}/>
        <NotificationList notifications={notifications} />
      </View>
    );
};
