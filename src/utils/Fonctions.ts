
export const  formatDateToday = () => {
    const jours = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const mois = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
  
    const today = new Date();
    const jourSemaine = jours[today.getDay()];
    const jour = today.getDate();
    const moisAbrege = mois[today.getMonth()];
    const annee = today.getFullYear();
  
    return `${jourSemaine} ${jour} ${moisAbrege} ${annee}`;
  }
  
  console.log(formatDateToday());


  export const calculateTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);
  
    const intervals: { [key: string]: number } = {
      an: 31536000,
      mois: 2592000,
      semaine: 604800,
      jour: 86400,
      heure: 3600,
      minute: 60,
    };
  
    for (const [unite, valeur] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / valeur);
      if (interval >= 1) {
        if (unite === "mois" || unite === "minute" || unite === "heure") {
          return `${interval} ${unite}${interval > 1 ? "s" : ""}`;
        } else {
          return `${interval} ${unite}${interval > 1 ? "s" : ""}`;
        }
      }
    }
  
    return "à l'instant";
  };
  
  