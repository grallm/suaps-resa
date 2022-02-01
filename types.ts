export enum Jour {
  // eslint-disable-next-line no-unused-vars
  Jeudi = 'Jeudi',
  // eslint-disable-next-line no-unused-vars
  Lundi = 'Lundi',
  // eslint-disable-next-line no-unused-vars
  Mardi = 'Mardi',
  // eslint-disable-next-line no-unused-vars
  Mercredi = 'Mercredi',
  // eslint-disable-next-line no-unused-vars
  Samedi = 'Samedi',
  // eslint-disable-next-line no-unused-vars
  Vendredi = 'Vendredi',
}

export interface Activity {
  code: number;
  jour: Jour;
  horaire: string;
  lieu: string;
}

export interface Registration {
  week: number;
  registerCode: string;
  tag: string;
  activity: Activity;
}

export interface Creneau {
  site: string;
  places: number;
  code: number;
  jour: Jour;
  encadrant: string;
  heures: string;
  localisation: string;
  adresse: string;
  niveau: string;
  placesRestantes: number;
}

export interface Categorie {
  code: number;
  nom: string;
  picto: string;
  image: string;
  couleur: string;
}

export interface Sport {
  code: number;
  categorie: Categorie;
  registrations: Registration[];
  creneaux: Creneau[];
  description: string;
  nom: string;
}

export interface UserSports {
  code: string;
  civility: string;
  name: string;
  firstname: string;
  email: string;
  birthDate: string;
  estBoursier: boolean;
  composante: string;
  departement: string;
  typePersonne: string;
  montantPaiement: number;
  paiementEffectue: boolean;
  sports: Sport[];
}

export interface Reservation {
  id: number
  sportId: number
  slotId: number
  date: Date
  recurrent: boolean
}

export interface DBStructure {
  reservations: Reservation[]
  lastFetch: UserSports | null
}
