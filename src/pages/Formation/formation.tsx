import React, { useState, useEffect } from "react";
import { FaFileAlt, FaVideo } from "react-icons/fa";
import Link from '@mui/material/Link';
import youtube from '../../images/logo/yutube.jpg';
import evang from '../../images/logo/evangile.png';
import formation1 from '../../images/formation/formation1.jpg';
import formation2 from '../../images/formation/ancien_gbogbo.jpg';
import formation3 from '../../images/formation/pasteur.jpg';
import formation4 from '../../images/formation/formation1.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from "@mui/material/Tooltip"; // Import du composant Tooltip


interface Video {
    title: string;
    subtitle: string;
    imag: string;
    url: string;
}

interface Document {
    title: string;
    size: string;
    downloadUrl: string;
}

const Formation: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"videos" | "documents">("videos");
    const [videos, setVideos] = useState<Video[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [cols, setCols] = useState(3);

    // Simuler une API pour récupérer les données
    useEffect(() => {

        setVideos([
            { title: "PAR LE SAINT-ESPRIT ASPIRONS AU REVEIL (partie 6)", subtitle: "Ensemble pour l'évangile", imag: evang, url: "https://www.youtube.com/embed/07_ldQ3KYIs" },
            { title: "Historique des Assemblées de Dieu de Yopougon Gare", subtitle: "Historique de l'Eglise Evangélique Assemblées de Dieu de Yopougon Gare, Temple Emmanuel, avec pasteur Emmanuel Kouassi", imag: formation2, url: "https://www.youtube.com/watch?v=woff7VvnZJI&t=1s" },
            { title: "Formation 3 - Séminaire", subtitle: "Techniques modernes", imag: formation2, url: "https://www.youtube.com/watch?v=1Y1nLCH9aRE"},
            { title: "Formation 4 - Développement", subtitle: "Approche agile", imag: youtube, url: "https://www.youtube.com/watch?v=XG84hLFf1q4"},
            { title: "Formation 5 - Leadership", subtitle: "Guide pour leaders", imag: formation3, url: "https://www.youtube.com/embed/07_ldQ3KYIs" },
            { title: "Formation 6 - Performance", subtitle: "Atteindre vos objectifs", imag: formation4, url: "https://www.youtube.com/watch?v=1Y1nLCH9aRE"},
        ]);

        setDocuments([
            { title: "Guide Laravel.pdf", size: "2 MB", downloadUrl: "C:/Users/smsag/Documents/BILAN FINANCIER 2024.pdf" },
            { title: "Documentation API.pdf", size: "1.5 MB", downloadUrl: "/files/documentation-api.pdf" },
            { title: "Stratégie 2023.pdf", size: "3 MB", downloadUrl: "/files/strategie-2023.pdf" },
            { title: "Guide Laravel.pdf", size: "2 MB", downloadUrl: "/documents/BILAN%20FINANCIER%202024.pdf" },
            { title: "Documentation API.pdf", size: "1.5 MB", downloadUrl: "/files/documentation-api.pdf" },
            { title: "Stratégie 2023.pdf", size: "3 MB", downloadUrl: "/files/strategie-2023.pdf" },
            { title: "Guide Laravel.pdf", size: "2 MB", downloadUrl: "/documents/BILAN%20FINANCIER%202024.pdf" },
            { title: "Documentation API.pdf", size: "1.5 MB", downloadUrl: "/files/documentation-api.pdf" },
            { title: "Stratégie 2023.pdf", size: "3 MB", downloadUrl: "/files/strategie-2023.pdf" },
        ]);
        
    }, []);

    // Ajuster les colonnes dynamiquement en fonction de la taille de l'écran
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setCols(1); // Téléphone
            else if (window.innerWidth < 1024) setCols(2); // Tablette
            else setCols(3); // Bureau
        };

        handleResize(); // Initialiser les colonnes
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="p-3 dark:border-strokedark dark:bg-boxdark">
            {/* Onglets (Tabs) */}

            <div className="border-b border-gray-300 mb-5 flex">
                <div
                    className={`px-4 py-2 cursor-pointer ${activeTab === "videos"
                        ? "border-b-2 border-green-600 text-green-600 font-bold"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => setActiveTab("videos")}
                >
                    <div className="flex items-center gap-2 dark:text-white">
                        <FaVideo />
                        Vidéos de Formations
                    </div>
                </div>
                <div
                    className={`px-4 py-2 cursor-pointer ${activeTab === "documents"
                        ? "border-b-2 border-red-600 text-red-600 font-bold"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => setActiveTab("documents")}
                >
                    <div className="flex items-center gap-2 dark:text-white">
                        <FaFileAlt />
                        Documents PDF
                    </div>
                </div>
            </div>

            {/* Contenu correspondant à l'onglet actif */}
            {activeTab === "videos" ? (

                <ImageList sx={{ width: '100%' }} cols={cols} gap={10}>
                    {videos.map((video, index) => (
                        <ImageListItem
                            key={index}
                            sx={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)', //Zoom léger
                                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)', //Ombre accentuée
                                },
                            }}>
                            <Tooltip title="Cliquer pour regarder la vidéo sur YouTube" arrow>
                                <Link target="_blank" href={`${video.url}?autoplay=0`}>
                                    <img
                                        src={video.imag}
                                        alt={video.title}
                                        loading="lazy"
                                        style={{
                                            width: '95%',
                                            height: '300px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Link>
                            </Tooltip>
                            <div className="mt-2 text-left ml-5">
                                <h3 className="text-lg font-bold text-gray-800 uppercase dark:text-white">{video.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-white">{video.subtitle}</p>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>

            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 dark:text-white">
                    {documents.map((doc, index) => (
                        <Tooltip
                            key={index}
                            title="Cliquer pour télécharger le document PDF"
                            arrow
                            disableInteractive
                        >
                            <div
                                className="dark:text-white bg-red-100 p-4 rounded-lg shadow-md border-l-4 border-red-600 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <FaFileAlt className="text-6xl text-red-600 mb-4" />
                                <p className="text-lg font-semibold text-red-800 text-center uppercase">
                                    {doc.title}
                                </p>
                                <p className="text-sm text-red-500">{doc.size}</p>
                                {/* <a
                                    href={doc.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 "
                                >
                                    Télécharger
                                </a> */}

                                <a
                                    href={doc.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download // Force le téléchargement
                                    className="mt-2 inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 "
                                >
                                    Télécharger
                                </a>
                            </div>
                        </Tooltip>
                    ))}
                </div>

            )}
        </div>
    );
};

export default Formation;
