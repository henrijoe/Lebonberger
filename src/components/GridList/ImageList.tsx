import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import { FaTimes } from 'react-icons/fa';


interface StandardImageListProps {
    images: { img: string; title: string }[];
}


const StandardImageList: React.FC<StandardImageListProps> = ({ images }) => {

    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const handleOpen = (img: string) => {
        setCurrentImage(img);
        setOpen(true);
    };

    const handleClose = () => {
        setCurrentImage(null);
        setOpen(false);
    };

    const cols = images.length === 1 ? 1 : images.length === 2 ? 2 : 3;

    return (
        <>
            <ImageList sx={{ width: '100%' }} cols={cols} gap={5}>
                {images.map((item, index) => (
                    <ImageListItem key={index} onClick={() => handleOpen(item.img)} sx={{ cursor: 'pointer' }}>
                        <img
                            src={`${item.img}?w=300&h=300&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                            style={{ objectFit: 'cover', width: '100%', height: '500px' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            {/* Modal pour zoomer sur l'image */}
            <Modal open={open} onClose={handleClose}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        padding: '20px',
                        outline: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'blue',
                            cursor: 'pointer',
                            fontSize: '24px',
                        }}
                    >
                        <FaTimes />
                    </button>
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt="Zoomed"
                            style={{ maxWidth: '100%', maxHeight: '95vh', borderRadius: '8px' }}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default StandardImageList;
