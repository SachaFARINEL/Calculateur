import dataCalculateur from '../dataCalculateur.json'

class Gamme {

    #_nom = "";
    #_modeles = undefined
    #_fixations = undefined;

    constructor(nom, objFixation) {
        this.setNom(nom)
        this.#_modeles = [];
        this.setFixation(objFixation)
    }

    setNom(nom) {
        this.#_nom = nom;
    }

    getNom() {
        return this.#_nom;
    }

    setModeles(arr_modele) {
        this.#_modeles = arr_modele;
    }

    getModeles() {
        return this.#_modeles;
    }

    addModele(modele) {
        this.#_modeles.push(modele)
    }

    /**
     * 
     * @param {*} nom_modele 
     * @param {*} nom_type 
     * 
     * @returns array
     */
    getArray(nom_modele, nom_type) {
        let search_type = undefined;
        if (this.#_modeles !== undefined && this.#_modeles.length > 0) {
            const filter_modele = this.#_modeles.filter(m => m.getNom() === nom_modele);
            if (filter_modele.length > 0) {
                search_type = filter_modele[0]
                if (nom_type !== undefined) {
                    search_type = filter_modele[0].getType(nom_type);
                } else {
                    search_type = filter_modele[0];
                }
            }

        }
        return search_type;
    }

    setFixation(objFixation) {
        return this.#_fixations = objFixation
    }

    getFixation() {
        return Object.keys(dataCalculateur[1].fixation[this.#_fixations])
    }


}

export default Gamme;