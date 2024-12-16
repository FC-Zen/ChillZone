import React from 'react';
import { View } from 'react-native';
import { NotificationList, NotificationListProps } from '@components/organisms/NotificationList/NotificationList';
import { PageHeader } from '@components/molecules/PageHeader';
import { styles } from './style';

export type NotificationTemplateProps = {
  notifications: NotificationListProps["notifications"];
};

export const NotificationTemplate : React.FC<NotificationTemplateProps> = ({
  notifications,
}) => {
    return (
      <View style={styles.container}>
        <PageHeader title="Notifications" />
        <NotificationList notifications={notifications} />
      </View>
    );
};
