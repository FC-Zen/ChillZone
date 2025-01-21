import { Header, AdminSideBar, ModalForm, FloorSelection } from '@components/organisms';
import { Map } from '@components/molecules';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import './style.css';
import { Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeaderIcon, Icon } from '@components/atoms';
import { User } from '@hooks';

type Floor = {
  floor_id: number;
  floor_number: number;
  floor_name: string;
  floor_plan: string;
};

type AdminEstablishmentLayoutProps = {
  user : User | null;
  part: string;
  form: InputField[];
  addAccount: (formData: FormData) => void;
  mapName: string;
  mapImageSrc: string;
  onMapClick: (x: number, y: number) => void; 
  floors: {
    floor_id: number;
    floor_number: number;
    floor_name: string;
    floor_plan: string;
  }[];
  selectedFloor: Floor | null;
  handleFloorClick: (id : number) => void;
  handleAddFloorClick: () => void;
};

export const AdminEstablishmentLayout: React.FC<AdminEstablishmentLayoutProps> = ({
  user,
  part,
  form,
  addAccount,
  mapName,
  mapImageSrc,
  onMapClick,
  floors,
  selectedFloor,
  handleFloorClick,
  handleAddFloorClick
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          user={user}
          part={part}      
        />

        <main className="p-6 flex main-map">

          <div className="modale-info-floors">
            <FloorSelection 
              selectedFloor={selectedFloor} 
              floors={floors} 
              handleFloorClick={handleFloorClick} 
              handleAddFloorClick={handleAddFloorClick} 
            />
          </div>

          {/* Ajout de la carte interactive */}
          <div className="map-container">
            <div className="map-header">
              <HeaderIcon title={mapName} icon={'Location'} />
              <Button
                      variant="contained"
                      className="customAddBtnEsta"
                      onClick={() => (console.log("charger le fichier en intégration"))} 
                      style={{
                          width: '22%',
                          padding: '7px 12px',
                          backgroundColor: '#005745',
                          cursor: 'pointer',
                          gap: "5px"
                      }}
                  >
                      <Icon name="Download" />
                      {t('buttons.actions.changeMap')}
              </Button>
            </div>
            <Map imageSrc={mapImageSrc} onClick={(onMapClick)} />
          </div>



          <div className="modale-info-establisment">
            <Typography
              fontSize="22px"
              fontWeight="600"
              textAlign="center"
              width={"100%"}
              padding={"1% 2%"}
              marginBottom={"5%"}
            >
              {t('modals.info.establishment')}
            </Typography>

            <ModalForm 
              onSubmit={addAccount} 
              listInputs={form} 
            />
          </div>

        </main>
      </div>
    </div>
  );
};
