import { useEffect, useState } from "react";
import { TextField, Card, IconButton } from "@mui/material";
import { Networks } from "@pages/AdminFAQPage/AdminFAQPage";
import { Icon } from "@components/atoms";
import { colors } from "@theme";

export type CardProps = {
    item : Networks;
    handleEdit : (id: number, link_network:string) => void;
    handleDelete : (id: number) => void;
}

export const CustomCard = ({ item, handleEdit, handleDelete } : CardProps) => {
    const [value, setValue] = useState(item.link_network);
    const [isDisabled, setIsDisabled] = useState(true); 

  useEffect(() => {
    setValue(item.link_network);
  }, [item]);

    return (
      <Card sx={{ display: "flex", alignItems: "center", padding: 2, gap: 2, borderRadius: 2}}>
        <img src={`/images/${item.type}.png`} alt={item.type} key={item.id} width="24px" />
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          size="small"
          disabled={isDisabled}
          sx={{ flex: 1 }}
        />
        <IconButton color="primary" 
          onClick={() => {
            if (isDisabled) {
              setIsDisabled(false);
            } else {
              handleEdit(item.id, value);
              setIsDisabled(true);
            }
          }}
        >
          <Icon name={isDisabled ? "Pencil" : "Check"} />
        </IconButton>
        <IconButton color="primary" onClick={() => handleDelete(item.id)}>
          <Icon name="Trash" color={colors.red} />
        </IconButton>
      </Card>
    );
  };

