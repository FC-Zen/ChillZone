import {
  DataGrid,
  GridColDef,
  GridToolbarQuickFilter,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components/atoms';
import { IconButton } from '@mui/material';
import { colors } from '@theme';


type OrdersDataTableProps = {
  data: {
      id: number;
      name : string; 
      type : string; 
      location: string;
      email: string;
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

export const OwnersPendingDataTable = ({
  data,
  handleClickAccept,
  handleClickRefuse
}: OrdersDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: t("tables.headers.restaurant.name"), flex: 1 },
    { field: "restauration_type", headerName: t("tables.headers.restaurant.type"), flex: 0.7 },
    { field: "location", headerName: t("tables.headers.restaurant.location"), flex: 1.5 },
    { field: "email", headerName: t("tables.headers.restaurant.email"), flex: 1.2 },
    {
      field: "actions",
      headerName: t("tables.headers.restaurant.actionAffiliation"),
      flex: 0.8,
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
