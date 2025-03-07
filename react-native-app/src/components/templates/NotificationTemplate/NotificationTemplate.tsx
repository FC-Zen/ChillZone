import React from 'react';
import { View } from 'react-native';
import { NotificationList, NotificationListProps } from '@components/organisms';
import { PageHeader, PageHeaderProps } from '@components/molecules';
import { styles } from './style';

export type NotificationTemplateProps = {
  notificationsData: { notifications: NotificationListProps['notifications'] };
  pageHeaderProps: PageHeaderProps;
};

export const NotificationTemplate: React.FC<NotificationTemplateProps> = ({
  notificationsData,
  pageHeaderProps,
}) => {
  return (
    <View style={styles.container}>
      <PageHeader
        title={pageHeaderProps.title}
        variant={pageHeaderProps.variant}
        icon={pageHeaderProps.icon}
        onBackPress={pageHeaderProps.onBackPress}
      />
      <NotificationList notifications={notificationsData.notifications} />
    </View>
  );
};
