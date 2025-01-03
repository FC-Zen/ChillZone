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

type BookingDataTableProps = {
  data: {
    id: number;
    day_reservation: string; // Date au format "YYYY-MM-DD"
    start_time: string; // Heure de début au format "HH:MM"
    end_time: string; // Heure de fin au format "HH:MM"
    location_name: string;
    status: string; // Par exemple "Confirmée"
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
    { field: 'day_reservation', headerName: t('tables.headers.reservation.day_reservation'), flex: 0.7 },
    { field: 'start_time', headerName:t('tables.headers.reservation.start_time'), flex: 0.8 },
    { field: 'end_time', headerName: t('tables.headers.reservation.end_time'), flex: 0.8 },
    { field: 'location_name', headerName: t('tables.headers.room.name'), flex: 1.2 },
    { field: 'status', headerName: t('tables.headers.reservation.status'), flex: 0.7 },
    { field: 'annule', headerName: t('tables.headers.reservation.isCanceled'), flex: 0.7,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          {params.row.status === "Annulée" ? (
            <Icon name="Exclamation" />
          ) : (
            <Icon name="Check" />
          )}
        </div>
      ),
    }
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
