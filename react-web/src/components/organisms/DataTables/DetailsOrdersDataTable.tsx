import {
    DataGrid,
    GridColDef,
  } from '@mui/x-data-grid';
  import './style.css';
  import { useTranslation } from 'react-i18next';
  
export type CommandLine = {
    quantity: number;
    meal_name: string;
    [key: string]: any;
};

type DetailsOrdersDataTableProps = {
    lines: CommandLine[];  // Utilise directement lines comme tableau de CommandLine
};
  
export const DetailsOrdersDataTable = ({ lines }: DetailsOrdersDataTableProps) => {
    const { t } = useTranslation();
  
    const columns: GridColDef[] = [
      {
        field: "meal_name",
        headerName: t("tables.headers.command.meal_name"),  // Nom de la commande
        flex: 1,
      },
      {
        field: "quantity",
        headerName: t("tables.headers.command.quantity"),
        flex: 0.5,
      },
    ];

    const rows = lines.map((line, index) => ({
        id: index, // ou utiliser un autre identifiant unique si disponible
        ...line,
    }));
  
    return (
      <div style={{ height: 240, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination 
          hideFooterSelectedRowCount
        />
      </div>
    );
  };