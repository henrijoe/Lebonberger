import React, { useState } from 'react';
import img1 from '../../images/formation/pasteur.jpg';


const dataTemoignage = {
  idTemoignage: 1,
  titreTemoignage: "Temoignage de l'application le bon berger",
  lieuTemoignage: "Église Évangélique des assemblées de Dieu de Port Bouet 2",
  dateTemoignage: '01 Septembre 2024',
  pathImageTemoignage: img1,
  descriptionTemoignage: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker. Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du De Finibus Bonorum et Malorum (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l'éthique. Les premières lignes du Lorem Ipsum, Lorem ipsum dolor sit amet proviennent de la section 1.10.32.L'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du De Finibus Bonorum et Malorum de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).",
  auteur: "Gbogbo ruffin",
  temoigneur: "Pasteur Djah Nicaise",
}


const ReadMoreText: React.FC<{ text: string; maxLength: number }> = ({ text, maxLength }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  if (text.length <= maxLength) {
    return <p className="text-sm font-medium text-black dark:text-white">{text}</p>;
  }

  return (
    <p className="text-sm font-medium text-black dark:text-white">
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button
        onClick={toggleReadMore}
        className="text-blue-500 font-medium ml-1 hover:underline"
      >
        {isExpanded ? "Lire moins" : "Lire la suite"}
      </button>
    </p>
  );
};


const Temoignage: React.FC = () => {

  return (
    <div className="flex flex-col xl:flex-row col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default gap-5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 h-auto">
      {/* Image */}
      <div className="w-full h-auto">
        <img
          alt="lebonberger"
          className="rounded-t-md w-full object-cover h-[300px] sm:h-[450px]"
          src={dataTemoignage.pathImageTemoignage}
        />
      </div>

      {/* Texte */}
      <div className="w-full h-auto flex flex-col justify-between gap-5 mt-5 xl:mt-0">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <div className="flex min-w-47.5">
              {/* <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
              </span> */}
              <div className="w-full">
                <p className="font-semibold text-primary text-xs ">Publié le</p>
                <p className="text-sm font-medium">{dataTemoignage.dateTemoignage}</p>
                <p className="text-sm font-medium">{dataTemoignage.lieuTemoignage}</p>
              </div>
            </div>
            <div className="flex min-w-47.5">
              {/* <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
              </span> */}
              <div className="w-full">
                <p className="font-semibold text-black text-2xl w-full dark:text-white">{dataTemoignage.titreTemoignage}</p>
                <ReadMoreText text={dataTemoignage.descriptionTemoignage} maxLength={400} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Temoignage;
