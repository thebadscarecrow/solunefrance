window.addEventListener('load', () => {
    const formulaire = document.querySelector('.js-form');
    const prenoms = formulaire.querySelector('.js-firstname');
    const nomPere = formulaire.querySelector('.js-father-name');
    const nomMere = formulaire.querySelector('.js-mother-name');
    const dateNaissance = formulaire.querySelector('.js-birthdate');
    formulaire.addEventListener("submit", (event) => { 
        calculerCheminVie(normaliserEntree(prenoms.value), normaliserEntree(nomPere.value), normaliserEntree(nomMere.value), dateNaissance.value);
    });
    
    
});

const lettres = [
    ['a', 'j', 's', 'é', 'è', 'ê', 'ç'], 
    ['b', 'k', 't', 'ö'], 
    ['c', 'l', 'u', 'ù', 'ú', 'û'], 
    ['d', 'm', 'v'], 
    ['e', 'n', 'w', 'î', 'ë'], 
    ['f', 'o', 'x', 'ô', 'ä'],
    ['g', 'p', 'y'],
    ['h', 'q', 'z', 'ü'],
    ['i', 'r', 'à', 'â', 'ï']
];

const pierres = ['Quartz rose', 'Jaspe rouge', 'Calcédoine', 'Jade', 'Émeraude', 'Grenat', 'Citrine', 'Obstidienne', 'Aigue marine', 'Rhodochrosite', 'Cornaline', 'Ambre', 'Hématite', 'Améthyste', 'Malachite', 'Opale', 'Turquoise', 'Pierre de lune', 'Topaze', 'Lapis lazuli', 'Tourmaline', 'Cristal de rose', 'Azurite', 'Amazonite', 'Œil de tigre', 'Pyrite', 'Fluorite', 'Perle', 'Sodalite', 'Quartz fumé', 'Soufre', 'Mercure', 'Sel'];

/**
 * Remplace les caractères spéciaux et met en minuscule une chaîne de caractères.
 * Transformation des œ en oe, des æ en ae et suppression des tirets cadratin et demi-cadratin.
 * @param {array} chaine La chaîne de caractères à normaliser.
 * @returns La chaîne de caractères normalisée.
 */
function normaliserEntree(chaine) {
    return chaine.toLowerCase().replace('œ', 'oe').replace('æ', 'ae').replace('-', '').replace('—', '');
}

/**
 * Calcule les différentes pierres associées au chemin de vie.
 * @param {string} prenoms Les prénoms.
 * @param {string} nomPere Le nom du père.
 * @param {string} nomMere Le nom de la mère.
 * @param {string} dateNaissance La date de naissance.
 */
function calculerCheminVie(prenoms, nomPere, nomMere, dateNaissance) {
    const pierreBase = calculerPierreBase(prenoms, nomPere, nomMere);
    console.log(`Pierre base : ${pierreBase}`); // attendu : 17
    const pierreSommet = calculerPierreSommet(prenoms, nomPere, nomMere);
    console.log(`Pierre sommet : ${pierreSommet}`); // attendu : 10
    const pierreCheminVie = calculerPierreCheminVie(dateNaissance);
    console.log(`Pierre chemin de vie : ${pierreCheminVie}`); // attendu : 5
    const pierreAppel = calculerPierreAppel(prenoms, nomPere, nomMere);
    console.log(`Pierre appel : ${pierreAppel}`); // attendu : 12
    const pierrePersonnalite = calculerPierrePersonnalite(prenoms, nomPere, nomMere);
    console.log(`Pierre personnalité : ${pierrePersonnalite}`); // attendu : 10
    const pierreExpression = calculerPierreExpression(pierreAppel, pierrePersonnalite);
    console.log(`Pierre expression : ${pierreExpression}`); // attendu : 4
    const pierreTouche = calculerPierreTouche(pierreBase, pierreSommet, pierreAppel, pierrePersonnalite, pierreExpression);
    console.log(`Pierre touche : ${pierreTouche}`); // attendu : 7
    const pierreVoeu = calculerPierreVoeu(prenoms, nomPere, nomMere);
    console.log(`Pierre vœu : ${pierreVoeu}`); // attendu : 14
}

