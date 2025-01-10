import { Icon } from '@components/atoms';
import { Button } from '@mui/material';
import { colors } from '@theme';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Floor = {
    floor_id: number;
    floor_number: number;
    floor_name: string;
    floor_plan: string;
};

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
            {floors.map((floor) => (
                <div key={floor.floor_id} style={{ margin: '10px', width: '80%' }}>
                    <Button
                        variant = {floor.floor_id === selectedFloor?.floor_id ? 'outlined' : 'contained'}
                        onClick={() => handleFloorClick(floor.floor_id)} // Sélectionner l'étage
                        style={{
                            width: '100%',
                            backgroundColor: floor.floor_id === selectedFloor?.floor_id ? colors.white : colors.resolutionBlue,
                            color: floor.floor_id === selectedFloor?.floor_id ? colors.resolutionBlue : colors.white,
                            borderColor : floor.floor_id === selectedFloor?.floor_id ? colors.resolutionBlue : 'none',
                            border : floor.floor_id === selectedFloor?.floor_id ? 'solid 3px' : 'none',
                            padding: '7px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {floor.floor_name}
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
