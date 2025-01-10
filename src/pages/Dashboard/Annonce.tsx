import React, { useState } from 'react';
import { FaBook, FaBullhorn, FaMobileAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const eventData = [
    {
        title: "Événement 1: Conférence",
        content: "Participez à notre conférence annuelle sur la gestion spirituelle et le leadership.",
        location: "Abidjan - Yopougon, Eglise Evangélique des Assemblées de Dieu Andokoi",
        date: "15 janvier 2025",
    },
    {
        title: "Événement 2: Atelier de formation",
        content: "Rejoignez-nous pour un atelier pratique sur la gestion des ressources communautaires.",
        location: "Bouaké, Eglise Evangélique des Assemblées de Dieu d'Angré",
        date: "20 février 2025",
    },
    {
        title: "Événement 3: Séminaire",
        content: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du De Finibus Bonorum et Malorum (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, Lorem ipsum dolor sit amet proviennent de la section 1.10.32.L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du De Finibus Bonorum et Malorum de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).",
        location: "Yamoussoukro, Côte d'Ivoire",
        date: "10 mars 2025",
    },
];

const Annonce: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="flex flex-col col-span-12 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            {/* Conteneur principal en flex */}

            <div className="flex flex-col md:flex-row w-full gap-4 mb-6">
                {/* Icône de mégaphone */}
                <div className="flex justify-center items-center w-full md:w-2/5">
                    <FaBullhorn
                        size={200}
                        className="text-yellow-500 md:mr-4"
                    />
                </div>

                {/* Accordéon pour les événements */}
                <div className="flex flex-col w-full md:w-3/5 relative bg-white p-6 rounded-lg shadow-lg border border-gray-300 dark:bg-boxdark dark:border-strokedark hover:scale-105 hover:shadow-xl transition-transform duration-300">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-3 text-center">
                        Programmes à venir
                    </h4>
                    <div>
                        {eventData.map((event, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full text-left font-semibold text-lg text-gray-700 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                >
                                    {event.title}
                                </button>
                                {activeIndex === index && (
                                    <div
                                        className="mt-2 text-sm text-gray-600 dark:text-gray-300 px-4 max-h-40 overflow-y-auto"
                                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#a1a1a1 transparent' }}
                                    >
                                        <p>{event.content}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <FaMapMarkerAlt className="text-red-500" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <FaCalendarAlt className="text-green-500" />
                                            <span>{event.date}</span>
                                        </div>
                                    </div>
                                )}
                                <hr className="border-t border-dashed border-gray-300 dark:border-gray-600 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="border-t border-dashed border-gray-300 dark:border-gray-600 mb-6" />

            {/* Liens */}
            <div className="flex flex-col gap-1 mt-3">
                {/* Titre */}
                <h5 className="text-lg font-semibold text-black dark:text-white text-center mb-2">
                    Nos liens de téléchargements 
                </h5>

                {/* Liens */}
                <a
                    href="https://play.google.com/store/apps/details?id=com.lebonberger.lebonberger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-white underline py-1 px-2 rounded-lg hover:text-blue-800"
                >
                    <FaMobileAlt size={20} />
                    Télécharger l'application Lebonberger sur Play store et App store
                </a>
                <a
                    href="https://example.com/order-book"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-white underline py-1 px-2 rounded-lg hover:text-blue-800"
                >
                    <FaBook size={20} />
                    Commander un livre 
                </a>
            </div>
        </div>
    );
};

export default Annonce;