/**
* Calcule la pierre de base (les premières lettres des prénoms et noms).
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre de base.
*/
function calculerPierreBase(prenoms, nomPere, nomMere) {
    let premieresLettres = [];
    prenoms.split(/[\s,_;/]+/).forEach(prenom => {
        premieresLettres.push(prenom[0]);
    });
    premieresLettres.push(nomPere[0]);
    premieresLettres.push(nomMere[0]);
    return calculerLettres(premieresLettres);
}

/**
* Calcule la pierre de sommet (les dernières lettres des prénoms et noms).
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre de sommet.
*/
function calculerPierreSommet(prenoms, nomPere, nomMere) {
    let dernieresLettres = [];
    prenoms.split(/[\s,\-_;/]+/).forEach(prenom => {
        dernieresLettres.push(prenom.slice(-1));
    });
    dernieresLettres.push(nomPere.slice(-1));
    dernieresLettres.push(nomMere.slice(-1));
    return calculerLettres(dernieresLettres);
}

/**
 * Calcule la pierre du chemin de vie (la somme réduite du jour, mois et année de naissance).
 * @param {Date} dateNaissance La date de naissance.
 * @returns La somme correspondant à la pierre du chemin de vie.
 */
function calculerPierreCheminVie(dateNaissance) {
    const jour = new Date(dateNaissance).getDate();
    const sommeJour = calculerSommeReduite10(jour);
    const mois = new Date(dateNaissance).getMonth() + 1;
    const sommeMois = calculerSommeReduite10(mois);
    const annee = new Date(dateNaissance).getFullYear();
    const sommeAnnee = calculerSommeReduite10(annee);
    const somme = `${sommeJour}${sommeMois}${sommeAnnee}`;
    return calculerSommeReduite10(Number(somme));
}

/**
 * Calcule la pierre d'appel (le total des voyelles des prénoms et noms).
 * @param {string} prenoms Les prénoms.
 * @param {string} nomPere Le nom du père.
 * @param {string} nomMere Le nom de la mère.
 * @returns La somme correspondant à la pierre d'appel.
 */
function calculerPierreAppel(prenoms, nomPere, nomMere) {
    const regexVoyelles = /[aeiouyàâäéèêëîïôöùûüú]/g;
    let sommePrenoms = 0;
    prenoms.split(/[\s,\-_;/]+/).forEach(prenom => {
        sommePrenoms += calculerLettresRegex(prenom, regexVoyelles);
    });
    const sommeNomPere = calculerLettresRegex(nomPere, regexVoyelles);
    const sommeNomMere = calculerLettresRegex(nomMere, regexVoyelles);
    const somme = sommePrenoms + sommeNomPere + sommeNomMere;
    return calculerSommeReduite33(somme);
}


/**
 * Calcule la pierre de personnalité (le total des consonnes des prénoms et noms).
 * @param {string} prenoms Les prénoms.
 * @param {string} nomPere Le nom du père.
 * @param {string} nomMere Le nom de la mère.
 * @returns La somme correspondant à la pierre de personnalité.
 */
function calculerPierrePersonnalite(prenoms, nomPere, nomMere) {
    let sommePrenoms = 0;
    const regexConsonnes = /[bcdfghjklmnpqrstvwxz]/g;
    prenoms.split(/[\s,\-_;/]+/).forEach(prenom => {
       sommePrenoms += calculerLettresRegex(prenom, regexConsonnes)
    });
    const sommeNomPere = calculerLettresRegex(nomPere, regexConsonnes);
    const sommeNomMere = calculerLettresRegex(nomMere, regexConsonnes);
    const somme = sommePrenoms + sommeNomPere + sommeNomMere; 
    return calculerSommeReduite33(somme);
}

/**
 * Calcule la pierre d'expression (la somme réduite de la pierre d'appel et de la pierre de personnalité).
 * @param {number} pierreAppel La pierre d'appel.
 * @param {number} pierrePersonnalite La pierre de personnalité.
 * @returns La somme correspondant à la pierre d'expression.
 */
function calculerPierreExpression(pierreAppel, pierrePersonnalite) {
    const somme = pierreAppel + pierrePersonnalite;
    return calculerSommeReduite10(somme);
}

