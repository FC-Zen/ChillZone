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
        Ajouter une salle
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
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'first_name', headerName: 'Prénom', flex: 2 },
    { field: 'last_name', headerName: 'Nom', flex: 2 },
    { field: 'role', headerName: 'Rôle', flex: 1.5 },
    { field: 'establishment', headerName: 'Établissement', flex: 3 },
    {
      field: 'reservation_count',
      headerName: 'Nombre de réservations faites',
      flex: 2,
    },
    {
      field: 'toggle',
      headerName: 'Bloquer les réservations',
      flex: 2,
      align: 'center',
      renderCell: (params: any) => {
        const isActive = params.row.status === 'Blocked';
        return (
          <CustomSwitch
            checked={isActive}
            onChange={() => {
              const newStatus = isActive ? 'Verified' : 'Blocked';
              console.log(isActive);
              console.log(newStatus);
              toggleBtn(params.row.id, newStatus);
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Supprimer le compte',
      flex: 2,
      sortable: false,
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center">
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
