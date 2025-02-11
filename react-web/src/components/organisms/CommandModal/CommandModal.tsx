import { useTranslation } from 'react-i18next';
import { DetailsOrdersDataTable } from '../DataTables';
import { styles } from './style';
import { CommandInfo, ModalHeader } from '@components/molecules';
import { ButtonIcon } from '@components/atoms';
import { Command } from '@pages/OwnerOrdersPage/OwnerOrdersPage';
import { memo } from 'react';

type CommandModalprops = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  changeState: (id: number, currentStatus: string) => void,
  selectedCommand: Command | false;
};

export const CommandModal = memo(({
  isOpen,
  onClose,
  title,
  changeState,
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
                <CommandInfo title={t('command.status')} value={selectedCommand.status} />
                <CommandInfo title={t('command.user')} value={selectedCommand.customer_name} />
                <CommandInfo title={t('command.creation_date')} value={selectedCommand.creation_date} />
                <CommandInfo title={t('command.total_amount')} value={selectedCommand.total_price} />
                <CommandInfo title={t('command.pickup_time')} value={selectedCommand.pickup_time} />
              </div>
              <DetailsOrdersDataTable lines={selectedCommand.lines} />
              <div className="flex flex-row justify-center" style={{paddingTop:'5px', marginTop : "5%"}}>
                {selectedCommand.status == t('status.in_progress') && <ButtonIcon title={t('buttons.commands.stateReady')} onclick={() => changeState(selectedCommand.id, selectedCommand.status)} icon={'Check'} />}
                {selectedCommand.status == t('status.ready') && <ButtonIcon title={t('buttons.commands.stateFinished')} onclick={() => changeState(selectedCommand.id, selectedCommand.status)} icon={'Tablet'} />}
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
});


