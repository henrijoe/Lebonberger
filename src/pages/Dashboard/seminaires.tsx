import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../../images/formation/ancien_gbogbo.jpg";
import img2 from "../../images/formation/formation1.jpg";
import img3 from "../../images/formation/pasteur.jpg";
import { Send, ThumbsUp } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import StandardImageList from "../../components/GridList/ImageList";
import { addComment, addResponse, incrementViews, toggleLike } from "../../store/informationSlice";
import { IReduxState } from "../../store/store";
import { calculateTimeAgo } from "../../utils/Fonctions";


// interface Comment {
//     text: string;
//     timestamp: string;
//     responses: { text: string; timestamp: string }[];
// }

interface Comment {
    text: string;
    timestamp: string;
    responses: Comment[]; // Les réponses peuvent aussi contenir des réponses
}

interface Item {
    id: number;
    titre: string;
    lieu: string;
    dateEvenement: string;
    pathImages: { img: any; title: string }[];
    descriptionEvenement: string;
    auteur: string;
    fonction: string;
    shareUrl: string;
    likes: number;
    isLiked: boolean;
    comments: Comment[];
}

const dataInformation: Item[] = [
    {
        id: 1,
        titre: "Séminaire de formation",
        lieu: "Église Évangélique des assemblées de Dieu de Port Bouet 2",
        dateEvenement: "01 Sept 2022",
        pathImages: [
            { img: img1, title: "Séminaire 1" },
            { img: img2, title: "Séminaire 2" },
            { img: img3, title: "Séminaire 3" },
        ],
        descriptionEvenement: "J'ai eu l'honneur d'être l'orateur au séminaire.",
        auteur: "Gbogbo Ruffin",
        fonction: "Administrateur",
        shareUrl: "https://example.com/seminaire",
        likes: 0,
        isLiked: false,
        comments: [],
    },
    {
        id: 2,
        titre: "Atelier de Leadership",
        lieu: "Église Baptiste Oeuvres et missions",
        dateEvenement: "15 Oct 2022",
        pathImages: [
            { img: img1, title: "Leadership 1" },
            { img: img3, title: "Leadership 2" },
        ],
        descriptionEvenement: "Un atelier sur les stratégies de leadership.",
        auteur: "Marie Claire",
        fonction: "Facilitatrice",
        shareUrl: "https://example.com/atelier",
        likes: 0,
        isLiked: false,
        comments: [],
    },
];

const Seminaire: React.FC = () => {

    const dispatch = useDispatch();

    // Redux global state
    const views = useSelector((state: IReduxState) => state.information.views);
    const likes = useSelector((state: IReduxState) => state.information.likes);
    const comments = useSelector((state: IReduxState) => state.information.comments);
    const isLiked = useSelector((state: IReduxState) => state.information.isLiked);

    const [data, setData] = useState<Item[]>(dataInformation);
    const [replyIndex, setReplyIndex] = useState<string | null>(null);
    const [newComment, setNewComment] = useState<string>("");
    const [newReply, setNewReply] = useState<string>("");

    /**
      * Fonction pour partager sur les réseaux sociaux
      */
    const handleShare = (platform: string, item: Item) => {
        const encodedTitle = encodeURIComponent(item.titre);
        const encodedUrl = encodeURIComponent(item.shareUrl);

        let shareUrl = "";
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
                break;
            case "whatsapp":
                shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
                break;
            default:
                console.error("Platform not supported");
                return;
        }

        window.open(shareUrl, "_blank", "width=600,height=400");
    };



// Fonction pour gérer les likes sur un élément spécifique
const handleLike = (itemId: number) => {
    setData((prev) =>
        // Parcourir les éléments existants pour trouver celui à modifier
        prev.map((item) =>
            item.id === itemId
                ? {
                      // Inverser l'état de "isLiked" (j'aime / je n'aime pas) et ajuster le compteur de likes
                      ...item,
                      isLiked: !item.isLiked,
                      likes: item.isLiked ? item.likes - 1 : item.likes + 1,
                  }
                : item // Retourner les autres éléments sans modification
        )
    );
};


