import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import { Icon } from '@components/atoms';
import { colors } from '@theme';

export const FileInput: React.FC = () => {
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFilePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{
      borderRadius: '10px',
      width:"100%",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      alignItems: 'center',
      color: 'rgba(0, 0, 0, 1)',
      textAlign: 'center',
      letterSpacing: '-0.3px',
      justifyContent: 'center',
      padding: '10px 30px',
      font: '500 10px/20px Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
      border: '2px solid rgba(187, 187, 187, 1)'
    }}>
      {filePreview ? (
        <img
          loading="lazy"
          src={filePreview}
          alt="Uploaded preview"
          style={{
            aspectRatio: '1',
            objectFit: 'contain',
            objectPosition: 'center',
            width: '50px'
          }}
        />
      ) : (
        <Icon name={'Picture'} />
      )}
      <div style={{ marginTop: '10px' }}>
        <span style={{ fontSize: '16px', lineHeight: '32px' }}>{fileName || "Téléchargez votre image"}</span>
        <br />
        Formats pris en charge : JPEG / JPG, PNG, SVG
      </div>

      <Input
        type="file"
        inputProps={{ accept: 'image/*' }}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button
          variant="outlined"
          component="span"
          sx={{
            marginTop: '5px',
            padding: '0px 20px',
            color: colors.aquaDeep,
          }}
        >
          Télécharger un fichier
        </Button>
      </label>
    </div>
  );
};
