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
    id: number;
    name: string;
    description: string;
    photo: string;
    price: number;
    type_category: {
      main: { id: number; label: string }[];
      drink: { id: number; label: string }[];
      side: { id: number; label: string }[];
      other: { id: number; label: string }[];
      starter: { id: number; label: string }[];
      dessert: { id: number; label: string }[];
    };
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
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: t('tables.headers.menu.name'), flex: 1 },
    { field: 'description', headerName: t('tables.headers.menu.description'), flex: 2 },
    { field: 'price', headerName: t('tables.headers.menu.price'), flex: 0.5 },
    {
      field: 'actives_types',
      headerName: t('tables.headers.menu.activeTypes'),
      flex: 2,
      renderCell: (params: any) => {
        // Récupérer les catégories actives (dont la liste n'est pas vide)
        const activeTypes = Object.entries(params.row.type_category || {})
          .filter(([_, items]) => Array.isArray(items) && items.length > 0)
          .map(([key, items]) => ({
            category_id: key, 
            category_label: (key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()), // Utiliser le nom de la catégorie comme label
          }));
    
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '5px' }}>
            {activeTypes.map((type) => (
              <Chip key={type.category_id} label={t(`categories.${type.category_label}`)} />
            ))}
          </div>
        );
      },
    },
    /*     {
      field: 'type_category',
      headerName: t('tables.headers.menu.activeCategories'),
      flex: 2,
      renderCell: (params: any) => {
        const categoryLabels = Object.entries(params.row.type_category || {})
          .filter(([_, items]) => Array.isArray(items) && items.length > 0)  // Filtrer les catégories non vides
          .flatMap(([_, items]) => items.map((item: { label: string }) => item.label)); // Extraire les labels des items
    
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '5px' }}>
            {categoryLabels.map((label, index) => (
              <Chip key={index} label={label} />
            ))}
          </div>
        );
      },
    }, */
    {
      field: 'editMenu',
      headerName: t('tables.headers.room.modify'),
      flex: 0.4,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton color="primary" onClick={() => handleClickMenu(params.row.id)}>
          <Icon name="Pencil" />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        slots={{
          toolbar: () => <CustomToolbar onActionClick={addMenuBtn} />,
        }}
      />
    </div>
  );
};
