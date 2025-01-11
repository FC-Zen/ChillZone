import Box from '@mui/material/Box';
import { colors } from '@theme';

export type CommandInfoProps = {
  title: string;
  value: string | number;
};

export const CommandInfo = ({
  title,
  value,
}: CommandInfoProps) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;  // Si ce n'est pas une date valide, retourne la chaîne brute
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc on ajoute 1
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box 
      sx={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inline-flex',
      }}
    >
      <div 
        style={{
          width: 381,
          height: 29,
          color: colors.resolutionBlue,
          fontSize: "14px",
          fontWeight: '600',
          lineHeight: '12px',
          wordWrap: 'break-word',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        | {title} : {typeof value === 'number' ? `${value} €` : formatDate(value as string)}
      </div>
    </Box>
  );
};