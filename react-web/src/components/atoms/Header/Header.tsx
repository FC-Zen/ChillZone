import { Box, Typography } from "@mui/material";

export type HeaderProps = {
    title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <Typography
        fontSize="24px"
        fontWeight="bolder"
        textAlign="center"
        >
        {title}
        </Typography>
    );
};