// Fonction pour ajouter un nouveau commentaire à un élément spécifique
const handleAddComment = (itemId: number) => {
    if (newComment.trim()) {
        setData((prev) =>
            // Parcourir les éléments existants pour trouver celui à modifier
            prev.map((item) =>
                item.id === itemId
                    ? {
                          ...item,
                          comments: [
                              // Ajouter le nouveau commentaire au tableau des commentaires existants
                              ...item.comments,
                              {
                                  text: newComment, // Texte du commentaire
                                  timestamp: new Date().toLocaleTimeString(), // Heure actuelle du commentaire
                                  responses: [], // Initialiser un tableau vide pour les réponses
                              },
                          ],
                      }
                    : item // Retourner les autres éléments sans modification
            )
        );
        setNewComment(""); // Réinitialiser le champ d'entrée du commentaire
    }
};


// Fonction pour ajouter une réponse imbriquée à un commentaire spécifique
const handleAddResponse = (path: string) => {
    if (newReply.trim()) {
        const pathArray = path.split("-").map(Number); // Convertir le chemin en un tableau d'indices

        setData((prev) =>
            // Parcourir les éléments existants pour trouver celui à modifier
            prev.map((item, itemIndex) => {
                if (itemIndex === pathArray[0]) {
                    const updatedComments = [...item.comments]; // Copier les commentaires existants

                    // Fonction récursive pour parcourir les niveaux imbriqués de réponses
                    const addNestedResponse = (comments: Comment[], indices: number[]) => {
                        const currentIndex = indices[0]; // Index actuel
                        if (indices.length === 1) {
                            // Ajouter la réponse si elle n'existe pas déjà
                            if (
                                !comments[currentIndex].responses.some(
                                    (res) => res.text === newReply
                                )
                            ) {
                                comments[currentIndex].responses.push({
                                    text: newReply, // Texte de la réponse
                                    timestamp: new Date().toLocaleTimeString(), // Heure actuelle de la réponse
                                    responses: [], // Initialiser un tableau vide pour les réponses imbriquées
                                });
                            }
                        } else {
                            // Appel récursif pour descendre au niveau suivant
                            addNestedResponse(
                                comments[currentIndex].responses,
                                indices.slice(1)
                            );
                        }
                    };

                    addNestedResponse(updatedComments, pathArray.slice(1)); // Ajouter la réponse
                    return { ...item, comments: updatedComments }; // Retourner l'élément mis à jour
                }
                return item; // Retourner les autres éléments sans modification
            })
        );

        setNewReply(""); // Réinitialiser le champ d'entrée de la réponse
        setReplyIndex(null); // Réinitialiser l'index de la réponse en cours
    }
};

