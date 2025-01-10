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
import { IconButton } from '@mui/material';
import { colors } from '@theme';

type CommandLine = {
  line_id: number;
  quantity: number;
  meal_name: string;
  menu_name: string;
}

type OrdersDataTableProps = {
  data: {
    id: number;
    user_name: string;
    command_status: "Livrée" | "En cours" | "Annulée";
    creation_date: string;
    total_amount: number;
    pickup_time: string;
    final_pickup_time: string;
    lines: CommandLine[];
  }[];
  handleClick : (id: number) => void;
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

export const OrdersDataTable = ({
  data,
  handleClick
}: OrdersDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "user_name", headerName: t("tables.headers.command.user"), flex: 1 },
    { field: "creation_date", headerName: t("tables.headers.reservation.day_reservation"), flex: 1, 
      valueFormatter: (params) => {
        const date = new Date(params);
        return date.toLocaleDateString("fr-FR"); 
      },
    },
    {
      field: "command_status",
      headerName: t("tables.headers.reservation.status"),
      flex: 0.8,
      renderCell: (params: any) => {
        const getColor = (status: string) => {
          switch (status) {
            case t('status.in_progress'): return "#bf6a02";
            case t('status.ready'): return colors.darkCyan;
            case t('status.Completed'): return colors.resolutionBlue;
            default: return "black";
          }
        };
    
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: getColor(params.value), fontWeight: "bold" }}>
            {params.value}
          </div>
        );
      }
    },
    {
      field: "total_amount",
      headerName: t("tables.headers.command.total_amount"),
      flex: 0.8,
      valueFormatter: (params) => `${params} €`
    },
    {
      field: "pickup_time",
      headerName: t("tables.headers.command.collectionStartTime"),
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params);
        return `${date.getHours()} h ${date.getMinutes().toString().padStart(2, "0")}`;
      },
    },
    {
      field: 'actions',
      headerName: t('tables.headers.command.actions.viewcommand'),
      flex: 0.6,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="primary" onClick={() => handleClick(params.row.id)}>
            <Icon name="Eye" />
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
          toolbar: () => <CustomToolbar/>,
        }}
      />
    </div>
  );
};
