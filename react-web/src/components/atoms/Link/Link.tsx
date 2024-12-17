import React from "react";

export type LinkProps = {
    url: string;
    text: string;
    newTab?: boolean;
    onClick?: () => void;
    color?: "primary" | "secondary";
};

export const Link: React.FC<LinkProps> = ({
    url,
    text,
    newTab,
    onClick,
    color = "primary", 
}) => {
    const linkStyle: React.CSSProperties = {
        color: color === "primary" ? "#2e2a85" : "#005745",
        textDecoration: "underline",
        fontWeight:  color === "primary" ? "normal" : "bold",
        fontSize: "16px",
        cursor: "pointer",
    };

    return (
    <>
        <a
        style={linkStyle}
        className={`${color}`} 
        href={url}
        target={newTab ? "_blank" : "_self"}
        onClick={onClick}
        >
        {text}
        </a>
    </>
    );
};
