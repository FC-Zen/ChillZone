import { Pin } from '@components';
import { Floor } from '@pages/AdminEstablishmentPage/AdminEstablishmentPage';
import { colors } from '@theme';
import React, { useState, useRef, useEffect } from 'react';

type MapInputProps = {
    selectedFloor: Floor | null;
    selectedCoords : { x: number, y: number } | null ;
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

export const MapInput: React.FC<MapInputProps> = ({ selectedFloor, selectedCoords, onClick }) => {
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
    const [pin, setPin] = useState<MapLocation | null>(null);

    useEffect(() => {
        console.log(selectedFloor);
        if (selectedCoords) {
            const newPin: MapLocation = {
                id: Date.now(),
                name: "Pin",
                description: "Description du pin",
                capacity: 10,
                status: true,
                photo_link: null,
                position_x: selectedCoords.x,
                position_y: selectedCoords.y,
            };
            setPin(newPin); // Définit le pin initial basé sur selectedCoords
        }
        if (selectedFloor) {
            setPhotoLink(selectedFloor.photo_link ? `http://localhost:3000${selectedFloor.photo_link}` : "");
        }
    }, []);

    useEffect(() => {
        if (!photoLink || !imageRef.current) return;
    
        const handleImageLoad = () => {
            if (containerRef.current && imageRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const containerHeight = containerRef.current.offsetHeight;
    
                const imageWidth = imageRef.current.naturalWidth;
                const imageHeight = imageRef.current.naturalHeight;
    
                if (imageWidth > 0 && imageHeight > 0) {
                    const scaleWidth = containerWidth / imageWidth;
                    const scaleHeight = containerHeight / imageHeight;
                    const newInitialScale = Math.min(scaleWidth, scaleHeight);
    
                    setInitialScale(newInitialScale);
                }
            }
        };
    
        const img = imageRef.current;
        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener("load", handleImageLoad);
            return () => img.removeEventListener("load", handleImageLoad);
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
        console.log("Je gère le déplacement ici");
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
        if (!imageRef.current || !containerRef.current) return;

        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / zoomScale);
        const y = ((e.clientY - rect.top) / zoomScale);

        if (x !== 0 && y !== 0) {
            
            const newPin: MapLocation = {
                id: Date.now(), // Utilisation de Date.now() pour une ID unique
                name: "Pin", 
                description: "Description du pin",
                capacity: 10, // Exemple de capacité
                status: true,
                photo_link: null,
                position_x: Math.round(x),
                position_y: Math.round(y),
            };

            console.log(newPin);
            setPin(newPin); // Met à jour le pin unique
            onClick(Math.round(x), Math.round(y)); // Passer les coordonnées au parent
        }
    };

    return (
        <div
            key={photoLink}
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
            {pin && (
                <Pin
                    key={pin.id}
                    x={(pin.position_x * zoomScale) + offsetX}
                    y={(pin.position_y * zoomScale) + offsetY}
                    name={pin.name}
                    onClick={() => console.log(`Clicked on ${pin.name}`)} // Handle pin click
                />
            )}
        </div>
    );
};

export default MapInput;
