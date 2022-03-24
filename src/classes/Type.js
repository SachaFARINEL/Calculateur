import dataCalculateur from '../dataCalculateur.json'

class Type {

    #_nom = "";
    #_forme = undefined;
    #_hauteurMin = undefined;
    #_hauteurMax = undefined;
    #_largeurMin = undefined;
    #_largeurMax = undefined;

    constructor(nom, objForm, objHauteurMin, objHauteurMax, objLargeurMin, objLargeurMax) {
        this.setNom(nom)
        this.setForme(objForm)
        this.setHauteurMin(objHauteurMin)
        this.setHauteurMax(objHauteurMax)
        this.setLargeurMin(objLargeurMin)
        this.setLargeurMax(objLargeurMax)
    }

    setNom(nom) {
        this.#_nom = nom;
    }

    getNom() {
        return this.#_nom;
    }

    setForme(objForm) {
        if (typeof objForm === "string") {
            this.#_forme = [objForm]
        } else {
            this.#_forme = objForm
        }
    }

    getForme() {
        return dataCalculateur[2].forme[0][this.#_forme]
    }

    getHauteurMin() {
        return this.#_hauteurMin
    }

    getHauteurMax() {
        return this.#_hauteurMax
    }

    getLargeurMin() {
        return this.#_largeurMin
    }

    getLargeurMax() {
        return this.#_largeurMax
    }

    setHauteurMin(objHauteurMin) {
        this.#_hauteurMin = objHauteurMin;
    }

    setHauteurMax(objHauteurMax) {
        this.#_hauteurMax = objHauteurMax;
    }

    setLargeurMin(objLargeurMin) {
        this.#_largeurMin = objLargeurMin;
    }

    setLargeurMax(objLargeurMax) {
        this.#_largeurMax = objLargeurMax;
    }

}

export default Type;