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

type BookingDataTableProps = {
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

function CustomToolbar() {  
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

    </GridToolbarContainer>
  );
}

export const BookingDataTable = ({
  data,
}: BookingDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: t('tables.headers.room.name'), flex: 2 },
    { field: 'description', headerName: t('tables.headers.room.description'), flex: 5 },
    { field: 'capacity', headerName: t('tables.headers.room.capacity'), flex: 1.5 },
    { field: 'floor', headerName: t('tables.headers.room.floor'), flex: 1.5 },
    { field: 'establishment', headerName: t('tables.headers.user.establishment'), flex: 2 }
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        slots={{
          toolbar: () => <CustomToolbar/>,
        }}
      />
    </div>
  );
};
