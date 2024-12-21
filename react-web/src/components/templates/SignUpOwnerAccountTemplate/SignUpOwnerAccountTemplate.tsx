import React from 'react';
import { VectorHeader, VectorBottom, Button, Checkbox, Input } from '@components';
import { Logo, Header } from '@components/atoms';
import { Box, Container } from '@mui/material';

type SignUpOwnerAccountTemplateProps = {
  title: string; 
  buttonTitle: string;
  onSubmitButton: () => void;
  handleInputChange: (name: string, value: string) => void;
  fields: any;
  formData: any;
};

export const SignUpOwnerAccountTemplate: React.FC<SignUpOwnerAccountTemplateProps> = ({
  title,
  buttonTitle,
  onSubmitButton,
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
        width: '22%',
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

      <Input icon="User" name={fields.first_name.name} label={fields.first_name.label} required={true} onInputChange={handleInputChange} value={formData.first_name}/>
      <Input icon="User" name={fields.last_name.name} label={fields.last_name.label} required={true} onInputChange={handleInputChange} value={formData.last_name}/>
      <Input icon="Envelope" name={fields.email.name} label={fields.email.label} required={true} onInputChange={handleInputChange} value={formData.email}/>
      <Input icon="Phone" name={fields.phone.name} label={fields.phone.label} required={true} onInputChange={handleInputChange} value={formData.phone}/>
      <Input icon="User" type="password" name={fields.password.name} label={fields.password.label} required={true} onInputChange={handleInputChange} value={formData.password}/>
      <Input icon="User" type="password" name={fields.verify_password.name} label={fields.verify_password.label} required={true} onInputChange={handleInputChange} value={formData.verify_password}/>


      <Button title={buttonTitle} onclick={onSubmitButton} variant="primary" />
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
