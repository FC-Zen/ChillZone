import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { styles } from './style';
import { ModalHeader } from '@components/molecules';
import { ModalForm } from '@components/organisms';

type Modalprops = {
  isOpen: boolean;
  onClose: () => void;
  handleForm: (formData: FormData) => void;
  title: string;
  listInputs: InputField[];
};

export const Modal = ({
  isOpen,
  onClose,
  handleForm,
  title,
  listInputs,
}: Modalprops) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" >
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/1 sm:w-1/2 md:w-1/2 lg:w-1/3">
          <ModalHeader title={title} onClose={onClose} />
        <div style={styles.body} >
          <ModalForm  onSubmit={handleForm} listInputs={listInputs}  />
        </div>
      </div>
    </div>
  );
};


