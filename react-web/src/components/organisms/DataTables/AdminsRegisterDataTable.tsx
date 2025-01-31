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
import { AdminsRequest } from '@pages/SuperAdminPage/SuperAdminPage';


type AdminsRegisterDataTableProps = {
  data: AdminsRequest[];
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

export const AdminsRegisterDataTable = ({
  data,
  handleClickAccept,
  handleClickRefuse
}: AdminsRegisterDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "first_name", headerName: t("fields.common.first_name"), flex: 1 },
    { field: "last_name", headerName: t("fields.common.last_name"), flex: 1 },
    { field: "email", headerName: t("fields.common.mail"), flex: 1.5 },
    { field: "role", headerName: t('tables.headers.user.type'), flex: 1.5 },
    { field: "establishment", headerName: t('tables.headers.user.establishment'), flex: 1.2 },
    { field: "phone", headerName: t("fields.common.admin_phone"), flex: 1.2 },
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
