import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { styles } from './style';
import { ModalHeader } from '@components/molecules';
import { ModalForm } from '@components/organisms';

type RoomModalprops = {
  isOpen: boolean;
  onClose: () => void;
  addRoom: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  listInputs: InputField[];
};

export const RoomModal = ({
  isOpen,
  onClose,
  addRoom,
  title,
  listInputs,
}: RoomModalprops) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
          <ModalHeader title={title} onClose={onClose} />
        <div style={styles.body}>
          <ModalForm onSubmit={addRoom} listInputs={listInputs} />
        </div>
      </div>
    </div>
  );
};


