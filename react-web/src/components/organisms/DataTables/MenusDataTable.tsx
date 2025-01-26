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
import { Button, Chip, IconButton } from '@mui/material';
import './style.css';
import { Icon } from '@components/atoms/Icons';
import { useTranslation } from 'react-i18next';

type MenuDataTableProps = {
  addMenuBtn: () => void;
  handleClickMenu: (id: number) => void;
  data: {
    menu_id: number;
    menu_name: string;
    menu_description: string;
    menu_price: number;
    menu_photo: string;
    categories: { category_id: number; category_label: string }[];
    meals: {
      meal_id: number;
      meal_name: string;
      meal_description: string;
      meal_price: number;
      meal_photo: string;
    }[];
  }[];
};

function CustomToolbar({ onActionClick }: { onActionClick: () => void }) {
  const { t } = useTranslation();
  
  return (
    <GridToolbarContainer className="custom-tool-bar">
      <GridToolbarQuickFilter className="custom-quick-filter" placeholder={t('fields.search')} />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Button variant="contained" className="customBtnDataTable" onClick={onActionClick}>
        <Icon name="AddIcon" />
        {t('buttons.add.menu')}
      </Button>
    </GridToolbarContainer>
  );
}

export const MenuDataTable = ({ addMenuBtn, handleClickMenu, data }: MenuDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'menu_id', headerName: 'ID', flex: 0.5 },
    { field: 'menu_name', headerName: t('tables.headers.menu.name'), flex: 1 },
    { field: 'menu_description', headerName: t('tables.headers.menu.description'), flex: 2 },
    { field: 'menu_price', headerName: t('tables.headers.menu.price'), flex: 0.5 },
    { field: 'menu_photo', headerName: t('tables.headers.menu.activeTypes'), flex: 2 },
    {
      field: 'categories',
      headerName: t('tables.headers.menu.activeCategories'),
      flex: 2,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap : "5px" }}>
          {params.value.map((category: { category_id: number; category_label: string }) => (
            <Chip key={category.category_id} label={category.category_label} />
          ))}
        </div>
      ),
    },
    {
      field: 'editMenu',
      headerName: t('tables.headers.room.modify'),
      flex: 0.5,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton color="primary" onClick={() => handleClickMenu(params.row.menu_id)}>
          <Icon name="Pencil" />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={data.map((menu) => ({ ...menu, id: menu.menu_id }))}
        columns={columns}
        slots={{
          toolbar: () => <CustomToolbar onActionClick={addMenuBtn} />,
        }}
      />
    </div>
  );
};
