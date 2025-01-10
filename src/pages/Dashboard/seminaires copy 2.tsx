import React, { useState, useEffect } from 'react';
import img1 from '../../images/formation/ancien_gbogbo.jpg';
import img2 from '../../images/formation/formation1.jpg';
import img3 from '../../images/formation/pasteur.jpg';
import { Send, ThumbsUp } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../store/store';
import {
    incrementViews,
    addComment,
    addResponse,
    toggleLike,
} from '../../store/informationSlice';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import StandardImageList from '../../components/GridList/ImageList';


const dataInformation = [
    {
        id: 1,
        titre: 'Séminaire de formation',
        lieu: 'Église Évangélique des assemblées de Dieu de Port Bouet 2',
        dateEvenement: '01 Sept 2022',
        pathImages: [
            { img: img1, title: 'Séminaire 1' },
            { img: img2, title: 'Séminaire 2' },
            { img: img3, title: 'Séminaire 3' },
        ],
        descriptionEvenement: "J'ai eu l'honneur d'être l'orateur au séminaire.",
        auteur: 'Gbogbo Ruffin',
        fonction: 'Administrateur',
        shareUrl: 'https://example.com/seminaire',
    },
    {
        id: 2,
        titre: 'Atelier de Leadership',
        lieu: 'Église Baptiste Oeuvres et missions',
        dateEvenement: '15 Oct 2022',
        pathImages: [
            { img: img1, title: 'Leadership 1' },
            { img: img3, title: 'Leadership 2' },
        ],
        descriptionEvenement: 'Un atelier sur les stratégies de leadership.',
        auteur: 'Marie Claire',
        fonction: 'Facilitatrice',
        shareUrl: 'https://example.com/atelier',
    },
];


