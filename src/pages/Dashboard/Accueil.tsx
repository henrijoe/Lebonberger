import React from 'react';
import _ from "lodash";

import Seminaire from './seminaires';
import Temoignage from './Temoignage';
import Reportage from './reportage';
import Annonce from './Annonce';



const Accueil: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-4 2xl:gap-5.5">
        <Seminaire />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-2 md:mt-6 md:gap-4 2xl:mt-7.5 2xl:gap-5.5">
        <Temoignage />
        <Reportage />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2 xl:grid-cols-4 2xl:gap-5.5">
        <Annonce />
      </div>
    </>
  );
};

export default Accueil;
