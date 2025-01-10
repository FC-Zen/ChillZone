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

      <Button
        variant="contained"
        className="customBtnDataTable"
        onClick={onActionClick}
      >
        <Icon name="AddIcon" />
        {t('buttons.add.room')}
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
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: t('tables.headers.room.name'), flex: 2 },
    { field: 'description', headerName: t('tables.headers.room.description'), flex: 5 },
    { field: 'capacity', headerName: t('tables.headers.room.capacity'), flex: 1.5 },
    { field: 'floor', headerName: t('tables.headers.room.floor'), flex: 1.5 },
    { field: 'establishment', headerName: t('tables.headers.user.establishment'), flex: 2 },
    {
      field: 'toggle',
      headerName:  t('tables.headers.room.isRoomFree'),
      flex: 1.5,
      align: 'center',
      renderCell: (params: any) => {
        const isActive = params.row.status;
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CustomSwitch
              checked={isActive}
              onChange={() => {
                const newStatus = isActive ? false : true; // Modification du statut
                toggleBtn(params.row.id, newStatus);
              }}
            />
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName:  t('tables.headers.room.modify'),
      flex: 0.75,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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
