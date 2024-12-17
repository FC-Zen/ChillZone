import React from 'react';
import { Box } from '@mui/material';
import { logoIUT } from '@assets/Images'; 

export const Logo: React.FC = () => {
    return (
    <Box className="d-flex align-items-center justify-content-center">
        <img src={logoIUT} alt="Logo" style={{ width: 120, height: 120 }} />
    </Box>
    );
};
