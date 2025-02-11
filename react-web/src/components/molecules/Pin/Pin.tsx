import React, { useState } from "react";
import { colors } from "@theme";

export type PinProps = {
    x: number;
    y: number;
    name: string;
    description? : string;
    capacity? : number;
    type? : string;
    onClick: () => void;
};

export const Pin: React.FC<PinProps> = ({ x, y, name,description, capacity, type, onClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
        onClick();
    };

    const getTooltipColor = (type: string | undefined) => {
        switch (type) {
            case "Salle de cours":
                return "#3789A3"; 
            case "Salle de réunion":
                return "#FA8507"; 
            case "Salle informatique":
                return "#78B200"; 
            case "Box acoustique":
                return "#8800A1"; 
            case "Amphithéâtre":
                return "#BB3254"; 
            default:
                return colors.resolutionBlue;
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                cursor: "pointer",
                transform: "translate(-50%, -100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Conteneur principal */}
            <div
                style={{
                    position: "relative",
                    width: "24px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Halo pulsant (uniquement quand visible) */}
                {isVisible && (
                    <div
                        style={{
                            position: "absolute",
                            width: "40px",
                            height: "40px",
                            backgroundColor: getTooltipColor(type),
                            borderRadius: "50%",
                            opacity: 0.4,
                            animation: "pulse 1.5s infinite ease-out",
                            zIndex: 0,
                        }}
                    />
                )}

                {/* Épingle avec pointe arrondie */}
                <div
                    style={{
                        width: "26px",
                        height: "26px",
                        backgroundColor: getTooltipColor(type),
                        borderRadius: "50%",
                        position: "relative",
                        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
                        zIndex: 1,
                    }}
                >
                    {/* Point central blanc bien aligné */}
                    <div
                        style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 2,
                        }}
                    />
                </div>
            </div>

            {/* Nom du pin avec transition fluide */}
            {isVisible && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "130%",
                        left: "50%",
                        transform: `translateX(-50%) translateY(${isVisible ? "0px" : "10px"})`,
                        backgroundColor: "white",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        zIndex: 2,
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontWeight: "bold",
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                        display : "flex",
                        textWrap : 'wrap',
                        flexDirection : 'column',
                        textAlign : 'center',
                        width : "175px"
                    }}
                >
                    <b>{name}</b>
                    {type && <p>{type}</p>}
                    {description && <p>{description}</p>}
                    {capacity !== undefined && <p>Capacité: {capacity}</p>}
                </div>
            )}

            {/* Animation de pulsation */}
            <style>
                {`
                    @keyframes pulse {
                        0% { transform: scale(0.5); opacity: 0.0; }
                        50% { opacity: 0.5; }
                        100% { transform: scale(1.5); opacity: 0.0; }
                    }
                `}
            </style>
        </div>
    );
};

export default Pin;
