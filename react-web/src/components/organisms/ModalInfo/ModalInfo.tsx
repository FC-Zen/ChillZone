import { styles } from './style';
import { ModalHeader } from '@components/molecules';
import { Typography } from '@mui/material';
import { Button } from '@components/atoms';
import { useTranslation } from 'react-i18next';

type ModalInfoprops = {
  isOpen: boolean;
  onClose: () => void;
  handleForm: () => void;
  title: string;
  info: string;
};

export const ModalInfo = ({
  isOpen,
  onClose,
  handleForm,
  title,
  info
}: ModalInfoprops) => {
  if (!isOpen) return null;
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50" >
        <div className="bg-white rounded-lg shadow-lg p-6 w-1/1 sm:w-1/2 md:w-1/2 lg:w-1/3">
          <ModalHeader title={title} onClose={onClose} />
        <div style={styles.body} >
          <Typography>{info}</Typography>
          <Button
            title={t('buttons.actions.continue')}
            type="button"
            onclick={handleForm}
          />
        </div>
      </div>
    </div>
  );
};


