import { AdminSideBar, FaqDataTable, Header } from '@components/organisms';
import "./style.css" ;
import { HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { User } from '@hooks';
import { Question } from '@pages/AdminFAQPage/AdminFAQPage';

type AdminBookingLayoutProps = {
  user : User | null;
  part: string;
  data : Question[];
  addQuestionBtn: () => void;
  handleClickEdit: (id: number) => void;
  handleClickDelete: (id: number) => void;
};

export const AdminFAQLayout = ({
  user,
  part,
  data,
  addQuestionBtn,
  handleClickEdit,
  handleClickDelete
}: AdminBookingLayoutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1">
        <Header
          user={user}
          part={part}   
          />
        
        <main className="mainContainerBooking">
          <div className="table1-layout">
          <FaqDataTable
            data={data}
            addQuestionBtn={addQuestionBtn}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
          />
          </div>
          <div className="network-layout">
          </div>
        </main>
      </div>
    </div>
  );
};