/**
 * Calcule la pierre de touche (la somme réduite de la pierre de base, de la pierre de sommet, de la pierre d'appel, de la pierre de personnalité et de la pierre d'expression).
 * @param {number} pierreBase La pierre de base.
 * @param {number} pierreSommet La pierre de sommet.
 * @param {number} pierreAppel La pierre d'appel.
 * @param {number} pierrePersonnalite La pierre de personnalité.
 * @param {number} pierreExpression La pierre d'expression.
 * @returns La somme correspondant à la pierre de touche.
 */
function calculerPierreTouche(pierreBase, pierreSommet, pierreAppel, pierrePersonnalite, pierreExpression) {
    const somme = pierreBase + pierreSommet + pierreAppel + pierrePersonnalite + pierreExpression;
    return calculerSommeReduite33(somme);
}

/**
 * Calcule la pierre de vœu (la somme réduite des premières voyelles des prénoms et noms).
 * @param {string} prenoms Les prénoms.
 * @param {string} nomPere Le nom du père.
 * @param {string} nomMere Le nom de la mère.
 * @returns La somme correspondant à la pierre de vœu.
 */
function calculerPierreVoeu(prenoms, nomPere, nomMere) {
    const regexVoyelles = /[aeiouyàâäéèêëîïôöùûüú]/g;
    let sommePrenoms = 0;
    prenoms.split(/[\s,_;/]+/).forEach(prenom => {
        sommePrenoms += calculerPremieresLettresRegex(prenom, regexVoyelles);
    });
    const sommeNomPere = calculerPremieresLettresRegex(nomPere, regexVoyelles);
    const sommeNomMere = calculerPremieresLettresRegex(nomMere, regexVoyelles);
    const somme = sommePrenoms + sommeNomPere + sommeNomMere; 
    return calculerSommeReduite33(somme);
}

/**
 * Calcule la somme des premières lettres correspondant à une regex.
 * @param {string} mot Le mot à analyser.
 * @param {string} regex La regex à utiliser.
 * @returns La somme des premières lettres correspondant à la regex.
 */
function calculerPremieresLettresRegex(mot, regex) {
    let lettres = [];
    const match = mot.match(regex);
    if (match) {
        lettres.push(match[0]);
    }
    return calculerLettres(lettres);
}

/**
 * Calcule la somme des lettres correspondant à une regex.
 * @param {string} mot Le mot à analyser.
 * @param {string} regex La regex à utiliser.
 * @returns La somme des lettres correspondant à la regex.
 */
function calculerLettresRegex(mot, regex) {
    let lettres = [];
    const match = mot.match(regex);
    if (match) {
        lettres.push(...match);
    }
    return calculerLettres(lettres);
}

/**
* Calcule la somme des lettres.
* @param {array} lettresSaisies Les lettres saisies.
* @returns La somme des lettres.
*/
function calculerLettres(lettresSaisies) {
    let somme;
    lettresSaisies.forEach(lettreSaisie =>
        lettres.forEach(function callback(array, indexLettres) {
            const trouve = array.find((lettre) => lettre === lettreSaisie);
            if (trouve) {
                if (!somme) {
                    somme = indexLettres + 1;
                } else {
                    somme += indexLettres + 1;
                }
            }
        }));
        return somme;
}

/**
 * Calcule la somme réduite d'un nombre si celui-ci est inférieur à 10.
 * @param {number} nombre Le nombre à réduire.
 * @returns La somme réduite.
 */
function calculerSommeReduite10(nombre) {
  return calculerSommeReduite(nombre, 10);
}  

/**
 * Calcule la somme réduite d'un nombre si celui-ci est inférieur à 33.
 * @param {number} nombre Le nombre à réduire.
 * @returns La somme réduite.
 */
function calculerSommeReduite33(nombre) {
  return calculerSommeReduite(nombre, 33);
}  

/**
 * Calcule la somme réduite d'un nombre.
 * @param {number} nombre Le nombre à réduire.
 * @param {number} limite La limite en dessous de laquelle on arrête la réduction.
 * @returns La somme réduite.
 */
function calculerSommeReduite(nombre, limite) {
  if (nombre < limite) return nombre;
  const somme = nombre.toString().split('').reduce((a, b) => a + Number(b), 0);
  return calculerSommeReduite(somme, limite);
}