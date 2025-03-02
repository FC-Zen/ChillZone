import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style';
import { Icon } from '@components/atoms/Icons';
import { colors } from '@theme';
import { Button, Input } from '@components/molecules';
import { useTranslation } from 'react-i18next';

export type EditInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    first_name: string;
    last_name: string;
    phone: string;
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
            value={data.first_name}
            onChangeText={(text) => onChange('first_name', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.last_name')}
            icon="User"
            value={data.last_name}
            onChangeText={(text) => onChange('last_name', text)}
          />
          <Input
            style={styles.input}
            placeholder={t('fields.common.phone')}
            icon="Phone"
            value={data.phone}
            onChangeText={(text) => onChange('phone', text)}
          />
          <Button
            onPress={onConfirm}
            title={t('buttons.actions.confirm')}
            color={colors.aquaDeep}
            style={styles.confirmButton}
          />
        </View>
      </View>
    </Modal>
  );
};
