window.addEventListener('DOMContentLoaded', () => {
    const formulaire = document.querySelector('.js-form');
    const prenoms = formulaire.querySelector('.js-firstname');
    const nomPere = formulaire.querySelector('.js-father-name');
    const nomMere = formulaire.querySelector('.js-mother-name');
    const dateNaissance = formulaire.querySelector('.js-birthdate');
    formulaire.addEventListener("submit", (event) => { 
        try {
            calculerCheminVie(normaliserEntree(prenoms.value), normaliserEntree(nomPere.value), normaliserEntree(nomMere.value), dateNaissance.value);
            event.preventDefault(); // Ne pas réactualiser la page
        } catch (error) {
            console.error("Erreur :", error);
            event.preventDefault(); // Ne pas réactualiser la page
        }
       
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

const pierres = [
    ['Quartz rose','https://i.imgur.com/HhMWNtD.png'], 
    ['Jaspe rouge','https://i.imgur.com/1CcSkbI.jpeg'], 
    ['Calcédoine','https://i.imgur.com/pihSpK5.png'], 
    ['Jade','https://i.imgur.com/K9PiGcV.png'], 
    ['Émeraude','https://i.imgur.com/YG7dwLm.png'], 
    ['Grenat','https://i.imgur.com/xYRltfM.png'], 
    ['Citrine','https://i.imgur.com/RnwpQn1.png'], 
    ['Obsidienne œil céleste','https://i.imgur.com/0pS6LEO.png'], 
    ['Aigue marine','https://i.imgur.com/e5rwpJu.png'], 
    ['Rhodochrosite','https://i.imgur.com/bbLs9TC.png'], 
    ['Cornaline','https://i.imgur.com/65uIZdM.png'], 
    ['Ambre','https://i.imgur.com/gT56mhV.png'],
    ['Hématite','https://i.imgur.com/9o79iVY.png'], 
    ['Améthyste','https://i.imgur.com/JHSIods.png'], 
    ['Malachite','https://i.imgur.com/68fd8IX.png'], 
    ['Opale','https://i.imgur.com/xR2uhzJ.png'], 
    ['Turquoise','https://i.imgur.com/daAaKbR.png'], 
    ['Pierre de lune','https://i.imgur.com/VthRDLQ.png'], 
    ['Topaze','https://i.imgur.com/IoRRNxt.png'], 
    ['Lapis lazuli','https://i.imgur.com/Wnlbbky.png'], 
    ['Tourmaline','https://i.imgur.com/nG6t89m.png'], 
    ['Cristal de roche','https://i.imgur.com/2xtN3Ry.png'], 
    ['Azurite','https://i.imgur.com/GqfigW8.png'], 
    ['Amazonite','https://i.imgur.com/zb1jiye.png'], 
    ['Œil de tigre','https://i.imgur.com/sol1piI.png'], 
    ['Pyrite','https://i.imgur.com/UrRAWAz.png'], 
    ['Fluorite','https://i.imgur.com/4YtWbem.png'], 
    ['Perle de nacre','https://i.imgur.com/mc5fWjt.png'], 
    ['Sodalite','https://i.imgur.com/6GygVWZ.png'], 
    ['Quartz fumé','https://i.imgur.com/6oMx0F6.png'], 
    ['Jade','https://i.imgur.com/K9PiGcV.png'], 
    ['Émeraude','https://i.imgur.com/YG7dwLm.png'], 
    ['Grenat','https://i.imgur.com/xYRltfM.png']
];

/**
* Remplace les caractères spéciaux et met en minuscule une chaîne de caractères.
* Transformation des œ en oe, des æ en ae et suppression des tirets cadratin et demi-cadratin.
* @param {array} chaine La chaîne de caractères à normaliser.
* @returns La chaîne de caractères normalisée.
*/
function normaliserEntree(chaine) {
    return chaine.toLowerCase().trim().replace(/<[^>]*>/g, '').replace('œ', 'oe').replace('æ', 'ae').replace('-', '').replace('—', '');
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
    console.log(`Pierre base : ${pierreBase}`);
    const pierreSommet = calculerPierreSommet(prenoms, nomPere, nomMere);
    console.log(`Pierre sommet : ${pierreSommet}`); 
    const pierreCheminVie = calculerPierreCheminVie(dateNaissance);
    console.log(`Pierre chemin de vie : ${pierreCheminVie}`);
    const pierreAppel = calculerPierreAppel(prenoms, nomPere, nomMere);
    console.log(`Pierre appel : ${pierreAppel}`);
    const pierrePersonnalite = calculerPierrePersonnalite(prenoms, nomPere, nomMere);
    console.log(`Pierre personnalité : ${pierrePersonnalite}`);
    const pierreExpression = calculerPierreExpression(prenoms, nomPere, nomMere);
    console.log(`Pierre expression : ${pierreExpression}`);
    const pierreTouche = calculerPierreTouche(pierreBase, pierreSommet, prenoms, nomPere, nomMere);
    console.log(`Pierre touche : ${pierreTouche}`);
    const pierreVoeu = calculerPierreVoeu(prenoms, nomPere, nomMere);
    console.log(`Pierre vœu : ${pierreVoeu}`);
    afficherPierres(pierreBase, pierreSommet, pierreCheminVie, pierreAppel, pierrePersonnalite, pierreExpression, pierreTouche, pierreVoeu);
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
    const mois = new Date(dateNaissance).getMonth() + 1;
    const annee = new Date(dateNaissance).getFullYear();
    const somme = jour + mois + annee;
    return calculerSommeReduite33(Number(somme));
}

/**
* Calcule la pierre d'appel (le total des voyelles des prénoms et noms).
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre d'appel.
*/
function calculerPierreAppel(prenoms, nomPere, nomMere) {
    const somme = calculerPierreAppelNonReduite(prenoms, nomPere, nomMere);
    return calculerSommeReduite33(somme);
}

/**
* Calcule la pierre d'appel (le total des voyelles des prénoms et noms), non réduite.
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre d'appel, non réduite.
*/
function calculerPierreAppelNonReduite(prenoms, nomPere, nomMere) {
    const regexVoyelles = /[aeiouyàâäéèêëîïôöùûüú]/g;
    let sommePrenoms = 0;
    prenoms.split(/[\s,\-_;/]+/).forEach(prenom => {
        sommePrenoms += calculerLettresRegex(prenom, regexVoyelles);
    });
    const sommeNomPere = calculerLettresRegex(nomPere, regexVoyelles);
    const sommeNomMere = calculerLettresRegex(nomMere, regexVoyelles);
    return sommePrenoms + sommeNomPere + sommeNomMere;
}


/**
* Calcule la pierre de personnalité (le total des consonnes des prénoms et noms).
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre de personnalité.
*/
function calculerPierrePersonnalite(prenoms, nomPere, nomMere) {
    const somme = calculerPierrePersonnaliteNonReduite(prenoms, nomPere, nomMere);
    return calculerSommeReduite33(somme);
}

/**
* Calcule la pierre de personnalité (le total des consonnes des prénoms et noms), non réduite.
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre de personnalité, non réduite.
*/
function calculerPierrePersonnaliteNonReduite(prenoms, nomPere, nomMere) {
    let sommePrenoms = 0;
    const regexConsonnes = /[bcdfghjklmnpqrstvwxz]/g;
    prenoms.split(/[\s,\-_;/]+/).forEach(prenom => {
        sommePrenoms += calculerLettresRegex(prenom, regexConsonnes)
    });
    const sommeNomPere = calculerLettresRegex(nomPere, regexConsonnes);
    const sommeNomMere = calculerLettresRegex(nomMere, regexConsonnes);
    return sommePrenoms + sommeNomPere + sommeNomMere; 
}

/**
* Calcule la pierre d'expression (la somme réduite de la pierre d'appel et de la pierre de personnalité).
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre d'expression.
*/
function calculerPierreExpression(prenoms, nomPere, nomMere) {
    const somme = calculerPierreExpressionNonReduite(prenoms, nomPere, nomMere);
    return calculerSommeReduite33(somme);
}

/**
* Calcule la pierre d'expression (la somme réduite de la pierre d'appel et de la pierre de personnalité), non réduite.
* @param {string} prenoms Les prénoms.
* @param {string} nomPere Le nom du père.
* @param {string} nomMere Le nom de la mère.
* @returns La somme correspondant à la pierre d'expression, non réduite.
*/
function calculerPierreExpressionNonReduite(prenoms, nomPere, nomMere) {
    const pierreAppelNonReduite = calculerPierreAppelNonReduite(prenoms, nomPere, nomMere);
    const pierrePersonnaliteNonReduite = calculerPierrePersonnaliteNonReduite(prenoms, nomPere, nomMere);
    return  pierreAppelNonReduite + pierrePersonnaliteNonReduite;
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
function calculerPierreTouche(pierreBase, pierreSommet, prenoms, nomPere, nomMere) {
    const somme = pierreBase + pierreSommet + calculerPierreAppelNonReduite(prenoms, nomPere, nomMere) + calculerPierrePersonnaliteNonReduite(prenoms, nomPere, nomMere) + calculerPierreExpressionNonReduite(prenoms, nomPere, nomMere);
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
    lettresSaisies.forEach(lettreSaisie => lettres.forEach(function callback(array, indexLettres) {
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

/**
* Affiche les pierres du chemin de vie.
* @param {number} pierreBase La pierre de base.
* @param {number} pierreSommet La pierre de sommet.
* @param {number} pierreCheminVie La pierre du chemin de vie.
* @param {number} pierreAppel La pierre d'appel.
* @param {number} pierrePersonnalite La pierre de personnalité.
* @param {number} pierreExpression La pierre d'expression.
* @param {number} pierreTouche La pierre de touche.
* @param {number} pierreVoeu La pierre de vœu.
*/
function afficherPierres(pierreBase, pierreSommet, pierreCheminVie, pierreAppel, pierrePersonnalite, pierreExpression, pierreTouche, pierreVoeu) {
    const resultat = document.querySelector('.js-resultat');
    resultat.classList.remove('hide');
    resultat.scrollIntoView({ behavior: 'smooth' });
    const pierreBaseDiv = resultat.querySelector('.js-pierre-base');
    const pierreBaseImg = pierreBaseDiv.querySelector('.js-image');
    const pierreBaseNom = pierreBaseDiv.querySelector('.js-nom-pierre');
    const pierreSommetDiv = resultat.querySelector('.js-pierre-sommet');
    const pierreSommetImg = pierreSommetDiv.querySelector('.js-image');
    const pierreSommetNom = pierreSommetDiv.querySelector('.js-nom-pierre');
    const pierreCheminVieDiv = resultat.querySelector('.js-pierre-chemin-vie');
    const pierreCheminVieImg = pierreCheminVieDiv.querySelector('.js-image');
    const pierreCheminVieNom = pierreCheminVieDiv.querySelector('.js-nom-pierre');
    const pierreAppelDiv = resultat.querySelector('.js-pierre-appel');
    const pierreAppelImg = pierreAppelDiv.querySelector('.js-image');
    const pierreAppelNom = pierreAppelDiv.querySelector('.js-nom-pierre');
    const pierrePersonnaliteDiv = resultat.querySelector('.js-pierre-personnalite');
    const pierrePersonnaliteImg = pierrePersonnaliteDiv.querySelector('.js-image');
    const pierrePersonnaliteNom = pierrePersonnaliteDiv.querySelector('.js-nom-pierre');
    const pierreExpressionDiv = resultat.querySelector('.js-pierre-expression');
    const pierreExpressionImg = pierreExpressionDiv.querySelector('.js-image');
    const pierreExpressionNom = pierreExpressionDiv.querySelector('.js-nom-pierre');
    const pierreToucheDiv = resultat.querySelector('.js-pierre-touche');
    const pierreToucheImg = pierreToucheDiv.querySelector('.js-image');
    const pierreToucheNom = pierreToucheDiv.querySelector('.js-nom-pierre');
    const pierreVoeuDiv = resultat.querySelector('.js-pierre-voeu');
    const pierreVoeuImg = pierreVoeuDiv.querySelector('.js-image');
    const pierreVoeuNom = pierreVoeuDiv.querySelector('.js-nom-pierre');
    pierreBaseImg.src = pierres[pierreBase - 1][1];
    ajouterElementHtml(pierreBaseNom, pierreBase, 'Pierre de base :');
    pierreSommetImg.src = pierres[pierreSommet - 1][1];
    ajouterElementHtml(pierreSommetNom, pierreSommet, 'Pierre de sommet :');
    pierreCheminVieImg.src = pierres[pierreCheminVie - 1][1];
    ajouterElementHtml(pierreCheminVieNom, pierreCheminVie, 'Pierre de chemin de vie :');
    pierreAppelImg.src = pierres[pierreAppel - 1][1];
    ajouterElementHtml(pierreAppelNom, pierreAppel, `Pierre d'appel :`);
    pierrePersonnaliteImg.src = pierres[pierrePersonnalite - 1][1]; 
    ajouterElementHtml(pierrePersonnaliteNom, pierrePersonnalite, 'Pierre de personnalité :');
    pierreExpressionImg.src = pierres[pierreExpression - 1][1];
    ajouterElementHtml(pierreExpressionNom, pierreExpression, `Pierre d'expression :`);
    pierreToucheImg.src = pierres[pierreTouche - 1][1];
    ajouterElementHtml(pierreToucheNom, pierreTouche, 'Pierre de touche :');
    pierreVoeuImg.src = pierres[pierreVoeu - 1][1];
    ajouterElementHtml(pierreVoeuNom, pierreVoeu, 'Pierre de vœu :');
    permettreCopieResultats(pierreBase, pierreSommet, pierreCheminVie, pierreAppel, pierrePersonnalite, pierreExpression, pierreTouche, pierreVoeu);
}

/**
 * Ajoute le nom de la pierre et sa valeur à un élément HTML.
 * @param {Node} element L'élement HTML auquel ajouter le nom de la pierre et sa valeur.
 * @param {number} pierre Le numéro de la pierre.
 * @param {string} texte Le texte à afficher avant le nom de la pierre.
 */
function ajouterElementHtml(element, pierre, texte) {
    element.innerHTML = ''; // Supprimer le contenu précédent
    element.appendChild(document.createElement('span')).className = 'solune-nom-pierre';
    element.lastChild.textContent = `${texte}`;
    element.appendChild(document.createElement('span')).className = 'solune-valeur-pierre';
    element.lastChild.textContent = pierres[pierre - 1][0];
}

/**
* Affiche un bouton permettant de copier les résultats.
* @param {number} pierreBase La pierre de base.
* @param {number} pierreSommet La pierre de sommet.
* @param {number} pierreCheminVie La pierre du chemin de vie.
* @param {number} pierreAppel La pierre d'appel.
* @param {number} pierrePersonnalite La pierre de personnalité.
* @param {number} pierreExpression La pierre d'expression.
* @param {number} pierreTouche La pierre de touche.
* @param {number} pierreVoeu La pierre de vœu.
*/
function permettreCopieResultats(pierreBase, pierreSommet, pierreCheminVie, pierreAppel, pierrePersonnalite, pierreExpression, pierreTouche, pierreVoeu) {
    const resultat = document.querySelector('.js-resultat');
    const copyButton = resultat.querySelector('.js-copy-button');
    copyButton.addEventListener('click', () => {
        copierResultats(pierreBase, pierreSommet, pierreCheminVie, pierreAppel, pierrePersonnalite, pierreExpression, pierreTouche, pierreVoeu);
    });
}

/**
* Copie les résultats dans le presse-papier.
* @param {number} pierreBase La pierre de base.
* @param {number} pierreSommet La pierre de sommet.
* @param {number} pierreCheminVie La pierre du chemin de vie.
* @param {number} pierreAppel La pierre d'appel.
* @param {number} pierrePersonnalite La pierre de personnalité.
* @param {number} pierreExpression La pierre d'expression.
* @param {number} pierreTouche La pierre de touche.
* @param {number} pierreVoeu La pierre de vœu.
*/
function copierResultats(pierreBase, pierreSommet, pierreCheminVie, pierreAppel, pierrePersonnalite, pierreExpression, pierreTouche, pierreVoeu) {
    const notification = document.querySelector('.js-notification');
    const formulaire = document.querySelector('.js-form');
    const prenoms = formulaire.querySelector('.js-firstname');
    const nomPere = formulaire.querySelector('.js-father-name');
    const nomMere = formulaire.querySelector('.js-mother-name');
    const dateNaissance = formulaire.querySelector('.js-birthdate');
    const dateNaissanceFormatted = new Date(dateNaissance.value).toLocaleDateString('fr-FR');
    const texte = `Prénoms : ${prenoms.value}\nNom du père : ${nomPere.value}\nNom de la mère : ${nomMere.value}\nDate de naissance : ${dateNaissanceFormatted}\n\nVoici les pierres associées à mon chemin de vie :\n\n- Pierre de base : ${pierres[pierreBase - 1][0]}\n- Pierre de sommet : ${pierres[pierreSommet - 1][0]}\n- Pierre du chemin de vie : ${pierres[pierreCheminVie - 1][0]}\n- Pierre d'appel : ${pierres[pierreAppel - 1][0]}\n- Pierre de personnalité : ${pierres[pierrePersonnalite - 1][0]}\n- Pierre d'expression : ${pierres[pierreExpression - 1][0]}\n- Pierre de touche : ${pierres[pierreTouche - 1][0]}\n- Pierre de vœu : ${pierres[pierreVoeu - 1][0]}`;
    navigator.clipboard.writeText(texte).then(() => {
        notification.classList.add('show');
        notification.textContent = 'Résultats copiés dans le presse-papier !';
    }).catch(err => {
        notification.classList.add('show-error');
        notification.textContent = 'Erreur lors de la copie dans le presse-papier.';
    });
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.remove('show-error');
    }, 3000);
}
