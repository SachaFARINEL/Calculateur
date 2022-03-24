import useStyles from "../assets/styles/styles";
import dataCalculateur from '../dataCalculateur.json'
import { useEffect } from 'react';
import { FormControl, Grid, TextField, Typography } from "@material-ui/core";
import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
import Utils from '../assets/utils';
import { Clear } from '@material-ui/icons';


const Resultats = ({ configPortail }) => {

    const css = useStyles();
    const init_values = {
        largeurVantail: (3500 - 64) / 2,
        jeuxLateraux: 2 + ' x '
            + Object.values(dataCalculateur[1].fixation.solutionsMinerale)[0],
        fleche: 0,
        gaineGache: 0,
        poignee: 0,
        gaineMoteur: 0
    }

    const { setValue, control, getValues } = useForm({ defaultValues: init_values })
    useEffect(() => {

        if (Utils.objUndef(configPortail)) {
            const gammeAuthentiqueClassiqueDesign = configPortail.materiel === 'ALU' && configPortail.gamme !== 'Minérale'
            const gammeMinerale = configPortail.gamme === 'Minérale'
            const gammeConfortExcellence = configPortail.materiel === 'PVC' && configPortail.gamme !== 'Relax'
            const gammeRelax = configPortail.gamme === 'Relax'
            const gammeExcellenceRelax = configPortail.materiel === 'PVC' && configPortail.gamme !== 'Confort'
            const gammeConfort = configPortail.gamme === 'Confort'


            /**
             * * Jeux Lateraux : Sont calculés en fonction des solutions de fixation.
             * * la modification des valeurs se fait dans le JSON, au niveau de : fixation.
             */

            const nombreSolutionParListe = (numSolution) => (Object.values((Object.values(dataCalculateur[1].fixation)[numSolution]))).length
            const lettreSolution = (numSolution, i) => (Object.keys(Object.values(dataCalculateur[1].fixation)[numSolution])[i])
            const valeurJeuxLateraux = (numSolution, i) => ((Object.values(Object.values(dataCalculateur[1].fixation)[numSolution])[i]))

            if (!configPortail.albatros) { /* Pas Albatros */

                if (gammeAuthentiqueClassiqueDesign) {
                    for (let i = 0; i <= nombreSolutionParListe(0); i++) {
                        if (configPortail.fixation === lettreSolution(0, i)) {
                            if (configPortail.type === '2 Vantaux') {
                                setValue('jeuxLateraux', '2 x ' + valeurJeuxLateraux(0, i))
                            } else if (configPortail.type === 'Portillon') {
                                setValue('jeuxLateraux', (valeurJeuxLateraux(0, i) + ' + 30'))
                            }
                        }
                    }
                } else if (gammeMinerale) {
                    for (let i = 0; i <= nombreSolutionParListe(1); i++) {
                        if (configPortail.fixation === lettreSolution(1, i)) {
                            if (configPortail.type === '2 Vantaux') {
                                setValue('jeuxLateraux', '2 x ' + valeurJeuxLateraux(1, i))
                            } else if (configPortail.type === 'Portillon') {
                                if (configPortail.gache === true) {
                                    setValue('jeuxLateraux', (valeurJeuxLateraux(1, i) + ' + 45'))
                                } else {
                                    setValue('jeuxLateraux', (valeurJeuxLateraux(1, i) + ' + 30'))
                                }
                            }
                        }
                    }
                } else if (gammeConfortExcellence) {
                    for (let i = 0; i <= nombreSolutionParListe(2); i++) {
                        if (configPortail.fixation === lettreSolution(2, i)) {
                            if (configPortail.type === '2 Vantaux') {
                                setValue('jeuxLateraux', '2 x ' + valeurJeuxLateraux(2, i))
                            } else if (configPortail.type === 'Portillon') {
                                setValue('jeuxLateraux', (valeurJeuxLateraux(2, i) + ' + 15'))
                            }
                        }
                    }
                } else if (gammeRelax) {
                    for (let i = 0; i <= nombreSolutionParListe(3); i++) {
                        if (configPortail.fixation === lettreSolution(3, i)) {
                            if (configPortail.type === '2 Vantaux') {
                                setValue('jeuxLateraux', '2 x ' + valeurJeuxLateraux(3, i))
                            } else if (configPortail.type === 'Portillon') {
                                setValue('jeuxLateraux', (valeurJeuxLateraux(3, i) + ' + 15'))
                            }
                        }
                    }
                }
                if (configPortail.type === 'Coulissant') {
                    setValue('largeurVantail', (parseInt(configPortail.largeur) + 60) / 2)
                    setValue('jeuxLateraux', '2 x ' + dataCalculateur[1].fixation.solutionsCoulissant)
                }
            } else { /* Albatros */
                setValue('jeuxLateraux', ' 2 x ' + (dataCalculateur[1].fixation.solutionsAlbatros))
            }

            /* ---------------------------------------------------- Fin Jeux Lateraux --------------------------------------------------------- */

            /**
             * * Largeur Vantail : Est calculée en fonction de la solution de fixation + la largeur du portail.
             * * Les modifications se font au niveau de "setValue ('largeurVantail' , ...) 
             */

            if (gammeAuthentiqueClassiqueDesign) {
                if (!configPortail.albatros) {

                    switch (configPortail.fixation) {
                        case 'B':
                            if (configPortail.type === '2 Vantaux') {
                                setValue('largeurVantail', (parseInt(configPortail.largeur) - 94) / 2)
                            } else if (configPortail.type === 'Portillon') {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 69)
                            }
                            break;
                        case 'C':
                        case 'D':
                        case 'E':
                            if (configPortail.type === '2 Vantaux') {
                                setValue('largeurVantail', (parseInt(configPortail.largeur) - 110) / 2)
                            } else if (configPortail.type === 'Portillon') {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 77)
                            }
                            break;
                        default:
                            if (configPortail.type === '2 Vantaux') {
                                setValue('largeurVantail', (parseInt(configPortail.largeur) - 70) / 2)
                            } else if (configPortail.type === 'Portillon') {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 57)
                            } else {
                                setValue('largeurVantail', (parseInt(configPortail.largeur) + 60) / 2)
                            }
                            break;
                    }
                } else {
                    setValue('largeurVantail', (parseInt(configPortail.largeur) - 81) / 2)
                }
            } else if (gammeMinerale) {
                switch (configPortail.fixation) {
                    case 'A':
                        if (configPortail.type === '2 Vantaux') {
                            setValue('largeurVantail', (parseInt(configPortail.largeur) - 64) / 2)
                        } else if (configPortail.type === 'Portillon') {
                            if (configPortail.gache === true) {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 77)
                            } else {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 57)
                            }
                        } else {
                            setValue('largeurVantail', (parseInt(configPortail.largeur) + 60) / 2)
                        }
                        break;
                    default:
                        if (configPortail.type === '2 Vantaux') {
                            setValue('largeurVantail', (parseInt(configPortail.largeur) - 50) / 2)
                        } else if (configPortail.type === 'Portillon') {
                            if (configPortail.gache === true) {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 70)
                            } else {
                                setValue('largeurVantail', parseInt(configPortail.largeur) - 50)
                            }
                        }
                        break;
                }
            } else { /* PVC */
                if (configPortail.type === '2 Vantaux') {
                    setValue('largeurVantail', (parseInt(configPortail.largeur) - 60) / 2)
                } else if (configPortail.type === 'Portillon') {
                    setValue('largeurVantail', parseInt(configPortail.largeur) - 40)
                } else { /* Coulissant */
                    let valeurLargeurVantail = parseInt(configPortail.largeur) + 60
                    if (gammeExcellenceRelax) {
                        setValue('largeurVantail', valeurLargeurVantail)
                    } else if (gammeConfort) {
                        setValue('largeurVantail', (valeurLargeurVantail / 2))
                    }
                }
            }

            if ((configPortail.largeur < configPortail.LargeurMin) || (configPortail.largeur > configPortail.LargeurMax)) {
                setValue('largeurVantail', 'Largeur hors limite')
            }

            /* ---------------------------------------------------- Fin Largeur Vantail ------------------------------------------------------  */

            /**
             * * Hauteur de la flèche : Est calculée en fonction de la largeur de vantail ou de la largeur du portail/portillon. 
             * * Les modifications se font au niveau de "setValue ('fleche' , ...)
             */

            const traverseIdemForme = (Utils.objUndef(configPortail) && configPortail.gamme === 'Authentique' && configPortail.traverse !== 'Droite')
            let total = undefined;
            let totalPortillon = undefined;
            let totalDemi = undefined;
            let totalCoulissant = undefined;

            if (!configPortail.albatros) { /* Non Albatros */
                if (traverseIdemForme) { /* Traverse idem forme */
                    total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) + 16 - 160)), 2) / 4)) - valeur2) * 100) / 100
                    totalPortillon = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(getValues('largeurVantail') - 160)), 2) / 4))) * 100) / 100
                    totalDemi = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) - 320)), 2) / 4))) * 100) / 100
                    totalCoulissant = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(configPortail.largeur + 60 - 160)), 2) / 4)) - valeur2) * 100) / 100
                    switch (configPortail.forme) {
                        case 'Biaise':
                            if (parseInt(configPortail.largeur) <= 3800) {
                                setValue('fleche', 100)
                            } else {
                                setValue('fleche', 150)
                            }
                            break;
                        case 'CDG':
                        case 'CDGI':
                            setValue('fleche', 200)
                            break;
                        case 'Demi-CDG':
                            setValue('fleche', 200)
                            break;
                        case 'Bombée':
                            if (configPortail.type === '2 Vantaux') {
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', total(2083, 1.8597))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', total(3294, 1.1757))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', total(5251, 0.7374))
                                } else {
                                    setValue('fleche', total(8556, 0.4526))
                                }
                            } else if (configPortail.type === 'Portillon') {
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', totalPortillon(2083))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', totalPortillon(3294))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', totalPortillon(5251))
                                } else {
                                    setValue('fleche', totalPortillon(8556))
                                }
                            } else { /* Coulissant */
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', totalCoulissant(2083, 1.5368))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', totalCoulissant(3294, 0.9716))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', totalCoulissant(5251, 0.6094))
                                } else {
                                    setValue('fleche', totalCoulissant(8556, 0.374))
                                }
                            }
                            break;
                        case 'Demi-bombée':
                            if (parseInt(getValues('largeurVantail')) <= 1060) {
                                setValue('fleche', totalDemi(2083))
                            } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                setValue('fleche', totalDemi(3294))
                            } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                setValue('fleche', totalDemi(5251))
                            } else {
                                setValue('fleche', totalDemi(8556))
                            }
                            break;
                        case 'Incurvée':
                            if (configPortail.type === '2 Vantaux') {
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', total(2033, 1.9050))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', total(3244, 1.1938))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', total(5201, 0.7445))
                                } else {
                                    setValue('fleche', total(8506, 0.4552))
                                }
                            } else if (configPortail.type === 'Portillon') {
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', totalPortillon(2033))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', totalPortillon(3244))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', totalPortillon(5201))
                                } else {
                                    setValue('fleche', totalPortillon(8506))
                                }
                            } else { /* Coulissant */
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', totalCoulissant(2033, 1.5368))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', totalCoulissant(3244, 0.9716))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', totalCoulissant(5201, 0.6094))
                                } else {
                                    setValue('fleche', totalCoulissant(8506, 0.374))
                                }
                            }
                            break
                        case 'Demi-incurvée':
                            if (parseInt(getValues('largeurVantail')) <= 1060) {
                                setValue('fleche', totalDemi(2033))
                            } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                setValue('fleche', totalDemi(3244))
                            } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                setValue('fleche', totalDemi(5201))
                            } else {
                                setValue('fleche', totalDemi(8506))
                            }
                            break;
                        default:
                            setValue('fleche', 'ERR')
                            break;
                    }
                } else { /* Traverse droite */
                    if (configPortail.gamme === 'Minérale') { /* ALU Gamme minérale */
                        switch (configPortail.forme) {
                            case 'Biaise':

                                if (parseInt(getValues('largeurVantail')) <= 3800) {
                                    setValue('fleche', 100)
                                } else {
                                    setValue('fleche', 150)
                                }
                                break;
                            case 'Bombée':
                            case 'Demi-bombée':
                            case 'Incurvée':
                            case 'Demi-incurvée':
                            case 'Dégradée':
                                if (parseInt(getValues('largeurVantail')) < 3600) {
                                    setValue('fleche', 100)
                                } else if (3600 <= parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) < 4500) {
                                    setValue('fleche', 150)
                                } else {
                                    setValue('fleche', 200)
                                }
                                break;
                            case 'CDG':
                            case 'CDGI':
                            case 'Demi-CDG':
                            case 'Demi-CDGI':
                                setValue('fleche', 200)
                                break;
                            default:
                                setValue('fleche', 'ERR')
                                break;
                        }
                    } else if (configPortail.gamme === 'Classique' || configPortail.gamme === 'Design') { /* ALU Gamme Classique ou Design */
                        total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail')) * 2 + 16 - 160)), 2) / 4)) - valeur2) * 100) / 100
                        totalPortillon = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(getValues('largeurVantail') - 160)), 2) / 4))) * 100) / 100
                        totalDemi = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) - 320)), 2) / 4))) * 100) / 100
                        totalCoulissant = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(configPortail.largeur + 60 - 160)), 2) / 4)) - valeur2) * 100) / 100
                        switch (configPortail.forme) {
                            case 'Bombée':
                                if (configPortail.type === '2 Vantaux') {
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', total(2083, 1.8597))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', total(3294, 1.1757))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', total(5251, 0.7374))
                                    } else {
                                        setValue('fleche', total(8556, 0.4526))
                                    }
                                } else if (configPortail.type === 'Portillon') {
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', totalPortillon(2083))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', totalPortillon(3294))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', totalPortillon(5251))
                                    } else {
                                        setValue('fleche', totalPortillon(8556))
                                    }
                                } else { /* Coulissant */
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', totalCoulissant(2083, 1.5368))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', totalCoulissant(3294, 0.9716))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', totalCoulissant(5251, 0.6094))
                                    } else {
                                        setValue('fleche', totalCoulissant(8556, 0.374))
                                    }
                                }
                                break;
                            case 'Demi-bombée':
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', totalDemi(2083))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', totalDemi(3294))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', totalDemi(5251))
                                } else {
                                    setValue('fleche', totalDemi(8586))
                                }
                                break;
                            case 'Incurvée':
                                if (configPortail.type === '2 Vantaux') {
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', total(2003, 1.9181))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', total(3214, 1.195))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', total(5171, 0.7427))
                                    } else {
                                        setValue('fleche', total(8476, 0.4531))
                                    }
                                } else if (configPortail.type === 'Portillon') {
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', totalPortillon(2003))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', totalPortillon(3214))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', totalPortillon(5171))
                                    } else {
                                        setValue('fleche', totalPortillon(8476))
                                    }
                                } else { /* Coulissant */
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', totalCoulissant(2033, 1.5368))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', totalCoulissant(3244, 0.9716))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', totalCoulissant(5201, 0.6094))
                                    } else {
                                        setValue('fleche', totalCoulissant(8506, 0.374))
                                    }
                                }
                                break
                            case 'Demi-incurvée':
                                if (parseInt(getValues('largeurVantail')) <= 1060) {
                                    setValue('fleche', totalDemi(2003))
                                } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                    setValue('fleche', totalDemi(3214))
                                } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                    setValue('fleche', totalDemi(5171))
                                } else {
                                    setValue('fleche', totalDemi(8476))
                                }
                                break;
                            case 'CDG':
                            case 'CDGI':
                                if (parseInt(getValues('largeurVantail')) <= 2470) {
                                    setValue('fleche', 200)
                                } else {
                                    setValue('fleche', 250)
                                }
                                break;
                            case 'Demi-CDG':
                                if (parseInt(getValues('largeurVantail')) <= 2410) {
                                    setValue('fleche', 200)
                                } else {
                                    setValue('fleche', 250)
                                }
                                break;
                            case 'Biaise':
                                if (parseInt(configPortail.largeur) <= 3800) {
                                    setValue('fleche', 100)
                                } else {
                                    setValue('fleche', 150)
                                }
                                if (configPortail.type === 'Portillon') {
                                    if (parseInt(getValues('largeurVantail')) <= 1900) {
                                        setValue('fleche', 100)
                                    } else {
                                        setValue('fleche', 150)
                                    }
                                }
                                break;
                            default:
                                setValue('fleche', 'ERR')
                                break;
                        }
                    } else if (configPortail.gamme === 'Excellence' || configPortail.gamme === 'Relax') { /* PVC Gamme Excellence ou Relax */
                        total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) + 10 - 230)), 2) / 4)) - valeur2) * 100) / 100
                        totalPortillon = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(getValues('largeurVantail') - 230)), 2) / 4))) * 100) / 100
                        totalDemi = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) - 460)), 2) / 4))) * 100) / 100
                        totalCoulissant = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(configPortail.largeur + 60 - 230)), 2) / 4)) - valeur2) * 100) / 100
                        switch (configPortail.forme) {
                            case 'Bombée':
                                if (configPortail.type === '2 Vantaux') {
                                    if (parseInt(configPortail.largeur) < 2000) {
                                        setValue('fleche', total(2113.33, 3.4097))
                                    } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                        setValue('fleche', total(4717.5, 1.53))
                                    } else {
                                        setValue('fleche', total(8363.33, 0.86))
                                    }
                                } else if (configPortail.type === 'Portillon') {
                                    if (parseInt(getValues('largeurVantail')) <= 1230) {
                                        setValue('fleche', totalPortillon(2113.33))
                                    } else {
                                        setValue('fleche', totalPortillon(4717.5))
                                    }
                                } else { /* Coulissant */
                                    if (parseInt(configPortail.largeur) < 2000) {
                                        setValue('fleche', totalCoulissant(2113.33, 0.7824))
                                    } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                        setValue('fleche', totalCoulissant(4717.5, 0.3504))
                                    } else {
                                        setValue('fleche', totalCoulissant(8363.33, 0.1977))
                                    }
                                }
                                break;
                            case 'Demi-bombée':
                                if (parseInt(getValues('largeurVantail')) <= 1230) {
                                    setValue('fleche', totalDemi(2113.33))
                                } else {
                                    setValue('fleche', totalDemi(4717.5))
                                }
                                break;
                            case 'Incurvée':
                                if (configPortail.type === '2 Vantaux') {
                                    if (parseInt(configPortail.largeur) < 2000) {
                                        setValue('fleche', total(1998.33, 3.6063))
                                    } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                        setValue('fleche', total(4602.5, 1.6))
                                    } else {
                                        setValue('fleche', total(8248.33, 0.873))
                                    }
                                } else if (configPortail.type === 'Portillon') {
                                    if (parseInt(getValues('largeurVantail')) <= 1230) {
                                        setValue('fleche', totalPortillon(1998.33))
                                    } else {
                                        setValue('fleche', totalPortillon(4602.5))
                                    }
                                } else { /* Coulissant */
                                    if (parseInt(configPortail.largeur) < 2000) {
                                        setValue('fleche', totalCoulissant(1998.33, 0.8274))
                                    } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                        setValue('fleche', totalCoulissant(4602.5, 0.359))
                                    } else {
                                        setValue('fleche', totalCoulissant(8248.33, 0.2))
                                    }
                                }
                                break
                            case 'Demi-incurvée':
                                if (parseInt(getValues('largeurVantail')) <= 1230) {
                                    setValue('fleche', totalDemi(1998.33))
                                } else {
                                    setValue('fleche', totalDemi(4602.5))
                                }
                                break;
                            case 'CDG':
                            case 'CDGI':
                                if (parseInt(configPortail.largeur) <= 2600) {
                                    setValue('fleche', 100)
                                } else if (2600 < parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3600) {
                                    setValue('fleche', 150)
                                } else {
                                    setValue('fleche', 200)
                                }
                                break;
                            case 'Demi-CDG':
                                if (parseInt(getValues('largeurVantail')) <= 1290) {
                                    setValue('fleche', 100)
                                } else {
                                    setValue('fleche', 150)
                                }
                                break;
                            case 'Biaise':
                                if (parseInt(configPortail.largeur) <= 3800) { /* Portail & Coulissant */
                                    setValue('fleche', 100)
                                } else {
                                    setValue('fleche', 150)
                                }
                                if (configPortail.type === 'Portillon') {
                                    if (parseInt(getValues('largeurVantail')) <= 1900) {
                                        setValue('fleche', 100)
                                    } else {
                                        setValue('fleche', 150)
                                    }
                                }
                                break;
                            default:
                                setValue('fleche', 'ERR')
                                break;
                        }
                    } else { /* ALU/PVC Gamme Authentique & Confort + Cas particuliers */
                        switch (configPortail.modele) {
                            case 'Rosier':
                                if (parseInt(getValues('largeurVantail')) <= 1650) {
                                    setValue('fleche', 150)
                                } else if (1650 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1850) {
                                    setValue('fleche', 200)
                                } else {
                                    setValue('fleche', 250)
                                }
                                if (configPortail.type === 'Portillon') {
                                    setValue('fleche', 150)
                                }
                                break;
                            case 'Aubépine':
                            case 'Ronce':
                            case 'Acacia':
                            case 'Astéra':
                            case 'Tilleul':
                            case 'Frêne':
                            case 'Pin lisses verticales':
                            case 'Pin lisses horizontales':
                            case 'Fougère':
                            case 'Erable':
                            case 'Aulne':
                            case 'Aulne II':
                            case 'Mélèze':
                            case 'Platane':
                                switch (configPortail.forme) {
                                    case 'Biaise':
                                        if (parseInt(configPortail.largeur) <= 3800) {
                                            setValue('fleche', 100)
                                        } else {
                                            setValue('fleche', 150)
                                        }
                                        if (configPortail.type === 'Portillon') {
                                            if (parseInt(configPortail.largeur) <= 1900) {
                                                setValue('fleche', 100)
                                            } else {
                                                setValue('fleche', 150)
                                            }
                                        }
                                        break;
                                    default:
                                        if (parseInt(configPortail.largeur) < 3600) {
                                            setValue('fleche', 100)
                                        } else if (3600 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) < 4500) {
                                            setValue('fleche', 150)
                                        } else {
                                            setValue('fleche', 200)
                                        }
                                        if (configPortail.type === 'Portillon') {
                                            if (parseInt(configPortail.largeur) < 1800) {
                                                setValue('fleche', 100)
                                            } else if (1800 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) < 2250) {
                                                setValue('fleche', 150)
                                            } else {
                                                setValue('fleche', 200)
                                            }

                                            if (configPortail.modele === 'Astéra' || configPortail.modele === 'Tilleul' || configPortail.modele === 'Frêne') {
                                                if (configPortail.forme === 'Dégradée') {
                                                    setValue('fleche', 100)
                                                } else {
                                                    if (configPortail.largeur <= 700) {
                                                        setValue('fleche', 40)
                                                    } else if (700 < configPortail.largeur && configPortail.largeur <= 800) {
                                                        setValue('fleche', 50)
                                                    } else if (800 < configPortail.largeur && configPortail.largeur <= 1000) {
                                                        setValue('fleche', 60)
                                                    } else {
                                                        setValue('fleche', 100)
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                }
                                break;

                            case 'Fybolia Design':
                            case 'Graphic':
                            case 'Roseau':
                            case 'Bonzaï':
                            case 'Saule':
                                total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) + 16 - 160)), 2) / 4)) - valeur2) * 100) / 100
                                switch (configPortail.forme) {
                                    case 'Bombée':
                                        if (parseInt(getValues('largeurVantail')) <= 1060) {
                                            setValue('fleche', total(2083, 1.8597))
                                        } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                            setValue('fleche', total(3294, 1.1757))
                                        } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                            setValue('fleche', total(5251, 0.7374))
                                        } else {
                                            setValue('fleche', total(8556, 0.4526))
                                        }
                                        break;
                                    case 'Incurvée':
                                        if (parseInt(getValues('largeurVantail')) <= 1060) {
                                            setValue('fleche', total(2003, 1.9181))
                                        } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                            setValue('fleche', total(3214, 1.195))
                                        } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                            setValue('fleche', total(5171, 0.7374))
                                        } else {
                                            setValue('fleche', total(8476, 0.4531))
                                        }
                                        break;
                                    case 'CDG':
                                    case 'CDGI':
                                        if (parseInt(getValues('largeurVantail')) <= 2470) {
                                            setValue('fleche', 200)
                                        } else {
                                            setValue('fleche', 250)
                                        }
                                        break;
                                    case 'Biaise':
                                        if (parseInt(configPortail.largeur) <= 3800) {
                                            setValue('fleche', 100)
                                        } else {
                                            setValue('fleche', 150)
                                        }
                                        break;
                                    default:
                                        setValue('fleche', 'ERR')
                                        break;
                                }
                                break;

                            case 'Camélia':
                            case 'Tulipe':
                            case 'Mimosa':
                            case 'Dahlia':
                            case 'Gentiane':
                            case 'Cèdre':
                                total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail') * 2) + 10 - 240)), 2) / 4)) - valeur2) * 100) / 100
                                totalDemi = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail')) * 2 - 480)), 2) / 4))) * 100) / 100
                                totalCoulissant = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(configPortail.largeur) + 60 - 240), 2) / 4)) - valeur2) * 100) / 100
                                totalPortillon = (valeur1) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow((parseInt(getValues('largeurVantail') - 240)), 2) / 4))) * 100) / 100
                                switch (configPortail.forme) {
                                    case 'Bombée':
                                        if (configPortail.type === '2 Vantaux') {
                                            if (parseInt(configPortail.largeur) < 2000) {
                                                setValue('fleche', total(2113.33, 3.6941))
                                            } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                                setValue('fleche', total(4717.5, 1.6537))
                                            } else {
                                                setValue('fleche', total(8363.33, 0.9342))
                                            }
                                        } else if (configPortail.type === 'Portillon') {
                                            if (parseInt(getValues('largeurVantail')) <= 1230) {
                                                setValue('fleche', totalPortillon(2113.33))
                                            } else {
                                                setValue('fleche', totalPortillon(4717.5))
                                            }
                                        } else { /* Coulissant */
                                            if (parseInt(configPortail.largeur) < 2000) {
                                                setValue('fleche', totalCoulissant(2113.33, 3.4097))
                                            } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                                setValue('fleche', totalCoulissant(4717.5, 1.5264))
                                            } else {
                                                setValue('fleche', totalCoulissant(8363.33, 0.8609))
                                            }
                                        }
                                        break;
                                    case 'Demi-bombée':
                                        if (parseInt(getValues('largeurVantail')) <= 1230) {
                                            setValue('fleche', totalDemi(2113.33))
                                        } else {
                                            setValue('fleche', totalDemi(4717.5))
                                        }
                                        break;
                                    case 'Incurvée':
                                        if (configPortail.type === '2 Vantaux') {
                                            if (parseInt(configPortail.largeur) < 2000) {
                                                setValue('fleche', total(1993.33, 3.9232))
                                            } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                                setValue('fleche', total(4597.5, 1.6996))
                                            } else {
                                                setValue('fleche', total(8243.33, 0.9478))
                                            }
                                        } else if (configPortail.type === 'Portillon') {
                                            if (parseInt(getValues('largeurVantail')) <= 1230) {
                                                setValue('fleche', totalPortillon(1993.33))
                                            } else {
                                                setValue('fleche', totalPortillon(4797.5))
                                            }
                                        } else { /* Coulissant */
                                            if (parseInt(configPortail.largeur) < 2000) {
                                                setValue('fleche', totalCoulissant(1993.33, 3.6152))
                                            } else if (2000 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3000) {
                                                setValue('fleche', totalCoulissant(4597.5, 1.5663))
                                            } else {
                                                setValue('fleche', totalCoulissant(8243.33, 0.8735))
                                            }
                                        }
                                        break;
                                    case 'Demi-incurvée':
                                        if (parseInt(getValues('largeurVantail')) <= 1230) {
                                            setValue('fleche', totalDemi(1993.33))
                                        } else {
                                            setValue('fleche', totalDemi(4797.5))
                                        }
                                        break;
                                    case 'CDG':
                                    case 'CDGI':
                                        if (parseInt(configPortail.largeur) < 2850) {
                                            setValue('fleche', 100)
                                        } else if (2850 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) <= 3850) {
                                            setValue('fleche', 150)
                                        } else {
                                            setValue('fleche', 200)
                                        }
                                        break;
                                    case 'Demi-CDG':
                                        if (parseInt(getValues('largeurVantail')) <= 1290) {
                                            setValue('fleche', 100)
                                        } else {
                                            setValue('fleche', 150)
                                        }
                                        break;
                                    case 'Biaise':
                                        if (Utils.objUndef(configPortail)) {
                                            if (parseInt(configPortail.largeur) <= 3800) {
                                                setValue('fleche', 100)
                                            } else {
                                                setValue('fleche', 150)
                                            }
                                        } else {
                                            setValue('fleche', 100)
                                        }
                                        if (configPortail.type === 'Portillon') {
                                            if (parseInt(configPortail.largeur) <= 1900) {
                                                setValue('fleche', 100)
                                            } else {
                                                setValue('fleche', 150)
                                            }
                                        }
                                        break;
                                    default:
                                        setValue('fleche', 'ERR')
                                        break;
                                }
                                break;
                            default:
                                setValue('fleche', 'ERR')
                                break;
                        }
                    }
                }
            } else { // Cas - Portail Albatros
                if (traverseIdemForme) { // Cas - Traverse même forme que le portail
                    total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail')) - 132.5) * 2), 2) / 4)) - valeur2) * 100) / 100
                    switch (configPortail.forme) {
                        case 'Biaise':
                            if (parseInt(configPortail.largeur) <= 3800) {
                                setValue('fleche', 100)
                            } else {
                                setValue('fleche', 150)
                            }
                            break;
                        case 'CDG':
                        case 'CDGI':
                            setValue('fleche', 200)
                            break;
                        case 'Bombée':
                            if (parseInt(getValues('largeurVantail')) <= 1060) {
                                setValue('fleche', total(2083, 1.8597))
                            } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                setValue('fleche', total(3294, 1.1757))
                            } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                setValue('fleche', total(5251, 0.7374))
                            } else {
                                setValue('fleche', total(8556, 0.4526))
                            }
                            break;
                        case 'Incurvée':
                            if (parseInt(getValues('largeurVantail')) <= 1060) {
                                setValue('fleche', total(2033, 1.9121))
                            } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                setValue('fleche', total(3244, 1.1913))
                            } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                setValue('fleche', total(5201, 0.74))
                            } else {
                                setValue('fleche', total(8506, 0.4517))
                            }
                            break
                        default:
                            setValue('fleche', 'ERR')
                            break;
                    }
                } else { // Cas - Traverse droite ou pas de traverse
                    switch (configPortail.modele) {
                        case 'Aubépine':
                        case 'Ronce':
                        case 'Acacia':
                        case 'Rosier':
                            switch (configPortail.forme) {
                                case 'Biaise':
                                    if (parseInt(configPortail.largeur) <= 3800) {
                                        setValue('fleche', 100)
                                    } else {
                                        setValue('fleche', 150)
                                    }
                                    break;
                                default:
                                    if (parseInt(configPortail.largeur) < 3600) {
                                        setValue('fleche', 100)
                                    } else if (3600 <= parseInt(configPortail.largeur) && parseInt(configPortail.largeur) < 4500) {
                                        setValue('fleche', 150)
                                    } else {
                                        setValue('fleche', 200)
                                    }
                                    break;
                            }
                            break;

                        case 'Fybolia Design':
                        case 'Graphic':
                        case 'Roseau':
                        case 'Bonzaï':
                        case 'Saule':
                            total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail')) * 2 + 15 - 280)), 2) / 4)) - valeur2) * 100) / 100
                            switch (configPortail.forme) {
                                case 'Bombée':
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', total(2083, 1.8597))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', total(3294, 1.1757))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', total(5251, 0.7374))
                                    } else {
                                        setValue('fleche', total(8556, 0.4526))
                                    }
                                    break;
                                case 'Incurvée':
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', total(2003, 1.9121))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', total(3214, 1.1913))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', total(5171, 0.74))
                                    } else {
                                        setValue('fleche', total(8476, 0.4517))
                                    }
                                    break;
                                case 'CDG':
                                case 'CDGI':
                                    if (parseInt(getValues('largeurVantail')) <= 2470) {
                                        setValue('fleche', 200)
                                    } else {
                                        setValue('fleche', 250)
                                    }
                                    break;
                                case 'Biaise':
                                    if (parseInt(configPortail.largeur) <= 3800) {
                                        setValue('fleche', 100)
                                    } else {
                                        setValue('fleche', 150)
                                    }
                                    break;
                                default:
                                    setValue('fleche', 'ERR')
                                    break;
                            }
                            break;
                        default:
                            total = (valeur1, valeur2) => Math.round((valeur1 - Math.sqrt((Math.pow(valeur1, 2)) - (Math.pow(((parseInt(getValues('largeurVantail')) - 132.5) * 2), 2) / 4)) - valeur2) * 100) / 100
                            switch (configPortail.forme) {
                                case 'Bombée':
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', total(2083, 1.8597))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', total(3294, 1.1757))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', total(5251, 0.7374))
                                    } else {
                                        setValue('fleche', total(8556, 0.4526))
                                    }
                                    break;
                                case 'Incurvée':
                                    if (parseInt(getValues('largeurVantail')) <= 1060) {
                                        setValue('fleche', total(2033, 1.9121))
                                    } else if (1060 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1360) {
                                        setValue('fleche', total(3244, 1.1913))
                                    } else if (1360 < parseInt(getValues('largeurVantail')) && parseInt(getValues('largeurVantail')) <= 1960) {
                                        setValue('fleche', total(5201, 0.74))
                                    } else {
                                        setValue('fleche', total(8506, 0.4517))
                                    }
                                    break
                                case 'CDG':
                                case 'CDGI':
                                    if (parseInt(getValues('largeurVantail')) <= 2470) {
                                        setValue('fleche', 200)
                                    } else {
                                        setValue('fleche', 250)
                                    }
                                    break;
                                case 'Biaise':
                                    if (parseInt(configPortail.largeur) <= 3800) {
                                        setValue('fleche', 100)
                                    } else {
                                        setValue('fleche', 150)
                                    }
                                    break;
                                default:
                                    setValue('fleche', 'ERR')
                                    break;
                            }
                            break;
                    }
                }
            }
            if (configPortail.forme === 'Droite') {
                (setValue('fleche', 0))
            }

            if ((configPortail.largeur < configPortail.LargeurMin) || (configPortail.largeur > configPortail.LargeurMax)) {
                setValue('fleche', 'Largeur hors limite')
            }


            /* ---------------------------------------------------- Fin Hauteur flèche --------------------------------------------------------- */

            /**
            * * Hauteur gaine : Est calculée en fonction de la motorisation et de la hauteur. 
            * * 
            */
            let valeurGaineMoteur = undefined;
            let valeur = (valeur) => Math.round((((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) + valeur) * 100) / 100
            switch (configPortail.modele) {
                /* PVC Confort  */
                case 'Ixia':
                case 'Tilleul':
                case 'Astéra':
                case 'Pin lisses verticales':
                case 'Erable':
                    valeur = (valeur1, valeur2, valeur3) => Math.round((((configPortail.hauteur - parseInt(getValues('fleche')) + valeur1) / valeur2) + valeur3) * 100) / 100
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 230)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', valeur(-260, 2, 230))
                            } else {
                                setValue('gaineMoteur', valeur(-260, 3, 230))
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            if (configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 35)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', valeur(-260, 2, 35))
                            } else {
                                setValue('gaineMoteur', valeur(-260, 3, 35))
                            }
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            if (configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 195)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', valeur(-260, 2, 195))
                            } else {
                                setValue('gaineMoteur', valeur(-260, 3, 195))
                            }
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            if (configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 155)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', valeur(-260, 2, 155))
                            } else {
                                setValue('gaineMoteur', valeur(-260, 3, 155))
                            }
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            if (configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 115)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', valeur(-260, 2, 115))
                            } else {
                                setValue('gaineMoteur', valeur(-260, 3, 115))
                            }
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            if (configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 135)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', valeur(-280, 2, 125))
                            } else {
                                setValue('gaineMoteur', valeur(-280, 3, 125))
                            }
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Frêne':
                case 'Camélia':
                case 'Mélèze':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(30))
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(-160))
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', valeur(-0))
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', valeur(-40))
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', valeur(-80))
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case "Autres...":
                            setValue('gaineMoteur', valeur(-60))
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;

                    }
                    break;

                case 'Platane':
                case 'Fougère':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur < 1000) {
                                setValue('gaineMoteur', 440)
                            } else if (1000 <= configPortail.hauteur && configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 560)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1500) {
                                setValue('gaineMoteur', 680)
                            } else {
                                setValue('gaineMoteur', 800)
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            if (configPortail.hauteur < 1000) {
                                setValue('gaineMoteur', 250)
                            } else if (1000 <= configPortail.hauteur && configPortail.hauteur < 1300) {
                                setValue('gaineMoteur', 370)
                            } else if (1300 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', 490)
                            } else {
                                setValue('gaineMoteur', 610)
                            }
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            if (configPortail.hauteur < 1100) {
                                setValue('gaineMoteur', 410)
                            } else if (1100 <= configPortail.hauteur && configPortail.hauteur < 1400) {
                                setValue('gaineMoteur', 530)
                            } else if (1400 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', 650)
                            } else {
                                setValue('gaineMoteur', 770)
                            }
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            if (configPortail.hauteur < 1100) {
                                setValue('gaineMoteur', (410 - 40))
                            } else if (1100 <= configPortail.hauteur && configPortail.hauteur < 1400) {
                                setValue('gaineMoteur', (530 - 40))
                            } else if (1400 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', (650 - 40))
                            } else {
                                setValue('gaineMoteur', (770 - 40))
                            }
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            if (configPortail.hauteur < 1100) {
                                setValue('gaineMoteur', (410 - 80))
                            } else if (1100 <= configPortail.hauteur && configPortail.hauteur < 1400) {
                                setValue('gaineMoteur', (530 - 80))
                            } else if (1400 <= configPortail.hauteur && configPortail.hauteur < 1700) {
                                setValue('gaineMoteur', (650 - 80))
                            } else {
                                setValue('gaineMoteur', (770 - 80))
                            }
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            let valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) / 120 * 120 + 50 - 60
                            let total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Pin lisses horizontales':
                case 'Silène':
                case 'Aulne':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 200)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 0)
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 170)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 110)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Aulne II':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 200)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 320)
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 170)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 230)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Dahlia':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(30))
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(- 160))
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', valeur(0))
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', valeur(-40))
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', valeur(-80))
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', valeur(-60))
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Mimosa':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 200)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 170)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            if (configPortail.hauteur <= 1400) {
                                valeurGaineMoteur = configPortail.hauteur - 390 - 60
                                total = Math.round(valeurGaineMoteur * 100) / 100
                                setValue('gaineMoteur', total)
                            } else if (1400 < configPortail.hauteur && configPortail.hauteur <= 1600) {
                                valeurGaineMoteur = configPortail.hauteur - 440 - 60
                                total = Math.round(valeurGaineMoteur * 100) / 100
                                setValue('gaineMoteur', total)
                            } else {
                                valeurGaineMoteur = configPortail.hauteur - 490 - 60
                                total = Math.round(valeurGaineMoteur * 100) / 100
                                setValue('gaineMoteur', total)
                            }
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Cèdre':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 200)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 0)
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 170)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 110)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Gentiane':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 200)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 320)
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 170)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 230)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                /* PVC Relax */
                case 'Charme':
                case 'Peuplier':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1600) {
                                setValue('gaineMoteur', 160)  /* TODO */
                            } else {
                                setValue('gaineMoteur', 170) /* TODO */
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 132)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 92)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 52)
                            break;
                        case 'Sans':
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 107)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Yucca':
                case 'Daphné':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 167)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 132)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 92)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 52)
                            break;
                        case 'Sans':
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 107)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Bambou':
                case 'Lavande':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(53))
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(-142))
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', valeur(18))
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', valeur(-22))
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', valeur(-62))
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 107)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                /* PVC Excellence */
                case 'Copalme':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1600) {
                                setValue('gaineMoteur', 160) /* TODO */
                            } else {
                                setValue('gaineMoteur', 170) /* TODO */
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 50)
                            break;
                        case 'Sans':
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 107)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;


                case 'Pensée':
                case 'Verveine':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 164)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 50)
                            break;
                        case 'Sans':
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 107)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Chêne':
                case 'Hêtre':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(56))
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(-139))
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', valeur(21))
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', valeur(-19))
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', valeur(-59))
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', valeur(-76))
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Menthe':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1600) {
                                setValue('gaineMoteur', 160) /* TODO */
                            } else {
                                setValue('gaineMoteur', 170) /* TODO */
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 50)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 108)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                /* ALU Authentique&Classique&Design */
                case 'Marronnier':
                case 'Févier':
                case 'Ronce':
                case 'Rosier':
                case 'Albizia':
                case 'Genévrier DECO':
                case 'Olivier':
                case 'Graphic':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(55))
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', valeur(-140))
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', valeur(20))
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', valeur(-20))
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', valeur(-60))
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', valeur(-40))
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Chataignier':
                case 'Noisetier':
                case 'Noisetier DECO':
                case 'Genévrier':
                case 'Noyer':
                case 'Aubépine':
                case 'Acacia':
                case 'Lierre':
                case 'Bonzaï':
                case 'Fybolia Design':
                case 'Roseau':
                case 'Saule':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 240)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 45)
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 205)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 164)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 84)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 170)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Cyprès':
                case 'Belombra':
                case 'Merisier':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1500) {
                                setValue('gaineMoteur', 235)
                            } else {
                                setValue('gaineMoteur', valeur(50))
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1500) {
                                setValue('gaineMoteur', 50)
                            } else {
                                setValue('gaineMoteur', valeur(-140))
                            }
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            if (configPortail.hauteur <= 1500) {
                                setValue('gaineMoteur', 205)
                            } else {
                                setValue('gaineMoteur', valeur(20))
                            }
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            if (configPortail.hauteur <= 1500) {
                                setValue('gaineMoteur', 164)
                            } else {
                                setValue('gaineMoteur', valeur(-20))
                            }
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            if (configPortail.hauteur <= 1500) {
                                setValue('gaineMoteur', 84)
                            } else {
                                setValue('gaineMoteur', valeur(-60))
                            }
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            if (configPortail.hauteur <= 1500) {
                                setValue('gaineMoteur', 170)
                            } else {
                                setValue('gaineMoteur', valeur(-40))
                            }
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }

                    break;

                /* ALU Minérale */
                case 'Ambre':
                case 'Topaze':
                case 'Topaze DECO':
                case 'Emeraude':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            setValue('gaineMoteur', 165)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            setValue('gaineMoteur', 'Nous contacter')
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            setValue('gaineMoteur', 130)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            setValue('gaineMoteur', 90)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            setValue('gaineMoteur', 50)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            setValue('gaineMoteur', 0)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Quartz': // ! Enorme différence entre < 1400 & > 1400
                case 'Opale':
                case 'Jade':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1400) {
                                setValue('gaineMoteur', 165)
                            } else {
                                if (configPortail.fixation === 'A') {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 45) / 2 + 35 + 45) + 60)
                                } else {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 35) / 2 + 35 + 35) + 60)
                                }
                            }
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            if (configPortail.hauteur <= 1400) {
                                setValue('gaineMoteur', 'Nous contacter')
                            } else {
                                if (configPortail.fixation === 'A') {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 45) / 2 + 35 + 45) - 135)
                                } else {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 35) / 2 + 35 + 35) - 135)
                                }
                            }
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            if (configPortail.hauteur <= 1400) {
                                setValue('gaineMoteur', 130)
                            } else {
                                if (configPortail.fixation === 'A') {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 45) / 2 + 35 + 45) + 25)
                                } else {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 35) / 2 + 35 + 35) + 25)
                                }
                            }
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            if (configPortail.hauteur <= 1400) {
                                setValue('gaineMoteur', 90)
                            } else {
                                if (configPortail.fixation === 'A') {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 45) / 2 + 35 + 45) - 15)
                                } else {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 35) / 2 + 35 + 35) - 15)
                                }
                            }
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            if (configPortail.hauteur <= 1400) {
                                setValue('gaineMoteur', 50)
                            } else {
                                if (configPortail.fixation === 'A') {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 45) / 2 + 35 + 45) - 55)
                                } else {
                                    setValue('gaineMoteur', ((configPortail.hauteur - 15 - 35) / 2 + 35 + 35) - 55)
                                }
                            }
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            if (configPortail.hauteur <= 1400) {
                                setValue('gaineMoteur', 0)

                            } else {
                                setValue('gaineMoteur', valeur(-35))
                            }
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;

                case 'Corail':
                    switch (configPortail.motorisation) {
                        case "BLR'KIT (CARDIN)":
                            valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) + 55
                            total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        case "VLGOS'KIT (CARDIN)":
                            valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) - 135
                            total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        case "AXOVIA 3S io (SOMFY)":
                            valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) + 25
                            total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        case "AXOVIA Multipro (SOMFY)":
                            valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) - 15
                            total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        case "ENERGY KIT (FAAC)":
                        case "KT STEALTH (CARDIN)":
                            valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) - 55
                            total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        case "Sans":
                            setValue('gaineMoteur', 0)
                            break;
                        case 'Autres...':
                            valeurGaineMoteur = ((configPortail.hauteur - parseInt(getValues('fleche'))) / 2 - 50) - 35
                            total = Math.round(valeurGaineMoteur * 100) / 100
                            setValue('gaineMoteur', total)
                            break;
                        default:
                            setValue('gaineMoteur', 'ERR')
                            break;
                    }
                    break;
                default:
                    setValue('gaineMoteur', 'ERR')
                    break;
            }

            if ((configPortail.hauteur < configPortail.hauteurMin) || (configPortail.hauteur > configPortail.hauteurMax)) {
                setValue('gaineMoteur', 'Hauteur hors limite')
            }

            /* ---------------------------------------------- Fin Hauteur gaine (motorisation) ------------------------------------------------- */

            /**
             * * Hauteur gaine gache & hauteur poignée : Sont calculées en fonction de la hauteur portail/portillon, de la disposition 
             * * de la serrure et de la hauteur de la flèche 
             */

            if (configPortail.gache === true) { // Cas - Portillon avec gâche électrique
                let tmpHtCoteSerrure = undefined;
                if (Utils.objUndef(configPortail)) {
                    switch (configPortail.serrure) {
                        case 'Droite poussant serrure côté bas':
                        case 'Droite tirant serrure côté bas':
                        case 'Gauche poussant serrure côté bas':
                        case 'Gauche tirant serrure côté bas':
                            tmpHtCoteSerrure = configPortail.hauteur - parseInt(getValues('fleche'))
                            break;
                        case 'Droite poussant serrure côté haut':
                        case 'Droite tirant serrure côté haut':
                        case 'Gauche poussant serrure côté haut':
                        case 'Gauche tirant serrure côté haut':
                            tmpHtCoteSerrure = configPortail.hauteur
                            break;
                        default:
                            tmpHtCoteSerrure = 0
                            break;
                    }
                } else {

                    tmpHtCoteSerrure = configPortail.hauteur - parseInt(getValues('fleche'))
                }
                if (tmpHtCoteSerrure > 700) {
                    for (let i = 500; i < 1100; i += 50) {
                        if (i + 200 <= parseInt(tmpHtCoteSerrure) && parseInt(tmpHtCoteSerrure) < i + 250) {
                            setValue('gaineGache', i + 40)
                            setValue('poignee', i)
                        }
                    }
                    if (1300 <= tmpHtCoteSerrure && tmpHtCoteSerrure < 1700) {
                        setValue('gaineGache', 1100)
                        setValue('poignee', 1060)
                    } else if (1700 <= tmpHtCoteSerrure && tmpHtCoteSerrure < 2050) {
                        setValue('gaineGache', 1120)
                        setValue('poignee', 1080)
                    } else if (2050 <= tmpHtCoteSerrure) {
                        setValue('gaineGache', 'Valeur trop haute')
                        setValue('poignee', 'Valeur trop haute')
                    }
                } else {
                    setValue('gaineGache', 'Valeur trop basse')
                    setValue('poignee', 'Valeur trop basse')
                }
            }


            /* ----------------------------------------- Fin hauteur gaine gache & hauteur poignée --------------------------------------------- */
        }

    }, [configPortail, getValues, setValue])

    return <>
        <Grid
            container
            justifyContent="center"
        >
            <Grid item sm={12} xs={12}>
                <div className={[css.selectedConfig, css.TopSelectedConfig, css.entete].join(' ')} style={{ marginBottom: 10, borderRadius: '0px 0px 2px 2px' }}>Obtenez vos dimensions</div>
            </Grid>

            {/* Hauteur de la flêche - */}
            <Grid
                item
                xs={5}
                className={css.espaceRes}
            >
                <Grid container className={[css.containerResultat, css.shadowB].join(' ')}>
                    <Grid item xs={12} className={css.labelResultat}  >
                        <Typography variant='subtitle2'>Hauteur de la flèche <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid item xs={12} className={css.centerResultat}>
                        {!Utils.objUndef(configPortail) || configPortail.forme === 'Droite' ? <Clear style={{ height: 26 }} /> : <FormControl >
                            <Controller
                                control={control}
                                name="fleche"
                                render={({ field }) =>
                                    <TextField
                                        className={css.textField}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                style: { textAlign: "center" }
                                            }
                                        }}
                                        onChange={(e) => { field.onChange(e) }}
                                        value={field.value}
                                        disabled

                                    />
                                }
                            />
                        </FormControl>}
                    </Grid>
                </Grid>

            </Grid>

            {/* Largeur vantail - */}
            <Grid
                item
                xs={5}
                className={css.espaceRes}
            >
                <Grid container direction="column" className={[css.containerResultat, css.shadowB].join(' ')}>
                    <Grid item xs={12} className={css.labelResultat}>
                        <Typography variant='subtitle2'>{Utils.objUndef(configPortail) && configPortail.type === 'Portillon' ? 'Largeur portillon' : 'Largeur de vantail'} <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid item xs={12} className={css.centerResultat}>
                        <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="largeurVantail"
                                render={({ field }) =>
                                    <TextField
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                style: { textAlign: "center" }
                                            }
                                        }}
                                        value={field.value}
                                        disabled
                                    />
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Grid>

            {/* Jeux Latéraux - */}
            <Grid
                item
                xs={5}
                className={css.espaceRes}
            >
                <Grid container direction="column" className={[css.containerResultat, css.shadowB].join(' ')} >
                    <Grid item xs={12} className={css.labelResultat}>
                        <Typography variant='subtitle2'>{(!Utils.objUndef(configPortail) || configPortail.type !== 'Coulissant') ? 'Jeux latéraux' : 'Chevauchements latéraux'} <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid item xs={12} className={css.centerResultat}>
                        <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="jeuxLateraux"
                                render={({ field }) =>
                                    <TextField
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                style: { textAlign: "center" }
                                            }
                                        }}
                                        value={field.value}
                                        disabled
                                    />
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Grid>

            {/* Hauteur sortie gaine moteur - */}
            <Grid
                item
                xs={5}
                className={css.espaceRes}
            >
                <Grid container direction="column" className={[css.containerResultat, css.shadowB].join(' ')}>
                    <Grid item xs={12} className={css.labelResultat}>
                        <Typography variant='subtitle2'>{Utils.objUndef(configPortail) && configPortail.motorisation === 'Autres...' ? 'Axe de traverse intermédiaire' : 'Hauteur sortie gaine moteur'} <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid item xs={12} className={css.centerResultat}>
                        {!Utils.objUndef(configPortail) || (Utils.objUndef(configPortail) && configPortail.motorisation === 'Sans') ? <Clear style={{ height: 26 }} /> :
                            <FormControl className={css.menuIndividuel}>
                                <Controller
                                    control={control}
                                    name="gaineMoteur"
                                    render={({ field }) =>
                                        <TextField
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                inputProps: {
                                                    style: { textAlign: "center" }
                                                }
                                            }}
                                            value={field.value}
                                            disabled
                                        />
                                    }
                                />
                            </FormControl>}
                    </Grid>
                </Grid>

            </Grid>

            {/* Hauteur poignée - */}
            <Grid
                item
                xs={5}
                style={{ marginRight: 10 }}
            >
                <Grid container direction="column" className={[css.containerResultat, css.shadowB].join(' ')} >
                    <Grid item xs={12} className={css.labelResultat}>
                        <Typography variant='subtitle2'>Hauteur poignée <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid item xs={12} className={css.centerResultat}>
                        {Utils.objUndef(configPortail) && configPortail.type === 'Portillon' && configPortail.gache === true ? <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="poignee"
                                render={({ field }) =>
                                    <TextField
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                style: { textAlign: "center" }
                                            }
                                        }}
                                        value={field.value}
                                        disabled
                                    />
                                }
                            />
                        </FormControl> : <Clear style={{ height: 26 }} />}
                    </Grid>
                </Grid>

            </Grid>

            {/* Hauteur sortie Gaine Gache - */}
            <Grid
                item
                xs={5}
                style={{ marginLeft: 10 }}
            >
                <Grid container direction="column" className={[css.containerResultat, css.shadowB].join(' ')} >
                    <Grid item xs={12} className={css.labelResultat}>
                        <Typography variant='subtitle2'>Hauteur sortie gaine gâche <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid item xs={12} className={css.centerResultat}>
                        {Utils.objUndef(configPortail) && configPortail.type === 'Portillon' && configPortail.gache === true ? <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="gaineGache"
                                render={({ field }) =>
                                    <TextField
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                style: { textAlign: "center" }
                                            }
                                        }}
                                        value={field.value}
                                        disabled
                                    />
                                }
                            />
                        </FormControl> : <Clear style={{ height: 26 }} />}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default Resultats