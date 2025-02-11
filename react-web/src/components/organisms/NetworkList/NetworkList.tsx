import { CustomCard } from '@components/molecules';
import { Card } from '@mui/material';
import { Networks } from '@pages/AdminFAQPage/AdminFAQPage';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type NetworkListProps = {
    list: Networks[];
    handleEdit: (id: number, link_network: string) => void;
    handleDelete: (id: number) => void;
};

export const NetworkList: React.FC<NetworkListProps> = ({
    list,
    handleEdit,
    handleDelete,
}) => {
    const { t } = useTranslation();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: "1rem" }}>
            {list.length === 0 ? (
                <Card sx={{ alignItems: "center", padding: 2, gap: 2, borderRadius: 2, textAlign: "center"}}>{t('info.nolinks')}</Card>
            ) : (
                list.map((network) => (
                    <CustomCard 
                        key={network.id} 
                        item={network} 
                        handleEdit={handleEdit} 
                        handleDelete={handleDelete} 
                    />
                ))
            )}
        </div>
    );
};
