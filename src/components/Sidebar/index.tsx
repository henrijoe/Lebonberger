import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logoParfait.png';


import { AiOutlineHome, AiOutlineBook } from "react-icons/ai";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  // Importation de `useLocation` pour obtenir l'objet de localisation actuel
  // `pathname` est extrait pour obtenir le chemin actuel de l'application.
  const location = useLocation();
  const { pathname } = location;

  // Références pour des éléments DOM qui seront manipulés :
  // `trigger` pour le bouton ou élément déclencheur, et `sidebar` pour la barre latérale.
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // Récupération de l'état de la barre latérale dans `localStorage`.
  // Si aucune valeur n'est trouvée, l'état par défaut sera "fermé" (`false`).
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // Effet pour gérer les clics à l'extérieur de la barre latérale.
  // Si un clic est effectué en dehors de la barre latérale ou de son déclencheur, la barre est fermée.
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      // Vérifie si les références `sidebar` ou `trigger` existent.
      if (!sidebar.current || !trigger.current) return;

      // Si la barre latérale est déjà fermée, ou si le clic est à l'intérieur de la barre ou du déclencheur, ne rien faire.
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;

      // Ferme la barre latérale.
      setSidebarOpen(false);
    };

    // Ajoute un écouteur d'événement pour capturer les clics.
    document.addEventListener('click', clickHandler);

    // Nettoie l'écouteur lorsqu'il n'est plus nécessaire.
    return () => document.removeEventListener('click', clickHandler);
  });

  // Effet pour gérer la fermeture de la barre latérale avec la touche `Échap`.
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      // Si la barre latérale est fermée ou si la touche pressée n'est pas `Échap` (code 27), ne rien faire.
      if (!sidebarOpen || keyCode !== 27) return;

      // Ferme la barre latérale.
      setSidebarOpen(false);
    };

    // Ajoute un écouteur d'événement pour détecter les pressions de touche.
    document.addEventListener('keydown', keyHandler);

    // Nettoie l'écouteur lorsqu'il n'est plus nécessaire.
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // Effet pour synchroniser l'état de la barre latérale (`sidebarExpanded`) avec le stockage local et le DOM.
  // Ajoute ou retire une classe CSS sur le `body` selon l'état de la barre latérale.
  useEffect(() => {
    // Sauvegarde l'état de la barre latérale dans `localStorage`.
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());

    // Ajoute ou retire la classe `sidebar-expanded` sur le `body` pour gérer les styles CSS dynamiques.
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]); // Déclenche cet effet chaque fois que `sidebarExpanded` change.

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="flex items-center space-x-4">
          {/* <img  src={Logo} alt="Logo" /> */}
          <img
            className="rounded-full w-10 h-10 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-10 lg:h-10"
            src={Logo}
            alt="Logo"
          />
          <p className="text-white text-14">LEBONBERGER</p>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}


      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">

              {/* <!-- Menu Item Acceuil --> */}
              <hr className="border-t border-solid border-gray-300 dark:border-gray-600 mt-2" />

              <li>
                <NavLink
                  to="/accueil"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('accueil') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <AiOutlineHome className="text-lg" />
                  Accueil
                </NavLink>
              </li>
              <hr className="border-t border-solid border-gray-300 dark:border-gray-600 mt-2" />
              <li>
                <NavLink
                  to="/formation"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('formation') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <AiOutlineBook className="text-lg" />
                  Formations
                </NavLink>
              </li>
              <hr className="border-t border-solid border-gray-300 dark:border-gray-600 mt-2" />
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
