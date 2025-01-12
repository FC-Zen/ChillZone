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

type ConclictDataTableProps = {
  data: {
    id: number;
    day_reservation: string;
    user_name: string;
    location_name: string;
    comment: string;
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

export const ConflictDataTable = ({
  data,
}: ConclictDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'day_reservation', headerName: t('tables.headers.reservation.day_reservation'), flex: 0.7 },
    { field: 'full_name', headerName:t('tables.headers.conflict.user'), flex: 1.5 },
    { field: 'location_name', headerName: t('tables.headers.room.name'), flex: 1 },
    { field: 'comment', headerName: t('tables.headers.conflict.comment'), flex: 2, cellClassName: 'wrap-text' }
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
