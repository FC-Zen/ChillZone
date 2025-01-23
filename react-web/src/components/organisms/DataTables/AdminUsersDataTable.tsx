import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components/atoms';
import { IconButton } from '@mui/material';
import { colors } from '@theme';


type AdminUsersDataTableProps = {
  data: {
    id : number;
    first_name: string;
    last_name: string;
    type: string;
    role: string;
    establishment: string;
    is_verified : boolean;
  }[];
  handleClickAccept : (id: number) => void;
  handleClickRefuse : (id: number) => void;
  handleClickDelete: (id: number) => void;
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
export const AdminUsersDataTable = ({
  data,
  handleClickAccept,
  handleClickRefuse,
  handleClickDelete

}: AdminUsersDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "first_name", headerName: t("tables.headers.user.fullName"), flex: 1 },
    { field: "last_name", headerName: t("tables.headers.user.last_name"), flex: 1 },
    { field: "type", headerName: t("tables.headers.product.type"), flex: 1 },
    { field: "role", headerName: t("tables.headers.user.type"), flex: 1 },
    { field: "establishment", headerName: t("tables.headers.user.establishment"), flex: 1.5 },
    {
      field: "actions",
      headerName: t("tables.headers.owner.deleteRestaurantAccount"),
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '4px' }}>
          {!params.row.is_verified ? (
            <>
              <IconButton onClick={() => handleClickAccept(params.row.id)}>
                <Icon name="AddCircle" color={colors.aquaDeep} />
              </IconButton>
              <IconButton onClick={() => handleClickRefuse(params.row.id)}>
                <Icon name="CrossCircle" color={colors.red} />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={() => handleClickDelete(params.row.id)}>
              <Icon name="DeleteAccount" color={colors.red} />
            </IconButton>
          )}
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
