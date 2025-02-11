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
import { CustomSwitch } from '@components/molecules';
import { UserAdmin } from '@pages/SuperUsersAdminPage/SuperUsersAdminPage';


type AdminUsersDataTableProps = {
  data: UserAdmin[];
  toggleBtn: (id: number, isActive: boolean) => void;
};


function CustomToolbar() {
  const { t } = useTranslation();
  
  return (
    <GridToolbarContainer className="custom-tool-bar">
      <GridToolbarQuickFilter
        className="custom-quick-filter"
        placeholder={t('fields.search')}
      />
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export const AdminUsersDataTable = ({
  data,
  toggleBtn
}: AdminUsersDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "first_name", headerName: t("tables.headers.user.fullName"), flex: 1 },
    { field: "last_name", headerName: t("tables.headers.user.last_name"), flex: 1 },
    { field: "type", headerName: t("tables.headers.product.type"), flex: 1 },
    { field: "role", headerName: t("tables.headers.user.type"), flex: 2 },
    { field: "establishment", headerName: t("tables.headers.user.establishment"), flex: 1.5 },
    {
      field: 'toggle',
      headerName: t('tables.headers.user.toggleAccount'),
      flex: 1.5,
      align: 'center',
      renderCell: (params: any) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CustomSwitch
              checked={params.row.is_active}
              onChange={() => {
                toggleBtn(params.row.id, params.row.is_active);
              }}
            />
          </div>
        );
      },
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