// Fonction pour afficher les réponses imbriquées dans une arborescence
const renderResponses = (responses: Comment[], path: string) => (
    <div className="ml-5 border-l-2 pl-3">
        {responses.map((response, index) => {
            const currentPath = `${path}-${index}`; // Générer le chemin actuel pour cette réponse
            return (
                <div key={currentPath} className="mb-3">
                    {/* Afficher le texte de la réponse et le temps écoulé */}
                    <div className="justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-white mb-1">
                                {response.text}
                            </p>
                            <span className="text-xs text-gray-500">
                                {calculateTimeAgo(response.timestamp)} {/* Calculer et afficher le temps écoulé */}
                            </span>
                        </div>
                        {/* Bouton pour permettre à l'utilisateur de répondre à cette réponse */}
                        <button
                            onClick={() => setReplyIndex(currentPath)}
                            className="text-xs text-primary dark:text-white"
                        >
                            Répondre
                        </button>
                    </div>
                    {/* Afficher un champ de texte si l'utilisateur répond à cette réponse */}
                    {replyIndex === currentPath && (
                        <div className="ml-5 mt-3">
                            <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Répondre..."
                                className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                            ></textarea>
                            <button
                                onClick={() => handleAddResponse(currentPath)}
                                className="mt-2 px-4 py-1 bg-primary text-white dark:text-white rounded-md"
                            >
                                Envoyer
                            </button>
                        </div>
                    )}

                    {/* Appel récursif pour afficher les réponses imbriquées */}
                    {renderResponses(response.responses, currentPath)}
                </div>
            );
        })}
    </div>
);    useEffect(() => {
        dispatch(incrementViews());
    }, [dispatch]);


    return (
        <div className="col-span-12 rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
            {data.map((item, itemIndex) => (
                <div
                    key={item.id}
                    className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark mb-3"
                >
                    <div className="w-full mb-5">
                        <h1 className="font-semibold text-primary text-2xl">{item.titre}</h1>
                        <p className="text-sm font-medium text-black dark:text-white">{item.lieu}</p>
                        <p className="text-sm font-medium text-gray-500 dark:text-white">
                            le {item.dateEvenement}
                        </p>
                    </div>

                    <div className="mb-5 h-auto overflow-hidden">
                        <StandardImageList images={item.pathImages} />
                    </div>

                    <div className="flex justify-between items-center mb-5 flex-wrap md:flex-nowrap">
                        <div className="flex items-center space-x-4 text-xs sm:text-sm">
                            <span className="font-medium text-gray-600 dark:text-white">
                                {item.comments.length} Commentaire{item.comments.length > 1 ? "s" : ""}
                            </span>
                            <span className="font-medium text-gray-600 dark:text-white">
                                {/* {item.likes} J'aime */}
                                {views.toLocaleString()} Vue{views > 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleLike(item.id)}
                                className="p-1 sm:p-2 gap-1 flex items-center hover:bg-gray-200 rounded"
                            >
                                <ThumbsUp
                                    color={item.isLiked ? "blue" : "gray"}
                                    size={12}
                                    className="sm:size-5"
                                />
                                <span
                                    className={`text-xs dark:text-white sm:text-sm font-medium ${item.isLiked ? "text-blue-500" : "text-gray-600"
                                        }`}
                                >
                                    J'aime
                                </span>
                            </button>

                            <button
                                onClick={() => handleShare("facebook", item)}
                                className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                            >
                                <FaFacebook size={14} className="sm:size-5" color="blue" />
                            </button>
                            <button
                                onClick={() => handleShare("twitter", item)}
                                className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                            >
                                <FaTwitter size={14} className="sm:size-5" color="#1DA1F2" />
                            </button>
                            <button
                                onClick={() => handleShare("linkedin", item)}
                                className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                            >
                                <FaLinkedin size={14} className="sm:size-5" color="#0077B5" />
                            </button>
                            <button
                                onClick={() => handleShare("whatsapp", item)}
                                className="hover:bg-gray-200 p-1 sm:p-2 rounded"
                            >
                                <FaWhatsapp size={14} className="sm:size-5" color="#25D366" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Écrivez un commentaire..."
                            className="w-full border rounded-md p-3 text-sm dark:border-strokedark dark:bg-boxdark dark:text-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                        <button
                            onClick={() => handleAddComment(item.id)}
                            className="flex mt-2 gap-1 px-4 py-2 dark:text-white bg-primary text-white rounded-md"
                        >
                            Envoyer <Send color="white" size={15} className="mt-2" />
                        </button>
                    </div>
                    <div className="mt-5">
                        {item.comments.map((comment, idx) => (

                            <div key={idx} className="mb-4">

                                <div className="items-start mb-2">

                                    <p className="text-sm text-gray-700 dark:text-white mr-3">{comment.text}</p>
                                    <span className="text-xs text-gray-500">{calculateTimeAgo(comment.timestamp)}</span>
                                    <div className="mr-5"> 
                                    <button
                                        onClick={() => setReplyIndex(`${itemIndex}-${idx}`)}
                                        className="text-xs text-primary dark:text-white"
                                    >
                                        Répondre
                                    </button>
                                    </div>
                                </div>

                                {replyIndex === `${itemIndex}-${idx}` && (
                                    <div className="ml-10 mt-3">
                                        <textarea
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                            placeholder="Répondre..."
                                            className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        ></textarea>
                                        <button
                                            onClick={() => handleAddResponse(`${itemIndex}-${idx}`)}
                                            className="mt-2 px-4 py-1 bg-primary text-white dark:text-white rounded-md"
                                        >
                                            Envoyer
                                        </button>
                                    </div>
                                )}

                                {/* Rendering nested responses */}
                                <div className="ml-10 mt-3">
                                    {renderResponses(comment.responses, `${itemIndex}-${idx}`)}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Seminaire;
