import React from 'react';
import { VectorHeader, VectorBottom, Button, Input } from '@components';
import { Logo, Header } from '@components/atoms';
import { Box, Container } from '@mui/material';
import { RadioButtons } from '@components/organisms/RadioButtons';
import { FileInput } from '@components/molecules/FileInput';

type SignUpOwnerRestaurantTemplateProps = {
  title: string; 
  buttonTitle: string;
  buttonBackTitle : string;
  onSubmitButton: () => void;
  onBackButton: () => void;
  handleInputChange: (name: string, value: string) => void;
  fields: any;
  formData : any;
  options : { value: string; label: string }[]; 
};

export const SignUpOwnerRestaurantTemplate: React.FC<SignUpOwnerRestaurantTemplateProps> = ({
  title,
  buttonTitle,
  buttonBackTitle,
  onSubmitButton,
  onBackButton,
  handleInputChange,
  fields,
  formData,
  options
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
        gap: '7px',
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
        icon="Browser"
        type="textarea"
        name={fields.restauration_place_description.name}
        label={fields.restauration_place_description.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_description}
      />

      <Box sx={{ display: 'flex', gap: 2, width : '100%' }}>
        <Input
          icon="Phone"
          type="time"
          name={fields.restauration_place_opening_time.name}
          label={fields.restauration_place_opening_time.label}
          required={true}
          onInputChange={handleInputChange}
          value={formData.restauration_place_opening_time}
        />

        <Input
          icon="Phone"
          type="time"
          name={fields.restauration_place_closing_time.name}
          label={fields.restauration_place_closing_time.label}
          required={true}
          onInputChange={handleInputChange}
          value={formData.restauration_place_closing_time}
        />
      </Box>

      <Input
        icon="Location"
        name={fields.restauration_place_location.name}
        label={fields.restauration_place_location.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_location}
      />

      <RadioButtons 
          label={fields.restauration_place_type.label} 
          name={fields.restauration_place_type.name} 
          options={options} 
          onInputChange={handleInputChange} 
      />

      <Input
        icon="Phone"
        type="tel"
        name={fields.restauration_place_phone.name}
        label={fields.restauration_place_phone.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.restauration_place_photo_phone}
      />

      <Input
        icon="Location"
        name={fields.link_to_establishment.name}
        label={fields.link_to_establishment.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.link_to_establishment}
      />

      <FileInput 

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
