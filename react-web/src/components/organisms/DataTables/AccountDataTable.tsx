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
import { Button, IconButton } from '@mui/material';
import './style.css';
import { Icon } from '@components/atoms/Icons';
import { CustomSwitch } from '@components/molecules';
import { useTranslation } from 'react-i18next';


type AccountDataTableProps = {
  addAccountBtn: () => void;
  deleteBtn: (id: number) => void;
  toggleBtn: (id: number, isActive: string) => void;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    establishment: string;
    reservation_count: number;
    status: string;
  }[];
};

function CustomToolbar({ onActionClick }: { onActionClick: () => void }) {
  const { t } = useTranslation();
  
  return (
    <GridToolbarContainer className="custom-tool-bar">
      <GridToolbarQuickFilter
        className="custom-quick-filter"
        placeholder="Chercher dans la table"
      />

      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />

      <Button
        variant="contained"
        className="customBtnDataTable"
        onClick={onActionClick}
      >
        <Icon name="AddIcon" />
        {t('buttons.add.user')}
      </Button>
    </GridToolbarContainer>
  );
}

export const AccountDataTable = ({
  addAccountBtn,
  deleteBtn,
  toggleBtn,
  data,
}: AccountDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'first_name', headerName: t('tables.headers.user.fullName'), flex: 2 },
    { field: 'last_name', headerName: t('tables.headers.user.last_name'), flex: 2 },
    { field: 'role', headerName: t('tables.headers.user.type'), flex: 1.5 },
    { field: 'establishment', headerName: t('tables.headers.user.establishment'), flex: 3 },
    {
      field: 'reservation_count',
      headerName: t('tables.headers.user.reservationCount'),
      flex: 2,
    },
    {
      field: 'toggle',
      headerName: t('tables.headers.user.blockReservations'),
      flex: 1.5,
      align: 'center',
      renderCell: (params: any) => {
        const isActive = params.row.status === 'Blocked';
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CustomSwitch
              checked={isActive}
              onChange={() => {
                const newStatus = isActive ? 'Verified' : 'Blocked';
                console.log(isActive);
                console.log(newStatus);
                toggleBtn(params.row.id, newStatus);
              }}
            />
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: t('tables.headers.user.deleteAccount'),
      flex: 1.5,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="primary" onClick={() => deleteBtn(params.row.id)}>
            <Icon name="DeleteAccount" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        slots={{
          toolbar: () => <CustomToolbar onActionClick={addAccountBtn} />,
        }}
      />
    </div>
  );
};
