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
import { IconButton } from '@mui/material';
import './style.css';
import { Icon } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';
import { colors } from '@theme';

type OwnersAcceptedDataTableProps = {
  handleClickDelete : (id: number) => void;
  data : {
    id: number;
    name: string;
    type: string;
    location: string;
    email: string;
    status: boolean;
  }[];
};

function CustomToolbar() {  
  const { t } = useTranslation();
  
  return (
    <GridToolbarContainer className="custom-tool-bar">
      <GridToolbarQuickFilter
        className="custom-quick-filter"
        placeholder={t('fields.search')}
      />

      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />

    </GridToolbarContainer>
  );
}

export const OwnersAcceptedDataTable = ({
  handleClickDelete,
  data,
}: OwnersAcceptedDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: t("tables.headers.restaurant.name"), flex: 1 },
    { field: "restauration_type", headerName: t("tables.headers.restaurant.type"), flex: 0.7 },
    { field: "location", headerName: t("tables.headers.restaurant.location"), flex: 1.5 },
    { field: "email", headerName: t("tables.headers.restaurant.email"), flex: 1.2 },
    { 
      field: "status", 
      headerName: t("tables.headers.restaurant.isCurrentlyOpen"), 
      flex: 0.6,
      renderCell: (params) => (
        <span style={{ fontWeight: 'bold' }}>
          {params.value ? t("status.open") : t("status.close")}
        </span>
      )
    },
    {
      field: "actions",
      headerName: t("tables.headers.restaurant.unlinkRestaurant"),
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="secondary" onClick={() => handleClickDelete(params.row.id)}>
            <Icon name="Trash" color={colors.red} />
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
