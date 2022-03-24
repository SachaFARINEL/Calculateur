import React from 'react';
import './App.css';

import dataCalculateur from './dataCalculateur.json';
import Menus from './components/menus';
import Gamme from './classes/Gamme'
import Modele from './classes/Modele'
import Type from './classes/Type'
import { Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@material-ui/core';
import globalStyle from './assets/styles/globalStyles';
import { useState, useRef } from 'react';
import useStyles from './assets/styles/styles';
// import SERVER from '../../config/config';
import Utils from './assets/utils';
import Resultats from './components/resultats'
import Twinslider from './components/twinslider'


//mapping sur Materiel : 
const Materiels = dataCalculateur[3].materiel.map(item => {
    //Sort par ordre alphabétique
    const gammesSorted = item.gamme.sort(function (a, b) {
        return a.nom.localeCompare(b.nom);
    });
    let gammes = gammesSorted.map(g => {
        //creation de l'objet Gamme : 
        const gamme = new Gamme(g.nom, g.fixation);

        //Sort par ordre alphabétique
        const modelesSorted = g.modele.sort(function (a, b) {
            return a.nom_modele.localeCompare(b.nom_modele)
        })

        //mapping des modeles dans l'array de la gamme
        gamme.setModeles(modelesSorted.map(m => {
            //creation de l'objet Modèle : 
            const modele = new Modele(m.nom_modele);

            //mapping des gammes dans l'array des types
            modele.setTypes(m.type.map(t => {
                //creation de l'objet Type : 
                const type = new Type(t.nom_type, t.forme_superieure, t.hauteur_min, t.hauteur_max, t.largeur_min, t.largeur_max);

                return type
            }))
            return modele;
        }));

        return gamme
    })
    return { Matiere: item.nom_materiel, gammes };
})

const App = () => {

    const css = useStyles();
    const globalCss = globalStyle();
    let portailUrl = undefined;

    const [configPortail, setConfigPortail] = useState(undefined)
    const [tabRight, setTabRight] = useState(false);
    const [needPath, setNeedPath] = useState(false);

    const ButtonSwitchMode = () => {
        return (
            <>
                <ButtonGroup disableElevation size="small" color="primary" style={{ marginLeft: 22 }}>
                    <Button style={{ zIndex: 1 }} onClick={(e) => { setTabRight(false) }} variant={!tabRight ? 'contained' : 'outlined'}>Portails</Button>
                    <Button style={{ zIndex: 1 }} onClick={(e) => { setTabRight(true) }} variant={tabRight ? 'contained' : 'outlined'}>TwinSliders</Button>
                </ButtonGroup >
            </>
        )
    }

    function splitSerrure() {
        let splittedSerrure;
        if (!Utils.objUndef(configPortail)) {
            splittedSerrure = ('Droite poussant serrure côté bas').split(' ')
        } else {
            splittedSerrure = (configPortail.serrure).split(' ');
        }
        return splittedSerrure
    }
    let firstWord = splitSerrure()[0];
    let lastWord = splitSerrure()[4];

    function choosePictoToDisplay() {
        if (Utils.objUndef(configPortail)) {
            if (configPortail.type !== 'Portillon') {
                if (configPortail.traverse === 'Droite') {
                    portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/'
                        + strNoAccent(configPortail.type) + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '.jpg';
                } else {
                    portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/'
                        + strNoAccent(configPortail.type) + '/Traverse/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '.jpg';
                }
            } else {
                if (configPortail.forme === 'Droite' || configPortail.forme === 'Bombée' || configPortail.forme === 'Incurvée') {
                    if (configPortail.gache === true) {
                        portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-' + firstWord + '.jpg';
                    } else {
                        portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-droite.jpg';
                    }
                } else {
                    if (configPortail.gache === true) {
                        portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-' + firstWord + '-' + lastWord + '.jpg';
                    } else {
                        portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/Portillon'
                            + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '-droite-haut.jpg';
                    }
                }
            }
        } else {
            portailUrl = '../assets/pictoPortail/ALU/Minerale/2 Vantaux/Topaze-Droite.jpg'
        }
        return portailUrl
    }

    function pictoPortillonGenerique() {
        if (configPortail.type === 'Portillon') {
            if (configPortail.forme === 'Droite' || configPortail.forme === 'Bombée' || configPortail.forme === 'Incurvée') {
                imageRef.current.src = '../assets/pictoPortail/generique/portillon/' + strNoAccent(configPortail.forme) + '-' + firstWord + '.jpg';
            } else {
                imageRef.current.src = '../assets/pictoPortail/generique/portillon/' + strNoAccent(configPortail.forme) + '-' + firstWord + '-' + lastWord + '.jpg';
            }
        }
    }
    const imageRef = useRef(undefined);
    const handleError = async (e) => {
        const pictoPortailGenerique = '../assets/pictoPortail/generique/coulissantGenerique.png'
        if (Utils.objUndef(configPortail)) {
            setNeedPath(true)
            if (configPortail.type !== 'Portillon') {
                imageRef.current.src = pictoPortailGenerique
            } else {
                pictoPortillonGenerique()
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

    return <>

        <div className={css.containerViewCalculator} >
            <Grid
                container
                justifyContent='center'
                style={{ marginBottom: 15 }}
            >
                <Grid
                    item
                    xl={7}
                    lg={10}
                    md={12}
                    xs={12}
                >
                    <ButtonSwitchMode />
                </Grid>
            </Grid>
            <div className={[css.viewCalculator, (tabRight ? 'showRight' : '')].join(' ')}>
                <div className={css.tabViewCalculator} >
                    <Grid
                        container
                        spacing={2}
                        style={{ height: '100%' }}
                        justifyContent='center'
                    >
                        <Grid
                            item
                            xl={3}
                            lg={4}
                            sm={5}
                            xs={12}
                        >
                            <Card
                                elevation={0}>
                                <CardContent
                                    className={globalCss.cardContent}
                                    style={{ height: '100%', textAlign: 'center' }}
                                >
                                    <Menus
                                        materiels={Materiels}
                                        setConfigPortail={setConfigPortail}
                                        configPortail={configPortail}
                                        setNeedPath={setNeedPath}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid
                            item
                            xl={4}
                            lg={6}
                            sm={7}
                            xs={12}
                        >
                            <Card
                                style={{ marginBottom: '3%', textAlign: 'center' }}
                                elevation={0}>
                                <CardContent
                                    className={globalCss.cardContent}
                                    style={{ maxHeight: '100%' }}
                                >
                                    <Resultats
                                        configPortail={configPortail}
                                        materiels={Materiels}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                style={{ height: '291px' }}
                                elevation={0}>
                                <CardContent
                                    className={globalCss.cardContent}
                                    style={{ height: '100%' }}
                                >

                                    {conditionPointHautBombee ?
                                        <div style={{ textAlign: 'center', color: 'red' }}><Typography variant='subtitle2'>Le point haut du portillon peut ne pas dépasser la hauteur des montants </Typography> </div> : ''}

                                    {needPath === true ? <div style={{ textAlign: 'center' }}>Image définitive à ajouter dans : <span style={{ fontWeight: 'bold' }}>{'pictoPortail/' + strNoAccent(configPortail.materiel) + '/' + strNoAccent(configPortail.gamme) + '/' + strNoAccent(configPortail.type)}</span> <br></br>
                                        Nom de l'image : <span style={{ fontWeight: 'bold' }}>{nameImg()} </span></div> : ''}

                                    <div className={css.divPortail} style={{ height: ((conditionPointHautBombee || needPath) ? '70%' : '100%') }}>
                                        <img ref={imageRef} className={css.photoPortail} src={choosePictoToDisplay()} alt='Picto portail' onError={handleError}></img>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <div
                    className={css.tabViewCalculator}>
                    <Twinslider />
                </div>
            </div>
        </div>

    </>
}

export default App;
