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
import { colors } from '@theme';
import { Meal } from '@pages/OwnerMealsPage/OwnerMealsPage';

type MealsDataTableProps = {
  addMealBtn: () => void;
  handleClickMeal: (id: number) => void;
  handleClickQuantity: (id: number) => void;
  data: Meal[];
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
        {t('buttons.add.product')}
      </Button>
    </GridToolbarContainer>
  );
}

export const MealsDataTable = ({
  addMealBtn,
  handleClickMeal,
  handleClickQuantity,
  data,
}: MealsDataTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: t('tables.headers.product.name'), flex: 1 },
    { field: 'description', headerName: t('tables.headers.product.description'), flex: 4,  },
    { field: 'category', headerName: t('tables.headers.product.category'), flex: 1 },
    { field: 'price', headerName: t('tables.headers.product.price'), flex: 0.5 },
    { field: 'stock', headerName: t('tables.headers.product.quantity'), flex: 0.6 },
    {
      field: 'tags',
      headerName: t('tables.headers.product.tag'),
      flex: 1.5,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', gap : "5px" }}>
          {params.value.map((tag: { id: number; label: string }) => (
            <Chip 
              key={tag.id}
              label={tag.label}
            />
          ))}
        </div>
      ),
    },
    {
      field: 'editMeal',
      headerName: t('tables.headers.room.modify'),
      flex: 0.8,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="primary" onClick={() => handleClickMeal(params.row.id)}>
            <Icon name="Pencil" />
          </IconButton>
        </div>
      ),
    },
    {
      field: 'editQuantity',
      headerName: t('tables.headers.product.modifyQuantity'),
      flex: 1.3,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="primary" onClick={() => handleClickQuantity(params.row.id)}>
            <Icon name="ShoppingBag" color={colors.resolutionBlue} />
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
          toolbar: () => <CustomToolbar onActionClick={addMealBtn} />,
        }}
      />
    </div>
  );
};
