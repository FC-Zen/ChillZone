import { useTranslation } from 'react-i18next';
import { DetailsOrdersDataTable } from '../DataTables';
import { CommandLine } from '../DataTables/DetailsOrdersDataTable';
import { styles } from './style';
import { CommandInfo, ModalHeader } from '@components/molecules';

type CommandModalprops = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  selectedCommand: {
    command_status: string,
    user_name: string,
    creation_date: string,
    total_amount: number,
    pickup_time: string,
    lines: CommandLine[],
    [key: string]: any;
  } | false;
};

export const CommandModal = ({
  isOpen,
  onClose,
  title,
  selectedCommand,
}: CommandModalprops) => {
  if (!isOpen) return null;
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
          <ModalHeader title={title} onClose={onClose} />
        <div style={styles.body}>
          {selectedCommand && 
            <>
              <div className="grid grid-cols-1 gap-1 mb-4">
                <CommandInfo title={t('command.status')} value={selectedCommand.command_status} />
                <CommandInfo title={t('command.user')} value={selectedCommand.user_name} />
                <CommandInfo title={t('command.creation_date')} value={selectedCommand.creation_date} />
                <CommandInfo title={t('command.total_amount')} value={selectedCommand.total_amount} />
                <CommandInfo title={t('command.pickup_time')} value={selectedCommand.pickup_time} />
              </div>
              <DetailsOrdersDataTable lines={selectedCommand.lines} />
            </>
          }
        </div>
      </div>
    </div>
  );
};


