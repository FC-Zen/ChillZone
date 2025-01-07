import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { styles } from './style';
import { Icon, IconProps } from '@components/atoms/Icons';
import { colors } from '@theme';
import user_data from 'src/assets/fr.json';
import { Input } from '@components/molecules';

// Déclaration des props juste au-dessus du composant
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
  data = { firstName: '', lastName: '', phone: '', email: '' }, // Valeur par défaut
  onChange,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton}>
            <Icon
              name="Cross"
              width={15}
              height={15}
              color={colors.white}
              onPress={onClose}
            />
          </TouchableOpacity>

          {/* Titre */}
          <Text style={styles.title}>{user_data.modals.infoChange}</Text>

          {/* Inputs */}
          <Input
            style={styles.input}
            placeholder={user_data.fields.common.first_name}
            icon="User"
            value={data.firstName}
            onChangeText={(text) => onChange('firstName', text)}
          />
          <Input
            style={styles.input}
            placeholder={user_data.fields.common.last_name}
            icon="User"
            value={data.lastName}
            onChangeText={(text) => onChange('lastName', text)}
          />
          <Input
            style={styles.input}
            placeholder={user_data.fields.common.phone}
            icon="User"
            value={data.phone}
            onChangeText={(text) => onChange('phone', text)}
          />
          <Input
            style={styles.input}
            placeholder={user_data.fields.common.mail}
            icon="User"
            value={data.email}
            onChangeText={(text) => onChange('email', text)}
          />

          {/* Bouton Confirmer */}
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>
              {user_data.buttons.actions.confirm}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
