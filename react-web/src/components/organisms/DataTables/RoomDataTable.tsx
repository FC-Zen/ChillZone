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

type RoomDataTableProps = {
  addRoomBtn: () => void;
  editRoomBtn: (id: number) => void;
  toggleBtn: (id: number, status: boolean) => void;
  data: {
    id: number;
    name: string;
    description: string;
    capacity: number;
    floor: string;
    establishment: string;
    status: boolean;
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

export const RoomDataTable = ({
  addRoomBtn,
  editRoomBtn,
  toggleBtn,
  data,
}: RoomDataTableProps) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Nom de la salle', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 5 },
    { field: 'capacity', headerName: 'Capacité', flex: 1 },
    { field: 'floor', headerName: 'Étage', flex: 1.5 },
    { field: 'establishment', headerName: 'Établissement', flex: 2 },
    {
      field: 'toggle',
      headerName: 'Bloquer les réservations',
      flex: 2,
      align: 'center',
      renderCell: (params: any) => {
        const isActive = params.row.status;
        return (
          <CustomSwitch
            checked={isActive}
            onChange={() => {
              const newStatus = isActive ? false : true; // Modification du statut
              toggleBtn(params.row.id, newStatus);
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Supprimer la salle',
      flex: 1.5,
      sortable: false,
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center">
          <IconButton color="primary" onClick={() => editRoomBtn(params.row.id)}>
            <Icon name="Pencil" />
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
          toolbar: () => <CustomToolbar onActionClick={addRoomBtn} />,
        }}
      />
    </div>
  );
};
