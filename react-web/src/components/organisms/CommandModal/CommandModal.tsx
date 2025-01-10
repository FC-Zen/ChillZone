import { styles } from './style';
import { ModalHeader } from '@components/molecules';
import { ModalForm } from '@components/organisms';

type CommandModalprops = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export const CommandModal = ({
  isOpen,
  onClose,
  title,
}: CommandModalprops) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
          <ModalHeader title={title} onClose={onClose} />
        <div style={styles.body}>
          
        </div>
      </div>
    </div>
  );
};


