import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { Input } from '@components/molecules';
import { useTranslation } from 'react-i18next';

export type EditInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  onChange: (field: keyof EditInfoModalProps['data'], value: string) => void;
  onConfirm: () => void;
};

export const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
  onConfirm,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton}>
            <Icon
              name="Cross"
              width={15}
              height={15}
              color={colors.white}
              onPress={onClose}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{t('modals.infoChange')}</Text>

          <Input
            style={styles.input}
            placeholder={t('fields.common.first_name')}
            icon="User"
            value={data.firstName}
            onChangeText={(text) => onChange('firstName', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.last_name')}
            icon="User"
            value={data.lastName}
            onChangeText={(text) => onChange('lastName', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.phone')}
            icon="Phone"
            value={data.phone}
            onChangeText={(text) => onChange('phone', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.mail')}
            icon="Mail"
            value={data.email}
            onChangeText={(text) => onChange('email', text)}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>
              {t('buttons.actions.confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
