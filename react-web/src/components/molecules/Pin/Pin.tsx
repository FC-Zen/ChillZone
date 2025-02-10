import { colors } from "@theme";

export type PinProps = {
    x: number;
    y: number;
    name: string;
    onClick: () => void;
};

export const Pin: React.FC<PinProps> = ({ x, y, name, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                cursor: 'pointer',
                transform: 'translate(-50%, -100%)', // Center the pin on the coordinates
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: colors.resolutionBlue,
                borderRadius: '50%',
                position: 'relative',
                zIndex: 1,
            }} />
            <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '5px',
                boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                zIndex: 2,
            }}>
                {name}
            </div>
        </div>
    );
};

export default Pin;
