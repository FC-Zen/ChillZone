import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components/atoms';
import { IconButton } from '@mui/material';
import { colors } from '@theme';


type OwnersRegisterDataTableProps = {
  data: {
      id : number;
      first_name: string;
      last_name: string;
      restauration_place_name: string;
      restauration_place_address: string;
      restauration_place_mail: string;
  }[];
  handleClickAccept : (id: number) => void;
  handleClickRefuse : (id: number) => void;
};


function CustomToolbar() {  
  const { t } = useTranslation();
  
  return (
    <GridToolbarContainer className="custom-tool-bar">
    </GridToolbarContainer>
  );
}

export const OwnersRegisterDataTable = ({
  data,
  handleClickAccept,
  handleClickRefuse
}: OwnersRegisterDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "first_name", headerName: t("fields.common.first_name"), flex: 1 },
    { field: "last_name", headerName: t("fields.common.last_name"), flex: 1 },
    { field: "restauration_place_name", headerName: t("tables.headers.restaurant.name"), flex: 1.5 },
    { field: "restauration_place_address", headerName: t("tables.headers.restaurant.location"), flex: 1.5 },
    { field: "restauration_place_mail", headerName: t("tables.headers.restaurant.email"), flex: 1.2 },
    {
      field: "actions",
      headerName: t("tables.headers.owner.acceptAccount"),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '4px' }}>
          <IconButton onClick={() => handleClickAccept(params.row.id)}>
            <Icon name="AddCircle" color={colors.aquaDeep}/>
          </IconButton>
          <IconButton onClick={() => handleClickRefuse(params.row.id)}>
            <Icon name="CrossCircle" color={colors.red}/>
          </IconButton>
        </div>
      ),
    },
  ];


  return (
    <div style={{ height: 'auto', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        density="compact"
        slots={{
          toolbar: () => <CustomToolbar/>,
        }}
      />
    </div>
  );
};
