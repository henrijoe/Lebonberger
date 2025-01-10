import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from '@mui/material/Link';
import youtube from '../../images/logo/yutube.jpg';



const Reportage: React.FC = () => {

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-medium font-semibold text-black dark:text-white">
            Formation le bon berger
          </h4>
        </div>
      </div>

      <div>

        <div className="relative -mb-1 flex justify-center items-center">

          {/* Toutes les vidéos n'affichent pas leur image  */}
          {/* Pour la lecture de la video sur le site ajoute (?autoplay=1) a la fin de l'url */}
          
          {/* <iframe
            className="flex justify-center items-center w-full h-[200px] sm:h-[350px] lg:h-[400px]"
            src="https://www.youtube.com/embed/07_ldQ3KYIs"
            // src="https://www.youtube.com/embed/07_ldQ3KYIs"
            title=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>  */}
         

          {/* je vais supprimer ça après */}
          <Link target="_blank" href="https://www.youtube.com/watch?v=07_ldQ3KYIs">
            <img src={youtube} alt='' />
          </Link>

          {/* juste pour naviue vers la chaine youtube  */}
          <a
            href="https://www.youtube.com/watch?v=07_ldQ3KYIs"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
          >
            {/* Superposition transparente pour capturer le clic */}
          </a>
          
        </div>

        {/* Informations supplémentaires */}


        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            Suivez-nous sur nos différents réseaux pour plus de vidéos et d'informations !
          </p>
          <div className="flex justify-center items-center gap-6 mt-3">
            <a
              href="https://web.facebook.com/profile.php?id=61550814381396&locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebook size={24} className="text-blue-600 hover:text-blue-800" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaTwitter size={24} className="text-blue-400 hover:text-blue-600" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram size={24} className="text-pink-500 hover:text-pink-700" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin size={24} className="text-blue-700 hover:text-blue-900" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaYoutube size={24} className="text-red-600 hover:text-red-800" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportage;
