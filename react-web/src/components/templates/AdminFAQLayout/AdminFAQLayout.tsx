import { AdminSideBar, FaqDataTable, Header } from '@components/organisms';
import "./style.css" ;
import { User } from '@hooks';
import { Networks, Question } from '@pages/AdminFAQPage/AdminFAQPage';
import { ButtonIcon, HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { NetworkList } from '@components/organisms/NetworkList';

type AdminFAQLayoutProps = {
  user : User | null;
  part: string;
  data : Question[];
  dataNetworks : Networks[];
  availableOptions: {
    id: number;
    label: string;
  }[];
  addQuestionBtn: () => void;
  handleClickEdit: (id: number) => void;
  handleClickDelete: (id: number) => void;
  addNetworkBtn: () => void;
  handleUpdateNetwork : (id: number, link_network: string) => void;
  handleDeleteNetwork: (id: number) => void;
};

export const AdminFAQLayout = ({
  user,
  part,
  data,
  dataNetworks,
  availableOptions,
  addQuestionBtn,
  handleClickEdit,
  handleClickDelete,
  addNetworkBtn,
  handleUpdateNetwork,
  handleDeleteNetwork
}: AdminFAQLayoutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1">
        <Header
          user={user}
          part={part}   
          />
        
        <main className="mainContainerFAQ">
          <div className="table1-layout">
          <FaqDataTable
            data={data}
            addQuestionBtn={addQuestionBtn}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
          />
          </div>
          <div className="network-layout">
            <div className="network-headers">
            <HeaderIcon title={t('headers.network')} icon={'Browser'}/>
            {availableOptions.length > 0 && (
              <ButtonIcon 
                title={t('buttons.add.generic')} 
                icon={'AddCircle'} 
                onclick={addNetworkBtn} 
              />
            )}
            </div>
            <NetworkList 
              list={dataNetworks} 
              handleEdit={handleUpdateNetwork} 
              handleDelete={handleDeleteNetwork} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};
