import React from 'react';
import { Typography } from '@material-ui/core';
import { useRef } from 'react';
import useStyles from '../styles/styles';
import Utils from '../utils';



const Picture = ({ configPortail, needPath, setNeedPath }) => {
    const css = useStyles();
    let portailUrl = undefined;
    let nombre_essais = 0;

    function splitSerrure(position) {
        let splittedSerrure;
        if (!Utils.objUndef(configPortail)) {
            splittedSerrure = ('Droite poussant serrure côté bas').split(' ')
        } else {
            splittedSerrure = (configPortail.serrure).split(' ');
        }
        return splittedSerrure[position]
    }

    let firstWord = splitSerrure(0);
    let lastWord = splitSerrure(4);

    function choosePictoToDisplay() {
        if (Utils.objUndef(configPortail)) {
            if (configPortail.type !== 'Portillon') {
                if (configPortail.traverse === 'Droite') {
                    portailUrl = '/assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/'
                        + strNoAccent(configPortail.type) + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '.jpg';
                } else {
                    portailUrl = '/assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/'
                        + strNoAccent(configPortail.type) + '/Traverse/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '.jpg';
                }
            } else {
                if (configPortail.forme === 'Droite' || configPortail.forme === 'Bombée' || configPortail.forme === 'Incurvée') {
                    if (configPortail.gache === true) {
                        portailUrl = '/assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-' + firstWord + '.jpg';
                    } else {
                        portailUrl = '/assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-droite.jpg';
                    }
                } else {
                    if (configPortail.gache === true) {
                        portailUrl = '/assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-' + firstWord + '-' + lastWord + '.jpg';
                    } else {
                        portailUrl = '/assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-droite-haut.jpg';
                    }
                }
            }
        } else {
            portailUrl = '/assets/pictoPortail/ALU/Minerale/2 Vantaux/Topaze-Droite.jpg'
        }
        return portailUrl
    }

    function pictoPortillonGenerique() {
        if (configPortail.type === 'Portillon') {
            if (configPortail.forme === 'Droite' || configPortail.forme === 'Bombée' || configPortail.forme === 'Incurvée') {
                imageRef.current.src = '/assets/pictoPortail/generique/portillon/' + strNoAccent(configPortail.forme) + '-' + firstWord + '.jpg';
            } else {
                imageRef.current.src = '/assets/pictoPortail/generique/portillon/' + strNoAccent(configPortail.forme) + '-' + firstWord + '-' + lastWord + '.jpg';
            }
        }
    }

    const imageRef = useRef(undefined);
    const handleError = async (e) => {
        const pictoPortailGenerique = '/assets/pictoPortail/generique/coulissantGenerique.png'
        if (Utils.objUndef(configPortail)) {
            setNeedPath(true)
            if (configPortail.type !== 'Portillon') {
                if (nombre_essais <= 3) {
                    setTimeout(() => {
                        imageRef.current.src = pictoPortailGenerique
                        nombre_essais++
                    }, 200);
                }
            } else {
                if (nombre_essais <= 3) {
                    setTimeout(() => {
                        pictoPortillonGenerique()
                        nombre_essais++
                    }, 200);
                }
            }
        }
    }

    function strNoAccent(a) {
        var b = "áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
            c = "aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
            d = "";
        for (var i = 0, j = a.length; i < j; i++) {
            var e = a.substr(i, 1);
            d += (b.indexOf(e) !== -1) ? c.substr(b.indexOf(e), 1) : e;
        }
        return d;
    }


    const conditionPointHautBombee = Utils.objUndef(configPortail) && configPortail.forme === 'Bombée' && configPortail.type === 'Portillon' && (configPortail.modele === 'Camélia' || configPortail.modele === 'Cèdre' || configPortail.modele === 'Dahlia' || configPortail.modele === 'Gentiane' || configPortail.modele === 'Tulipe' || configPortail.modele === 'Mimosa')

    const nameImg = () => {
        let nomImage = undefined;
        if (Utils.objUndef(configPortail)) {
            if (configPortail.type === 'Portillon') {
                if (configPortail.forme === 'Droite' || configPortail.forme === 'Bombée' || configPortail.forme === 'Incurvée') {
                    nomImage = strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-' + firstWord + '.jpg'
                } else {
                    nomImage = strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-' + firstWord + '-' + lastWord + '.jpg'
                }
            } else if (configPortail.type === 'Coulissant') {
                nomImage = strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '.jpg'
            }
        }
        return nomImage
    }

    const selectBestHeight = () => {
        let value = undefined;
        if (conditionPointHautBombee && needPath) {
            value = '70%'
        } else if (conditionPointHautBombee || needPath) {
            value = '80%'
        }
        return value
    }

    return <>

        {conditionPointHautBombee && <div className={css.messageHauteurMotant}><Typography variant='subtitle2'>Le point haut du portillon peut ne pas dépasser la hauteur des montants </Typography> </div>}

        {needPath === true && <div style={{ textAlign: 'center' }}>Image définitive à ajouter dans : <span style={{ fontWeight: 'bold' }}>{'pictoPortail/' + strNoAccent(configPortail.materiel) + '/' + strNoAccent(configPortail.gamme) + '/' + strNoAccent(configPortail.type)}</span> <br></br>
            Nom de l'image : <span style={{ fontWeight: 'bold' }}>{nameImg()} </span></div>}

        <div className={css.divPortail} style={{ height: selectBestHeight() }}>
            <img ref={imageRef} className={css.photoPortail} src={choosePictoToDisplay()} alt='Picto portail' onError={handleError}></img>
        </div>

    </>

}

export default Picture;