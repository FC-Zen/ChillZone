import { Pin } from '@components';
import { Floor } from '@pages/AdminEstablishmentPage/AdminEstablishmentPage';
import { colors } from '@theme';
import React, { useState, useRef, useEffect } from 'react';

type MapProps = {
    selectedFloor: Floor | null;
    onClick: (x: number, y: number) => void;
};

export type MapLocation = {
    id: number;
    name: string;
    description: string;
    capacity: number;
    status: boolean;
    photo_link: string | null;
    position_x: number;
    position_y: number;
};



export const Map: React.FC<MapProps> = ({ selectedFloor, onClick }) => {
    // sur l'image
    const [initialScale, setInitialScale] = useState(1);
    const [zoomScale, setZoomScale] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    // sur la div
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const dragging = useRef(false);
    const startCoords = useRef({ x: 0, y: 0 });

    const [photoLink, setPhotoLink] = useState<string>("");
    const [locations, setLocations] = useState<MapLocation[]>([])
    
    useEffect(() => {
        if (selectedFloor) {
            setPhotoLink(selectedFloor.photo_link ? `http://localhost:3000${selectedFloor.photo_link}` : "");
            setLocations(selectedFloor.locations);
        }
    }, [selectedFloor]);

    useEffect(() => {
        if (containerRef.current && imageRef.current) {
            // DELIMITER LA TAILLE DE LIMAGE SELON LA DIV PARENT

            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetWidth;

            const imageWidth = imageRef.current.naturalWidth;
            const imageHeight = imageRef.current.naturalHeight;

            const scaleWidth = containerWidth / imageWidth;
            const scaleHeight = containerHeight / imageHeight;
            const newInitialScale = Math.min(scaleWidth, scaleHeight);

            setInitialScale(newInitialScale);
        }
    }, [photoLink]); 

    useEffect(() => {
        setZoomScale(initialScale);
    }, [initialScale]);
    
    // Gestion du zoom
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        const scaleFactor = 0.1;
        let newScale = zoomScale + (e.deltaY < 0 ? scaleFactor : -scaleFactor);
        newScale = Math.max(initialScale, Math.min(newScale, 5)); // Zoom entre 1x et 5x
        setZoomScale(newScale);
    };

    // Déplacement de l'image
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragging.current = true;
        startCoords.current = { x: e.clientX - offsetX, y: e.clientY - offsetY };
    
        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!dragging.current || !imageRef.current || !containerRef.current) return;
    
            const container = containerRef.current;
            const image = imageRef.current;
    
            // Taille réelle de l'image après le zoom
            const imageWidth = image.naturalWidth * zoomScale;
            const imageHeight = image.naturalHeight * zoomScale;
    
            // Taille du conteneur
            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
    
            // Calcul des limites pour empêcher l'image de sortir
            const maxX = Math.max(0, (imageWidth - containerWidth));
            const maxY = Math.max(0, (imageHeight - containerHeight));
    
            // Nouveaux offsets limités aux bords
            const newX = moveEvent.clientX - startCoords.current.x;
            const newY = moveEvent.clientY - startCoords.current.y;
    
            setOffsetX(Math.min(0, Math.max(-maxX, newX)));
            setOffsetY(Math.min(0, Math.max(-maxY, newY)));
        };
    
        const handleMouseUp = () => {
            dragging.current = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Récupération des coordonnées X, Y sur l'image
    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        console.log(imageRef);
        if (!imageRef.current || !containerRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / zoomScale);
        const y = ((e.clientY - rect.top) / zoomScale);

        onClick(Math.round(x), Math.round(y));
    };

    return (
        <div
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            style={{
                position: 'relative',
                width: '100%',
                height: '70vh',
                overflow: 'hidden',
                cursor: 'grab',
                background: '#f0f0f0',
                borderRadius: "20px",
                border: "solid 3px",
                borderColor: colors.resolutionBlue
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transformOrigin: 'top left',
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${zoomScale})`,
                }}
            >
                <img
                    ref={imageRef}
                    src={photoLink}
                    alt="Map"
                    onClick={handleImageClick}
                    style={{
                        display: 'block',
                        userSelect: 'none',
                        maxWidth: 'none',
                        maxHeight: 'none',
                    }}
                />
            </div>
            {locations.map(location => {
                const pinX = (location.position_x * zoomScale) + offsetX;
                const pinY = (location.position_y * zoomScale) + offsetY;

                return (
                    <Pin
                        key={location.id}
                        x={pinX}
                        y={pinY}
                        name={location.name}
                        onClick={() => console.log(`Clicked on ${location.name}`)} // Handle pin click
                    />
                );
            })}
        </div>
    );
};

export default Map;
