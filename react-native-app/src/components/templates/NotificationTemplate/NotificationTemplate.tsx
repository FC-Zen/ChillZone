import React from 'react';
import { View, Text } from 'react-native';
import { NotificationList, NotificationListProps } from '@components/organisms';
import { PageHeader, PageHeaderProps } from '@components/molecules';
import { styles } from './style';

export type NotificationTemplateProps = {
  notificationsData: { notifications: NotificationListProps['notifications'] };
  pageHeaderProps: PageHeaderProps;
  text: string;
};

export const NotificationTemplate: React.FC<NotificationTemplateProps> = ({
  notificationsData,
  pageHeaderProps,
  text,
}) => {
  return (
    <View style={styles.container}>
      <PageHeader
        title={pageHeaderProps.title}
        variant={pageHeaderProps.variant}
        icon={pageHeaderProps.icon}
        onBackPress={pageHeaderProps.onBackPress}
      />
      <Text style={styles.txt}>{text}</Text>
      <NotificationList notifications={notificationsData.notifications} />
    </View>
  );
};
