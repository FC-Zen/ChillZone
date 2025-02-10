import { HeaderIcon, Icon } from '@components/atoms';
import { Button } from '@mui/material';
import { Floor } from '@pages/AdminEstablishmentPage/AdminEstablishmentPage';
import { colors } from '@theme';
import React from 'react';
import { useTranslation } from 'react-i18next';

type FloorSelectionProps = {
    selectedFloor: Floor | null;
    floors: Floor[];
    handleFloorClick: (id: number) => void;
    handleAddFloorClick: () => void;  // Modifier handleAddFloor pour ne pas nécessiter d'argument
};

export const FloorSelection: React.FC<FloorSelectionProps> = ({
    selectedFloor,
    floors,
    handleFloorClick,
    handleAddFloorClick,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <HeaderIcon title={t('modals.info.establishment')} icon={'AddIcon'} fontsize='16px'/>
            {floors.map((floor) => (
                <div key={floor.id} style={{ margin: '10px', width: '80%' }}>
                    <Button
                        variant = {floor.id === selectedFloor?.id ? 'outlined' : 'contained'}
                        onClick={() => handleFloorClick(floor.id)} // Sélectionner l'étage
                        style={{
                            width: '100%',
                            backgroundColor: floor.id === selectedFloor?.id ? colors.white : colors.resolutionBlue,
                            color: floor.id === selectedFloor?.id ? colors.resolutionBlue : colors.white,
                            borderColor : floor.id === selectedFloor?.id ? colors.resolutionBlue : 'none',
                            border : floor.id === selectedFloor?.id ? 'solid 3px' : 'none',
                            padding: '7px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {floor.name}
                    </Button>
                </div>
            ))}

            {/* Bouton pour ajouter un étage */}
            <div style={{ margin: '10px', width: '80%' }}>
                <Button
                    variant="contained"
                    className="customAddBtnEsta"
                    onClick={() => handleAddFloorClick()}
                    style={{
                        width: '100%',
                        padding: '7px 12px',
                        backgroundColor: '#005745',
                        cursor: 'pointer',
                        gap: "5px"
                    }}
                >
                    <Icon name="AddIcon" />
                    {t('buttons.add.floor')}
                </Button>
            </div>
        </>
    );
};
