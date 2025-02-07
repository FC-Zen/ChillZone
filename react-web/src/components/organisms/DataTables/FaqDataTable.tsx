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
import { Question } from '@pages/AdminFAQPage/AdminFAQPage';
import { Button, IconButton, TextField } from '@mui/material';

type FAQTableProps = {
  data: Question[];
  addQuestionBtn: () => void;
  handleClickEdit: (id: number) => void;
  handleClickDelete: (id: number) => void;
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
        {t('buttons.add.faq')}
      </Button>
    </GridToolbarContainer>
  );
}

export const FaqDataTable = ({
  data,addQuestionBtn,handleClickEdit
}: FAQTableProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'category', headerName: t('tables.headers.faq.category'), flex: 1 },
    { field: 'question', headerName: t('tables.headers.faq.question'), flex: 1.5,
      renderCell: (params: any) => (
        <TextField
          value={params.row.question}
          variant="standard"
          size="small"
          fullWidth
          multiline
          disabled
          InputProps={{
            style: { whiteSpace: 'pre-wrap' },
          }}
        />
      ),
    },
    { field: 'answer', headerName: t('tables.headers.faq.answer'), flex: 1.5,
      renderCell: (params: any) => (
        <TextField
          value={params.row.answer}
          variant="standard"
          size="small"
          fullWidth
          multiline
          disabled
          InputProps={{
            style: { whiteSpace: 'pre-wrap' },
          }}
        />
      ),
    },
    {
      field: 'editMenu',
      headerName: t('tables.headers.room.modify'),
      flex: 0.4,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IconButton color="primary" onClick={() => handleClickEdit(params.row.id)}>
            <Icon name="Pencil" />
          </IconButton>
        </div>
      ),
    },
    {
      field: 'deleteMenu',
      headerName: t('buttons.actions.delete'),
      flex: 0.4,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <IconButton color="primary" onClick={() => handleClickEdit(params.row.id)}>
          <Icon name="Exclamation" />
        </IconButton></div>
      ),
    },
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowHeight={() => 'auto'}
        slots={{
          toolbar: () => <CustomToolbar onActionClick={addQuestionBtn} />,
        }}
      />
    </div>
  );
};
