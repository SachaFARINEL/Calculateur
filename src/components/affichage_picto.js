import useStyles from "../assets/styles/styles";
import * as React from 'react';
import Utils from "../../utils";
// import SERVER from '../../config/config'; 

const AffichagePicto = ({ configPortail }) => {

    const css = useStyles();
    let portailUrl = undefined;
    
    /* eslint-disable  */
    function choosePictoToDisplay() {
        if (Utils.objUndef(configPortail)) {
            portailUrl = '../assets/pictoPortail/' + configPortail.materiel + '/' + strNoAccent(configPortail.gamme) + '/'
                + '2 Vantaux' + '/' + strNoAccent(configPortail.modele) + '-' + strNoAccent(configPortail.forme) + '.jpg';
        } else {
            portailUrl = '../assets/pictoPortail/ALU/Minerale/2 Vantaux/Topaze-Droit.jpg'
        }
        return portailUrl
    }
    /* eslint-enable  */

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

    return <>
        

            {/* Affichage 'Picto' portail - */}

            <div className={css.divPortail}>
                <img className={css.photoPortail} src={choosePictoToDisplay()} alt='Picto portail'></img>
            </div>

    </>

}

export default AffichagePicto