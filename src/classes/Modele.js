
class Modele {

    #_nom = "";
    #_types = undefined

    constructor(nom) {
        this.setNom(nom)
        this.#_types = [];
    }

    setNom(nom) {
        this.#_nom = nom;
    }

    getNom() {
        return this.#_nom;
    }

    setTypes(arr_types) {
        this.#_types = arr_types;
    }

    getTypes() {
        return this.#_types;
    }

    addType(type) {
        this.#_types.push(type)
    }

    getType(nom_type) {
        let search_result = undefined;
        if (this.#_types !== undefined && this.#_types.length > 0) {
            const type_modele = this.#_types.filter(t => t.getNom() === nom_type);
            if (type_modele.length > 0) {
                search_result = type_modele[0]

            }
        }
        return search_result
    }
}

export default Modele;