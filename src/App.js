import React from 'react';
import dataCalculateur from './dataCalculateur.json';
import Menus from './components/menus';
import Gamme from './classes/Gamme'
import Modele from './classes/Modele'
import Type from './classes/Type'
import Picture from './components/picture'
import { Button, ButtonGroup, Card, CardContent, Grid } from '@material-ui/core';
import globalStyle from './styles/globalStyles';
import { useState } from 'react';
import useStyles from './styles/styles';

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
                                elevation={2}>
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
                                elevation={2}>
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
                                elevation={2}>
                                <CardContent
                                    className={globalCss.cardContent}
                                    style={{ height: '100%' }}
                                >
                                    <Picture
                                        configPortail={configPortail}
                                        needPath={needPath}
                                        setNeedPath={setNeedPath}
                                    />
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
