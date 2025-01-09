import { Typography } from "@mui/material";

export type HeaderProps = {
    title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <Typography
        fontSize="22px"
        fontWeight="600"
        textAlign="center"
        width={"100%"}
        padding={"0 30px"}
        >
        {title}
        </Typography>
    );
};
