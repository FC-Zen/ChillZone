import { Icon } from "@components";
import { Typography } from "@mui/material";
import { IconList } from "../Icons";
import { colors } from "@theme";
import './style.css';

export type HeaderIconProps = {
    title: string;
    icon: keyof typeof IconList;
};

export const HeaderIcon: React.FC<HeaderIconProps> = ({ title,icon }) => {
    return (
        <div className="headerTitle">
        <Icon 
            name={icon}
            color={colors.black}
            width={24}
            height={24}
        />
        <Typography
        fontSize="24px"
        fontWeight="bolder"
        textAlign="center"
        >
        {title}
        </Typography>
        </div>
    );
};
