import { Header, AdminSideBar, ModalForm, FloorSelection } from '@components/organisms';
import { Map } from '@components/molecules';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import './style.css';
import { Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeaderIcon, Icon } from '@components/atoms';
import { User } from '@hooks';
import { Floor } from '@pages/AdminEstablishmentPage/AdminEstablishmentPage';
import { colors } from '@theme';

type AdminEstablishmentLayoutProps = {
  user : User | null;
  part: string;
  form: InputField[];
  onSubmit: (formData: FormData) => void;
  mapName: string;
  onMapClick: (x: number, y: number) => void; 
  floors: Floor[];
  selectedFloor: Floor | null;
  handleFloorClick: (id : number) => void;
  handleAddFloorClick: () => void;
  handleChangeFloorClick: () => void;
  handleDeleteFloorClick: () => void;
};

export const AdminEstablishmentLayout: React.FC<AdminEstablishmentLayoutProps> = ({
  user,
  part,
  form,
  onSubmit,
  mapName,
  onMapClick,
  floors,
  selectedFloor,
  handleFloorClick,
  handleAddFloorClick,
  handleChangeFloorClick,
  handleDeleteFloorClick
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
                      onClick={handleChangeFloorClick} 
                      style={{
                          width: '50%',
                          padding: '7px 12px',
                          backgroundColor: colors.aquaDeep,
                          cursor: 'pointer',
                          gap: "5px"
                      }}
                  >
                      <Icon name="Download" />
                      {t('buttons.actions.changeMap')}
              </Button>
              <Button
                      variant="contained"
                      className="customAddBtnEsta"
                      onClick={handleDeleteFloorClick} 
                      style={{
                          width: '50%',
                          padding: '7px 12px',
                          backgroundColor: colors.red,
                          cursor: 'pointer',
                          gap: "5px"
                      }}
                  >
                      <Icon name="Trash" />
                      {t('buttons.actions.deleteMap')}
              </Button>
            </div>
            <Map 
              onClick={(onMapClick)} 
              selectedFloor={selectedFloor} 
            />
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
              onSubmit={onSubmit} 
              listInputs={form} 
            />
          </div>

        </main>
      </div>
    </div>
  );
};
