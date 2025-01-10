import React, { useState, useRef, useEffect } from 'react';

type MapProps = {
    imageSrc: string;
    onClick: (x: number, y: number) => void;
};

export const Map: React.FC<MapProps> = ({ imageSrc, onClick }) => {
    const [initialScale, setInitialScale] = useState(1);
    const [zoomScale, setZoomScale] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const dragging = useRef(false);
    const startCoords = useRef({ x: 0, y: 0 });
    
    useEffect(() => {
        if (containerRef.current && imageRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const containerHeight = containerRef.current.offsetWidth;

            const imageWidth = imageRef.current.naturalWidth;
            const imageHeight = imageRef.current.naturalHeight;

            const scaleWidth = containerWidth / imageWidth;
            const scaleHeight = containerHeight / imageHeight;
            setInitialScale(Math.min(scaleWidth, scaleHeight));

            setZoomScale(initialScale); 
        }
    }, [imageSrc]); 
    
    // Gestion du zoom
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const scaleFactor = 0.1;
        let newScale = zoomScale + (e.deltaY < 0 ? scaleFactor : -scaleFactor);
        newScale = Math.max(initialScale, Math.min(newScale, 5)); // Zoom entre 1x et 5x
        setZoomScale(newScale);
    };

    // Déplacement (pan) de l'image
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragging.current = true;
        startCoords.current = { x: e.clientX - offsetX, y: e.clientY - offsetY };

        const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!dragging.current) return;
        setOffsetX(moveEvent.clientX - startCoords.current.x);
        setOffsetY(moveEvent.clientY - startCoords.current.y);
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
            src={imageSrc}
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
        </div>
    );
};

export default Map;
