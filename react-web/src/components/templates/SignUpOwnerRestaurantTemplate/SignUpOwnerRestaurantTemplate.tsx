import React from 'react';
import { VectorHeader, VectorBottom, Button, Input } from '@components';
import { Logo, Header } from '@components/atoms';
import { Box, Container } from '@mui/material';
import { RadioButtons } from '@components/organisms/RadioButtons';
import { FileInput } from '@components/molecules/FileInput';
import { StyledSelect } from '@components/molecules';

type SignUpOwnerRestaurantTemplateProps = {
  title: string; 
  buttonTitle: string;
  buttonBackTitle : string;
  onSubmitButton: () => void;
  onBackButton: () => void;
  handleInputChange: (name: string, value: any) => void;
  handleFileChange: (file: File) => void;
  fields: any;
  formData : any;
  options : { value: string; label: string }[]; 
  optionsEstablishments : { id : number ; name : string }[]; 
};

export const SignUpOwnerRestaurantTemplate: React.FC<SignUpOwnerRestaurantTemplateProps> = ({
  title,
  buttonTitle,
  buttonBackTitle,
  onSubmitButton,
  onBackButton,
  handleInputChange,
  handleFileChange,
  fields,
  formData,
  options,
  optionsEstablishments
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
        name={fields.name.name}
        label={fields.name.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.name}
      />

      <Input
        icon="Browser"
        type="textarea"
        name={fields.description.name}
        label={fields.description.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.description}
      />

      <Box sx={{ display: 'flex', gap: 2, width : '100%' }}>
        <Input
          icon="Phone"
          type="time"
          name={fields.opening_time.name}
          label={fields.opening_time.label}
          required={true}
          onInputChange={handleInputChange}
          value={formData.opening_time}
        />

        <Input
          icon="Phone"
          type="time"
          name={fields.closing_time.name}
          label={fields.closing_time.label}
          required={true}
          onInputChange={handleInputChange}
          value={formData.closing_time}
        />
      </Box>

      <Input
        icon="Location"
        name={fields.location.name}
        label={fields.location.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.location}
      />

      <RadioButtons 
          label={fields.restauration_type.label} 
          name={fields.restauration_type.name} 
          options={options} 
          onInputChange={handleInputChange} 
      />

      <Input
        icon="Phone"
        type="tel"
        name={fields.phone_restaurant.name}
        label={fields.phone_restaurant.label}
        required={true}
        onInputChange={handleInputChange}
        value={formData.phone_restaurant}
      />

      <StyledSelect
          icon="Location"
          name={fields.establishments.name}
          label={fields.establishments.label}
          required={true}
          onValueChange={handleInputChange}
          value={formData.establishments}
          options={optionsEstablishments}
      />

      <FileInput
          key={0}
          id={0}   
          value={formData.photo_link}
          onFileChange={handleFileChange}    
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