const Seminaire: React.FC = () => {
    const dispatch = useDispatch();
    const [activeSeminaire, setActiveSeminaire] = useState(dataInformation[0]);
    const likes = useSelector((state: IReduxState) => state.information.likes);
    const views = useSelector((state: IReduxState) => state.information.views);
    const comments = useSelector((state: IReduxState) => state.information.comments);
    const isLiked = useSelector((state: IReduxState) => state.information.isLiked);

    const [newComment, setNewComment] = useState('');
    const [replyIndex, setReplyIndex] = useState<number | null>(null);
    const [newReply, setNewReply] = useState('');

    /**
       * Fonction pour gérer l'incrémentation des "J'aime".
       * Alterne entre "J'aime" et "Annuler J'aime".
       */

    const handleLike = () => {
        dispatch(toggleLike(!isLiked)); // Alterne entre "J'aime" et "Annuler J'aime"
    };


    /**
         * Fonction pour ajouter un nouveau commentaire.
         * - Vérifie que le commentaire n'est pas vide.
         * - Déclenche l'action Redux `addComment` pour ajouter le commentaire.
         * - Réinitialise le champ de saisie après l'ajout.
         */
    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            dispatch(addComment(newComment));
            setNewComment(""); // Réinitialiser le champ de texte
        }
    };


    /**
         * Fonction pour ajouter une réponse à un commentaire spécifique.
         * - Vérifie que l'index du commentaire est valide et que la réponse n'est pas vide.
         * - Déclenche l'action Redux `addResponse` pour ajouter la réponse au commentaire ciblé.
         * - Réinitialise l'état local pour la réponse après l'ajout.
         */
    // const handleAddResponse = () => {
    //     if (replyIndex !== null && newReply.trim()) {
    //         dispatch(addResponse({ index: replyIndex, response: newReply }));
    //         setNewReply(""); // Réinitialiser le champ de réponse
    //         setReplyIndex(null); // Réinitialiser l'index de réponse
    //     }
    // };

    const handleAddResponse = (index: number) => {
        if (newReply.trim()) {
            dispatch(
                addResponse({
                    indexPath: String(index),
                    response: newReply,
                })
            );
            setNewReply("");
            setReplyIndex(null);
        }
    };

    const handleAddNestedResponse = (parentIndex: number, resIndex: number) => {
        if (newReply.trim()) {
            dispatch(
                addResponse({
                    indexPath: `${parentIndex}-${resIndex}`,
                    response: newReply,
                })
            );
            setNewReply("");
            setReplyIndex(null);
        }
    };


    const handleShare = (platform: string) => {
        const encodedTitle = encodeURIComponent(activeSeminaire.titre);
        const encodedUrl = encodeURIComponent(activeSeminaire.shareUrl);
        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
                break;
            default:
                console.error('Platform not supported');
                return;
        }
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    const renderResponses = (responses: any[], indexPath: string) => {
        return responses.map((response, resIndex) => {
            const currentPath = `${indexPath}-${resIndex}`;

            return (
                <div key={currentPath} className="mb-2">
                    <div className="flex items-start">
                        <img
                            src="/path/to/commenter-image.jpg"
                            alt="Répondant"
                            className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white">
                                Réponse {resIndex + 1}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-white">{response.text}</p>
                            <button
                                onClick={() => setReplyIndex(currentPath)}
                                className="text-xs text-primary mt-1 dark:text-white"
                            >
                                Répondre
                            </button>
                        </div>
                    </div>

                    {replyIndex === currentPath && (
                        <div className="ml-10 mt-3">
                            <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddResponse(currentPath);
                                    }
                                }}
                                placeholder="Répondre..."
                                className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>
                            <button
                                onClick={() => handleAddResponse(currentPath)}
                                className="mt-2 px-4 py-1 bg-primary text-white dark:text-white rounded-md"
                            >
                                Répondre
                            </button>
                        </div>
                    )}

                    <div className="ml-10 mt-3">
                        {renderResponses(response.responses, currentPath)}
                    </div>
                </div>
            );
        });
    };


    useEffect(() => {
        dispatch(incrementViews());
    }, [dispatch]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            {dataInformation.map((item, index) => (

                <div key={index} className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark mb-3">

                    <div className="w-full mb-5">
                        <h1 className="font-semibold text-primary text-2xl">{item.titre}</h1>
                        <div>
                            <p className="text-sm font-medium text-black dark:text-white">{item.lieu}</p>
                            <p className="text-sm font-medium text-gray-500 dark:text-white">le {item.dateEvenement}</p>
                        </div>
                    </div>

                    <div className="mb-5 h-auto overflow-hidden">

                        <StandardImageList images={item.pathImages} />
                    </div>

                    <div className="flex justify-between items-center mb-5 flex-wrap md:flex-nowrap">
                        {/* Section de gauche : Nombre de commentaires et vues */}
                        <div className="flex items-center space-x-4 text-xs sm:text-sm">
                            <span className="font-medium text-gray-600 dark:text-white">
                                {comments.length} Commentaire{comments.length > 1 ? "s" : ""}
                            </span>
                            <span className="font-medium text-gray-600 dark:text-white">
                                {views.toLocaleString()} Vue{views > 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Section de droite : Boutons J'aime et Partager */}
                        <div className="flex items-center space-x-2 gap-2 mt-2 md:mt-0">
                            {/* Bouton J'aime */}
                            <button
                                onClick={handleLike}
                                className="p-1 sm:p-2 gap-1 flex items-center hover:bg-gray-200 rounded"
                            >
                                <ThumbsUp
                                    color={isLiked ? "blue" : "gray"}
                                    size={12} /* Petite taille pour mobile */
                                    className="sm:size-5"
                                />
                                <span
                                    className={`text-xs dark:text-white sm:text-sm font-medium ${isLiked ? "text-blue-500" : "text-gray-600"
                                        }`}
                                >
                                    J'aime {likes}
                                </span>
                            </button>

                            {/* Boutons de partage */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleShare("facebook")}
                                    className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                                >
                                    <FaFacebook size={14} className="sm:size-5" color="blue" />
                                </button>
                                <button
                                    onClick={() => handleShare("whatsapp")}
                                    className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                                >
                                    <FaWhatsapp size={14} className="sm:size-5" color="#25D366" />
                                </button>
                                <button
                                    onClick={() => handleShare("twitter")}
                                    className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                                >
                                    <FaTwitter size={14} className="sm:size-5" color="#1DA1F2" />
                                </button>
                                <button
                                    onClick={() => handleShare("linkedin")}
                                    className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                                >
                                    <FaLinkedin size={14} className="sm:size-5" color="#0077B5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <p className="text-sm text-gray-700 dark:text-white">{item.descriptionEvenement}</p>
                    </div>

                    <div className="flex items-center border-t pt-5">
                        <img src="/path/to/author-image.jpg" alt="Auteur" className="w-12 h-12 rounded-full mr-4" />
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.auteur}</p>
                            <p className="text-xs text-gray-600 dark:text-white">{item.fonction}</p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <h3 className="text-lg dark:text-white font-medium text-gray-900">
                            {comments.length} Commentaire{comments.length > 1 ? "s" : ""}
                        </h3>

                        <div className="mt-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Écrivez un commentaire..."
                                className="w-full border rounded-md p-3 text-sm dark:border-strokedark dark:bg-boxdark dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>
                            <button onClick={handleAddComment} className="flex mt-2 gap-1 px-4 py-2 dark:text-white bg-primary text-white rounded-md">
                                Envoyer <Send color="white" size={15} className='mt-2' />
                            </button>
                        </div>
                        {/* 
                        <div className="mt-5">
                            {comments.map((comment, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex items-start">
                                        <img
                                            src="/path/to/commenter-image.jpg"
                                            alt="Commenter"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Commentaire {index + 1}</p>
                                            <p className="text-xs text-gray-600 mb-2 dark:text-white">Envoyé à {comment.timestamp}</p>
                                            <p className="text-sm text-gray-700 dark:text-white">{comment.text}</p>
                                            <button
                                                onClick={() => setReplyIndex(index)}
                                                className="text-sm text-primary mt-2 dark:text-white"
                                            >
                                                Répondre
                                            </button>
                                        </div>
                                    </div>

                                    {replyIndex === index && (
                                        <div className="ml-10 mt-3">
                                            <textarea
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                                placeholder="Répondre..."
                                                className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            ></textarea>
                                            <button
                                                onClick={handleAddResponse}
                                                className="mt-2 px-4 py-1 bg-primary text-white dark:text-white rounded-md"
                                            >
                                                Répondre
                                            </button>
                                        </div>
                                    )}

                                    <div className="ml-10 mt-3">
                                        {comment.responses.map((response, resIndex) => (
                                            <p key={resIndex} className="text-sm text-gray-700 dark:text-white">
                                                {response}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div> */}

<div className="mt-5">
                            {comments.map((comment, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex items-start">
                                        <img
                                            src="/path/to/commenter-image.jpg"
                                            alt="Commenter"
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                Commentaire {index + 1}
                                            </p>
                                            <p className="text-xs text-gray-600 mb-2 dark:text-white">
                                                Envoyé à {comment.timestamp}
                                            </p>
                                            <p className="text-sm text-gray-700 dark:text-white">{comment.text}</p>
                                            <button
                                                onClick={() => setReplyIndex(String(index))}
                                                className="text-sm text-primary mt-2 dark:text-white"
                                            >
                                                Répondre
                                            </button>
                                        </div>
                                    </div>

                                    {replyIndex === String(index) && (
                                        <div className="ml-10 mt-3">
                                            <textarea
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        handleAddResponse(String(index));
                                                    }
                                                }}
                                                placeholder="Répondre..."
                                                className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                            ></textarea>
                                            <button
                                                onClick={() => handleAddResponse(String(index))}
                                                className="mt-2 px-4 py-1 bg-primary text-white dark:text-white rounded-md"
                                            >
                                                Répondre
                                            </button>
                                        </div>
                                    )}

                                    <div className="ml-10 mt-3">
                                        {renderResponses(comment.responses, String(index))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Seminaire;
