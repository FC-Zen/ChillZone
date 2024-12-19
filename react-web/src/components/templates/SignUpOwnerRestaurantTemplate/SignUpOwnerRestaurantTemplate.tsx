import React from 'react';
import { VectorHeader, VectorBottom, Button, Input } from '@components';
import { Logo, Header } from '@components/atoms';
import { Box, Container } from '@mui/material';

type SignUpOwnerRestaurantTemplateProps = {
  title: string; 
  buttonTitle: string;
  buttonBackTitle : string;
  onSubmitButton: () => void;
  onBackButton: () => void;
  handleInputChange: (name: string, value: string) => void;
  fields: any;
  formData : any;
};

export const SignUpOwnerRestaurantTemplate: React.FC<SignUpOwnerRestaurantTemplateProps> = ({
  title,
  buttonTitle,
  buttonBackTitle,
  onSubmitButton,
  onBackButton,
  handleInputChange,
  fields,
  formData
}) => {
  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  > 
    <Box 
      sx={{
        width: '100%',
        transform: 'translateY(-220px)',
        zIndex : '-1'
      }}
    >
      <VectorHeader />
    </Box>

    <Container
      sx={{
        height : "auto",
        width: '42%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 16px',
        gap: '10px',
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 600px)': {
          width: '80%!important',
        },
        '@media (max-width: 1404px)': {
          width: '50%',
        },
      }}
    >
      <Logo />
      <Header title={title} />

      <Input
        icon="User"
        name={fields.restauration_place_name.name}
        label={fields.restauration_place_name.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_name}
      />

      <Input
        icon="User"
        name={fields.restauration_place_description.name}
        label={fields.restauration_place_description.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_description}
      />

      <Box sx={{ display: 'flex', gap: 2, width : '100%' }}>
        <Input
          icon="User"
          name={fields.restauration_place_opening_time.name}
          label={fields.restauration_place_opening_time.label}
          required={true}
          onInputChange={handleInputChange}
          value={formData.restauration_place_opening_time}
        />

        <Input
          icon="User"
          name={fields.restauration_place_closing_time.name}
          label={fields.restauration_place_closing_time.label}
          required={true}
          onInputChange={handleInputChange}
          value={formData.restauration_place_closing_time}
        />
      </Box>

      <Input
        icon="User"
        name={fields.restauration_place_location.name}
        label={fields.restauration_place_location.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_location}
      />

      <Button 
        title={"IMAGE"} 
        onclick={function (): void | false {
          throw new Error('Function not implemented.');
        } }
        type='file'
        variant='secondary'
      />

      <Input
        icon="User"
        name={fields.restauration_place_photo_type.name}
        label={fields.restauration_place_photo_type.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_photo_type}
      />

      <Input
        icon="User"
        name={fields.restauration_place_photo_phone.name}
        label={fields.restauration_place_photo_phone.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_photo_phone}
      />

      <Input
        icon="User"
        name={fields.link_to_establishment.name}
        label={fields.link_to_establishment.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.link_to_establishment}
      />

      <Box sx={{ display: 'flex', gap: 2, width : '100%', justifyContent: 'center' }}>
      <Button title={buttonBackTitle} onclick={onBackButton} variant="secondary" />
      <Button title={buttonTitle} onclick={onSubmitButton} variant="primary" />
      </Box>
    </Container>

    <Box
      sx={{
        width: '100%',
        height: '50%',  
        position: 'fixed', 
        bottom: 0,        
        transform: 'translateY(150px)', 
        overflow: 'hidden', 
        zIndex: -1,      
      }}
    >
      <VectorBottom />
    </Box>


  </div>
  );
};
