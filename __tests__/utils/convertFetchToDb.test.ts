import _ from 'lodash'
import { UserSports } from '../../src/models/sportsSlotsFetch.model'
import { sportsRegistrationsFetchToReservationsDb } from '../../src/utils/convertFetchToDb'

describe('Convert fetched data from UNSport API to DB', () => {
  const fetchedUnsport: UserSports = {
    code: '',
    civility: '',
    name: '',
    firstname: '',
    email: '',
    birthDate: '',
    composante: '',
    departement: '',
    typePersonne: '',
    estBoursier: true,
    montantPaiement: 0,
    paiementEffectue: true,
    sports: [{
      code: 2,
      categorie: {
        code: 33,
        nom: 'Sports de Raquettes',
        picto: 'ca-sports-raquettes',
        image: 'raquettes.jpg',
        couleur: '#d87168'
      },
      registrations: [],
      creneaux: [{
        site: 'CHANTRERIE',
        places: 28,
        code: 590,
        jour: 'Mercredi',
        encadrant: 'Samuel LE GUILLOU',
        heures: '20h00 - 21h30',
        localisation: 'Ecole Polytech\u0027 - Gymnase',
        adresse: 'Rue Christian Pauc\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 28
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 580,
        jour: 'Mercredi',
        encadrant: 'Pierre-Gilles GUITTON',
        heures: '19h00 - 20h30',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 50
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 575,
        jour: 'Mardi',
        encadrant: 'Virginie TESSIER',
        heures: '17h30 - 18h45',
        localisation: 'Stadium Pierre Quinon - Salle Milliat',
        adresse: '19 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 35
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 576,
        jour: 'Mardi',
        encadrant: 'Virginie TESSIER',
        heures: '18h45 -20h00 ',
        localisation: 'Stadium Pierre Quinon - Salle Milliat',
        adresse: '19 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 14
      }, {
        site: 'CHANTRERIE',
        places: 28,
        code: 573,
        jour: 'Mardi',
        encadrant: 'Samuel LE GUILLOU',
        heures: '20h00 - 21h30',
        localisation: 'Ecole Polytech\u0027 - Gymnase',
        adresse: 'Rue Christian Pauc\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 23
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 588,
        jour: 'Jeudi',
        encadrant: 'Pierre ROLLAND',
        heures: '14h00 - 15h45',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 66
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 589,
        jour: 'Jeudi',
        encadrant: 'Pierre ROLLAND',
        heures: '15h45 - 17h15',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 66
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 574,
        jour: 'Samedi',
        encadrant: 'Freddy PONTOREAU',
        heures: '10h00 - 12h00',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 66
      }, {
        site: 'CARQUEFOU',
        places: 0,
        code: 571,
        jour: 'Jeudi',
        encadrant: '',
        heures: '12h00 - 14h00',
        localisation: 'Souchais - gymnase',
        adresse: '1 avenue de la Loire\r\n44470 CARQUEFOU',
        niveau: 'accès libre',
        placesRestantes: 0
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 581,
        jour: 'Vendredi',
        encadrant: 'Encadrant',
        heures: '19h30 - 21h00',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tous niveaux',
        placesRestantes: 66
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 962,
        jour: 'Mercredi',
        encadrant: 'Julien MILLET',
        heures: '12h30 - 14h00',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 60
      }, {
        site: 'TERTRE PETIT PORT',
        places: 66,
        code: 676,
        jour: 'Mercredi',
        encadrant: 'Pierre-Gilles GUITTON',
        heures: '20h30 - 23h00',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: 'Tournois',
        placesRestantes: 57
      }, {
        site: 'ST NAZAIRE',
        places: 0,
        code: 679,
        jour: 'Lundi',
        encadrant: 'Erwan COCAUD',
        heures: '18h00 - 20h00',
        localisation: 'Gymnase Heinlex ',
        adresse: '',
        niveau: '',
        placesRestantes: 0
      }, {
        site: 'ST NAZAIRE',
        places: 0,
        code: 680,
        jour: 'Jeudi',
        encadrant: 'Mathieu FAILLER',
        heures: '12h30 - 14h00',
        localisation: 'Gymnase Heinlex ',
        adresse: '',
        niveau: '',
        placesRestantes: 0
      }, {
        site: 'LA ROCHE SUR YON',
        places: 0,
        code: 720,
        jour: 'Lundi',
        encadrant: 'Maël GUERINEAU',
        heures: '12h15 - 13h45',
        localisation: 'Salle de La Courtaisière',
        adresse: '',
        niveau: '',
        placesRestantes: 0
      }, {
        site: 'LA ROCHE SUR YON',
        places: 0,
        code: 728,
        jour: 'Mardi',
        encadrant: 'Maël GUERINEAU',
        heures: '18h00 - 19h30',
        localisation: 'Salle de La Courtaisière',
        adresse: '',
        niveau: '',
        placesRestantes: 0
      }],
      description: 'Avoir sa raquette.\r\nNombre de places limité, capacité d\u0027accueil gérée par l\u0027enseignant.\r\n\r\nLes jours et horaires sont susceptibles de changer en fonction des périodes de l\u0027année ( voir " infos de dernière minute "  et " dernières actualités " à l\u0027adresse suivante : www.univ-nantes.fr/sport ).',
      nom: 'Badminton'
    }, {
      code: 399,
      categorie: {
        code: 30,
        nom: 'Activité de la Forme',
        picto: 'ca-entretien-physique',
        image: 'entretien-physique.jpg',
        couleur: '#a1ced3'
      },
      registrations: [],
      creneaux: [{
        site: 'TERTRE PETIT PORT',
        places: 16,
        code: 762,
        jour: 'Mardi',
        encadrant: 'Tanguy COÏC',
        heures: '17h30 - 19h00',
        localisation: 'Halle du SUAPS - Salle polyvalente',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 15
      }, {
        site: 'TERTRE PETIT PORT',
        places: 16,
        code: 765,
        jour: 'Mardi',
        encadrant: 'Tanguy COIC',
        heures: '19h00 - 20h30',
        localisation: 'Halle du SUAPS - Salle polyvalente',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 12
      }, {
        site: 'TERTRE PETIT PORT',
        places: 16,
        code: 763,
        jour: 'Mercredi',
        encadrant: 'Luc PILLOT',
        heures: '18h00 - 20h00',
        localisation: 'Halle du SUAPS - Salle polyvalente',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 15
      }, {
        site: 'TERTRE PETIT PORT',
        places: 16,
        code: 760,
        jour: 'Jeudi',
        encadrant: 'Tanguy COÏC',
        heures: '17h30 - 19h00',
        localisation: 'Halle du SUAPS - Salle polyvalente',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 16
      }, {
        site: 'TERTRE PETIT PORT',
        places: 16,
        code: 764,
        jour: 'Jeudi',
        encadrant: 'Tanguy COÏC',
        heures: '12h30 - 14h00',
        localisation: 'Halle du SUAPS - Salle polyvalente',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 16
      }, {
        site: 'TERTRE PETIT PORT',
        places: 16,
        code: 761,
        jour: 'Jeudi',
        encadrant: 'Tanguy COÏC',
        heures: '19h00 - 20h30',
        localisation: 'Halle du SUAPS - Salle polyvalente',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 16
      }],
      description: 'Entrainement physique généralisé en enchaînant les ateliers. \r\nTravail cardio-respiratoire et des chaines musculaires importantes. \r\nUtilisation du poids de corps, du portique, des élastiques et des barres. \r\nFormation aux mouvements de force athlétique et d\u0027haltérophilie.\r\n\r\nLes jours et horaires sont susceptibles de changer en fonction des périodes de l\u0027année ( voir " infos de dernière minute "  et " dernières actualités " à l\u0027adresse suivante : www.univ-nantes.fr/sport ).',
      nom: 'Circuit training haltéro'
    }, {
      code: 28,
      categorie: {
        code: 336,
        nom: 'Activités de Pleine Nature',
        picto: 'ca-pleine-nature',
        image: 'pleine-nature.jpg',
        couleur: '#506e3b'
      },
      registrations: [{
        week: 8,
        registerCode: 'E181088K',
        tag: '043F2F0A945780',
        activity: {
          code: 776,
          jour: 'Mardi',
          horaire: '18h00 - 19h30',
          lieu: 'INSPE - Bloc'
        }
      }],
      creneaux: [{
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 788,
        jour: 'Jeudi',
        encadrant: 'Kévin GRARE',
        heures: '19h30 - 21h00',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 30
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 774,
        jour: 'Lundi',
        encadrant: 'Lionel LOGEROT',
        heures: '18h00 - 19h30',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 0
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 781,
        jour: 'Jeudi',
        encadrant: 'Kévin GRARE',
        heures: '15h30 - 17h30',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 30
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 775,
        jour: 'Lundi',
        encadrant: 'Lionel LOGEROT',
        heures: '19h30 - 21h00',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 0
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 778,
        jour: 'Jeudi',
        encadrant: 'Lionel LOGEROT',
        heures: '18h00 - 19h30',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 30
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 779,
        jour: 'Jeudi',
        encadrant: 'Lionel LOGEROT',
        heures: '19h30 - 21h30',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 30
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 783,
        jour: 'Mercredi',
        encadrant: 'Simon LELARDOUX',
        heures: '18h00 - 19h30',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 4
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 784,
        jour: 'Mercredi',
        encadrant: 'Simon LELARDOUX',
        heures: '19h30 - 21h30',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 13
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 785,
        jour: 'Mercredi',
        encadrant: 'Dimitri LAHAYE',
        heures: '18h00 - 19h30',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 20
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 786,
        jour: 'Mercredi',
        encadrant: 'Dimitri LAHAYE',
        heures: '19h30 - 21h00',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 23
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 776,
        jour: 'Mardi',
        encadrant: 'Gwendal JOUBIER',
        heures: '18h00 - 19h30',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 0
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 777,
        jour: 'Mardi',
        encadrant: 'Gwendal JOUBIER',
        heures: '19h30 - 21h00',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 2
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 782,
        jour: 'Mardi',
        encadrant: 'Lionel LOGEROT',
        heures: '12h30 - 14h00',
        localisation: 'Halle du SUAPS - Gymnase',
        adresse: '3 Boulevard Guy Mollet\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 5
      }, {
        site: 'CHANTRERIE',
        places: 24,
        code: 773,
        jour: 'Mardi',
        encadrant: 'Jérôme BEZIER',
        heures: '18h15 - 20h15',
        localisation: 'Ecole Polytech\u0027 - Gymnase',
        adresse: 'Rue Christian Pauc\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 12
      }, {
        site: 'CHANTRERIE',
        places: 24,
        code: 780,
        jour: 'Mercredi',
        encadrant: 'Jérôme BEZIER',
        heures: '18h15 - 20h15',
        localisation: 'Ecole Polytech\u0027 - Gymnase',
        adresse: 'Rue Christian Pauc\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 23
      }, {
        site: 'TERTRE PETIT PORT',
        places: 30,
        code: 787,
        jour: 'Jeudi',
        encadrant: 'Kévin GRARE',
        heures: '18h00 - 19h30',
        localisation: 'INSPE - Bloc',
        adresse: '4 Chemin Launay Violette\r\n44300 NANTES',
        niveau: '',
        placesRestantes: 30
      }, {
        site: 'ST NAZAIRE',
        places: 0,
        code: 685,
        jour: 'Lundi',
        encadrant: 'François DAUCHET',
        heures: '19h30 - 21h30',
        localisation: 'Gymnase de la Berthauderie',
        adresse: '',
        niveau: '',
        placesRestantes: 0
      }],
      description: 'Nombre de places limité géré par l\u0027enseignant. \r\n\r\nLes jours et horaires sont susceptibles de changer en fonction des périodes de l\u0027année ( voir " infos de dernière minute "  et " dernières actualités " à l\u0027adresse suivante : www.univ-nantes.fr/sport ).',
      nom: 'Escalade'
    }]
  }
  test('add Registrations as Reservations', () => {
    const slotIds = fetchedUnsport.sports.map(sport => sport.registrations.map(regist => regist.activity.code)).flat()

    // Check all reservations from slotId
    expect(
      _.isEqual(
        sportsRegistrationsFetchToReservationsDb(fetchedUnsport.sports)
          .map(({ slotId }) => slotId),
        slotIds
      )
    ).toBe(true)
  })
})
