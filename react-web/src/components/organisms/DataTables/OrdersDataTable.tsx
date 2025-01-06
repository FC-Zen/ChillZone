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

export const OrdersDataTable = ({
  data,
}: OrdersDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "user_name", headerName: t("tables.headers.user_name"), flex: 1 },
    {
      field: "command_status",
      headerName: t("tables.headers.command_status"),
      flex: 0.8,
      renderCell: (params: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {params.value === "Annulée" ? (
            <Icon name="Exclamation" />
          ) : params.value === "Livrée" ? (
            <Icon name="Check" />
          ) : (
            <Icon name="Check" />
          )}
          {params.value}
        </div>
      ),
    },
    {
      field: "total_amount",
      headerName: t("tables.headers.total_amount"),
      flex: 0.8,
      valueFormatter: (params) => `${params} €`
    },
    {
      field: "pickup_time",
      headerName: t("tables.headers.pickup_time"),
      flex: 1
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
