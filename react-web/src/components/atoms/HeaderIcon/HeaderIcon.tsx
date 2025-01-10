import { Icon } from "@components";
import { Typography } from "@mui/material";
import { IconList } from "../Icons";
import { colors } from "@theme";
import './style.css';

export type HeaderIconProps = {
    title: string;
    icon: keyof typeof IconList;
    fontsize? : string;
};

export const HeaderIcon: React.FC<HeaderIconProps> = ({ title,icon, fontsize = '24px' }) => {
    return (
        <div className="headerTitle">
        <Icon 
            name={icon}
            color={colors.black}
            width={24}
            height={24}
        />
        <Typography
        fontSize={fontsize}
        fontWeight="bolder"
        textAlign="center"
        >
        {title}
        </Typography>
        </div>
    );
};
