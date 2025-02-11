import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./style.css";
import { useTranslation } from "react-i18next";
import { LineItem } from "@pages/OwnerOrdersPage/OwnerOrdersPage";

type DetailsOrdersDataTableProps = {
  lines: LineItem[]; // Lignes provenant de la commande
};

export const DetailsOrdersDataTable = ({ lines }: DetailsOrdersDataTableProps) => {
  const { t } = useTranslation();

  // Colonnes pour la DataGrid
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: t("tables.headers.command.meal_name"), // Nom du menu ou repas
      flex: 2,
      renderCell: (params) => {
        if (params.row.type != "subMenu") {
          return <strong>{params.row.name}</strong>;
        }
        return <span style={{ fontSize : '12px' }}>{params.row.name}</span>;
      },
    },
    {
      field: "quantity",
      headerName: t("tables.headers.command.quantity"),
      flex: 0.5,
    },
  ];

  // Transformation des données pour les rows
  const rows = lines.flatMap((line, index) => 
    Object.entries(line).flatMap(([key, value]) => {
      const menu = value.menu;
      const meal = value.meal;
      const type = menu ? "menu" : "meal"; 
      const baseRow = {
        id: `${index}-${key}`,
        quantity: value.quantity,
        type, 
      };

      if (menu) {
        const menuRow = {
          ...baseRow,
          name: menu.name,
        };

        const mealRows = menu.meals.map((mealItem: any, mealIndex: number) => ({
          id: `${index}-${key}-${mealIndex}`,
          name: mealItem.name,
          quantity: " ", 
          type: "subMenu",
        }));

        return [menuRow, ...mealRows];
      }

      if (meal) {
        return [{
          ...baseRow,
          name: meal.name,
        }];
      }

      return [{
        ...baseRow,
        name: t("tables.headers.command.unknown_item"),
      }];
    })
  );

  return (
    <div style={{ height: 'auto', width: "100%" }}>
      <DataGrid
        rows={rows} // Données formatées
        columns={columns} // Colonnes définies
        density="compact"
        pagination
        hideFooter
        hideFooterSelectedRowCount
        disableColumnFilter
        disableColumnSorting
      />
    </div>
  );
};
