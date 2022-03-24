import { useState } from 'react';
import dataCalculateur from '../dataCalculateur.json'
import { FormControl, Grid, MenuItem, Select, TextField, Typography } from "@material-ui/core"; // !
import * as React from 'react';
import { Controller, useForm } from "react-hook-form"; //!
import Utils from '../assets/utils';
import useStyles from "../assets/styles/styles";
import { Clear } from '@material-ui/icons';

const Menus = ({ materiels, setConfigPortail, configPortail, setNeedPath }) => {

    const css = useStyles();

    const typeSerrure =
        ["Droite poussant serrure côté bas", "Droite tirant serrure côté bas", "Gauche poussant serrure côté bas",
            "Gauche tirant serrure côté bas", "Droite poussant serrure côté haut", "Droite tirant serrure côté haut",
            "Gauche poussant serrure côté haut", "Gauche tirant serrure côté haut"]

    const [gammes, setGammes] = useState(materiels[0].gammes);
    const [modeles, setModeles] = useState(materiels[0].gammes[3].getModeles());
    const [types, setTypes] = useState(materiels[0].gammes[3].getModeles()[6].getTypes());
    const [formes, setFormes] = useState(materiels[0].gammes[3].getModeles()[6].getTypes()[0].getForme());
    const [motorisations, setMotorisations] = useState(dataCalculateur[0].motorisation);
    const [fixations, setFixations] = useState(materiels[0].gammes[3].getFixation());
    const [serrures, setSerrures] = useState(typeSerrure)
    const [, setTraverses] = useState(materiels[0].gammes[0].getModeles()[0].getTypes()[0].getForme());

    const init_values = {
        materiel: materiels[0].Matiere,
        albatros: false,
        gamme: materiels[0].gammes[3].getNom(),
        modele: materiels[0].gammes[3].getModeles()[6].getNom(),
        type: materiels[0].gammes[3].getModeles()[6].getTypes()[0].getNom(),
        forme: materiels[0].gammes[3].getModeles()[6].getTypes()[0].getForme()[0],
        motorisation: dataCalculateur[0].motorisation[0],
        gache: false,
        fixation: materiels[0].gammes[3].getFixation()[0],
        hauteur: 1400,
        largeur: 3500,
        serrure: typeSerrure[0],
        traverse: materiels[0].gammes[0].getModeles()[0].getTypes()[0].getForme()[0],
    }
    const { setValue, control, getValues } = useForm({ defaultValues: init_values })

    const handleMaterielChange = (e) => { updateValuesForm(true, true, true, true, true, true, false); setNeedPath(false) }
    const handleAlbatrosChange = (e) => { updateValuesForm(true, true, true, true, true, true, false); setNeedPath(false) }
    const handleGammeChange = (e) => { updateValuesForm(false, false, true, false, true, true, false); setNeedPath(false) }
    const handleModeleChange = (e) => { updateValuesForm(false, false, false, false, true, true, false); setNeedPath(false) }
    const handleLargeurChange = (e) => { updateValuesForm() };
    const handleTypeChange = (e) => { updateValuesForm(false, false, false, false, true, true, false); setNeedPath(false) }
    const handleFormeChange = (e) => { updateValuesForm(false, false, false, false, false, true, false) }
    const handleMotorisationChange = (e) => { updateValuesForm() }
    const handleGacheChange = (e) => { updateValuesForm(false, false, false, false, false, false, true) }
    const handleFixationChange = (e) => { updateValuesForm() }
    const handleHauteurChange = (e) => { updateValuesForm() };
    const handleSerrureChange = (e) => { updateValuesForm() }
    const handleTraverseChange = (e) => { updateValuesForm() };

    function updateValuesForm(withMateriel = false, withAlbatros = false, withGamme = false, withModele = false, withType = false, withForme = false, withGache = false) {

        if (withMateriel) {
            const materiel = materiels.filter(m => m.Matiere === getValues('materiel'))
            setGammes(materiel[0].gammes);
            setValue('gamme', materiel[0].gammes[0].getNom());
            if (getValues('materiel') === 'PVC') {
                setValue('albatros', false)
            }
        }
        if (withGamme) {
            const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
            const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
            setModeles(gamme[0].getModeles())
            setValue('modele', gamme[0].getModeles()[0].getNom())
            setFixations(gamme[0].getFixation())
            setValue('fixation', gamme[0].getFixation()[0])
        }
        if (withModele) {
            const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
            const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
            const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
            setTypes(modele[0].getTypes())
            setValue('type', modele[0].getTypes()[0].getNom())
        }
        if (withType) {
            const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
            const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
            const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
            const type = modele[0].getTypes().filter(t => t.getNom() === getValues('type'));
            setFormes(type[0].getForme())
            setValue('forme', type[0].getForme()[0])
            setMotorisations(dataCalculateur[0].motorisation)
            setValue('motorisation', dataCalculateur[0].motorisation[0])

        }
        if (withAlbatros) {
            const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
            const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
            const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
            if (getValues('albatros') === true) {
                const gammesAlbatros = materiel[0].gammes.filter(m => m.getNom() !== 'Minérale')
                setGammes(gammesAlbatros)
                setValue('gamme', gammesAlbatros[0].getNom())
                const typeAlbatros = modele[0].getTypes().filter(t => t.getNom() === '2 Vantaux');
                setTypes(typeAlbatros)
                setValue('type', typeAlbatros[0].getNom())
            } else {
                setGammes(materiel[0].gammes);
                setValue('gamme', materiel[0].gammes[0].getNom());
            }
        }
        if (withForme) {
            setTraverses(materiels[0].gammes[0].getModeles()[0].getTypes()[0].getForme());
            setValue('traverse', materiels[0].gammes[0].getModeles()[0].getTypes()[0].getForme()[0]);
        }
        if (withGache) {
            setSerrures(typeSerrure)
            setValue('serrure', typeSerrure[0])
        }
        const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
        const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
        const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
        const type = modele[0].getTypes().filter(t => t.getNom() === getValues('type'));
        setConfigPortail(Object.assign({}, getValues(), { 'hauteurMin': type[0].getHauteurMin() }, { 'hauteurMax': type[0].getHauteurMax() }, { 'LargeurMin': type[0].getLargeurMin() }, { 'LargeurMax': type[0].getLargeurMax() }))

    }

    function getLimitHauteurMin() {
        const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
        const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
        const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
        const type = modele[0].getTypes().filter(t => t.getNom() === getValues('type'));
        return type[0].getHauteurMin()
    }

    function getLimitHauteurMax() {
        const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
        const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
        const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
        const type = modele[0].getTypes().filter(t => t.getNom() === getValues('type'));
        return type[0].getHauteurMax()
    }

    function getLimitLargeurMin() {
        const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
        const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
        const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
        const type = modele[0].getTypes().filter(t => t.getNom() === getValues('type'));
        return type[0].getLargeurMin()
    }

    function getLimitLargeurMax() {
        const materiel = materiels.filter(m => m.Matiere === getValues('materiel'));
        const gamme = materiel[0].gammes.filter(g => g.getNom() === getValues('gamme'));
        const modele = gamme[0].getModeles().filter(m => m.getNom() === getValues('modele'));
        const type = modele[0].getTypes().filter(t => t.getNom() === getValues('type'));
        return type[0].getLargeurMax()
    }

    function moyenneDimension() {
        if (getValues('type') === 'Portillon') {
            setValue('largeur', 1300)
            setValue('hauteur', 1400)
        } else {
            setValue('largeur', 3500)
            setValue('hauteur', 1400)
        }
    }
    
    return <>

        <Grid item sm={12} xs={12}>
            <div className={[css.selectedConfig, css.TopSelectedConfig, css.entete].join(' ')}>Choissisez votre modèle</div>
        </Grid>

        <Grid
            container
            className={css.shadowB}
        >

            {/* Matériel */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}
            >
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}
                    >
                        <Typography variant='subtitle2'>Matière</Typography>
                    </Grid>
                    <Grid item xs={7} className={css.center}>
                        <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="materiel"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleMaterielChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}
                                    >
                                        {materiels.map((m, n) => {
                                            return <MenuItem key={n} value={m.Matiere}>{m.Matiere}</MenuItem>
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Grid>

            {/* Albatros */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Albatros</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={[css.center, !Utils.objUndef(configPortail) || configPortail.materiel === 'ALU' ? '' : css.notAvailable].join(' ')}
                    >
                        {!Utils.objUndef(configPortail) || configPortail.materiel !== 'PVC' ? <Controller
                            name={"albatros"}
                            control={control}
                            render={({ field }) =>
                                <input type='checkbox'
                                    {...field}
                                    checked={field.value}
                                    color='primary'
                                    onChange={e => { field.onChange(e); handleAlbatrosChange(e) }}

                                />
                            }
                        /> : <Clear />}
                    </Grid>
                </Grid>
            </Grid>

            {/* Gamme */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Gamme</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={css.center}
                    >
                        <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="gamme"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleGammeChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}

                                    >
                                        {gammes.map((g, n) => {
                                            if (!Utils.strUndef(g)) {
                                                return <MenuItem key={n} value={''}>{''}</MenuItem>
                                            } else {
                                                return <MenuItem key={n} value={g.getNom()}>{g.getNom()}</MenuItem>
                                            }
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>


            </Grid>

            {/* Modèle */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Modèle</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={css.center}
                    >
                        <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="modele"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleModeleChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}

                                    >
                                        {modeles.map((m, n) => {
                                            if (!Utils.strUndef(m)) {
                                                return <MenuItem key={n} value={''}>{''}</MenuItem>
                                            } else {
                                                return <MenuItem key={n} value={m.getNom()}>{m.getNom()}</MenuItem>
                                            }
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Grid>

            {/* Type */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Type</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={css.center}
                    >
                        <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleTypeChange(e); moyenneDimension() }}
                                        disableUnderline
                                        className={css.centerAndFocus}

                                    >
                                        {types.map((t, n) => {
                                            if (!Utils.strUndef(t)) {
                                                return <MenuItem key={n} value={''}>{''}</MenuItem>
                                            } else {
                                                return <MenuItem key={n} value={t.getNom()}>{t.getNom()}</MenuItem>
                                            }
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Grid>

            {/* Forme */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Forme</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={css.center}
                    >
                        <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="forme"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleFormeChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}

                                    >
                                        {formes.map((f, n) => {
                                            if (!Utils.strUndef(f)) {
                                                return <MenuItem key={n} value={''}>{''}</MenuItem>
                                            } else {
                                                return <MenuItem key={n} value={f}>{f}</MenuItem>
                                            }
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>


            </Grid>

            {/* Motorisation */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Motorisation</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={[css.center, (Utils.objUndef(configPortail) && configPortail.type === 'Coulissant') || (Utils.objUndef(configPortail) && configPortail.albatros === true) ? css.notAvailable : ''].join(' ')}
                    >
                        {(Utils.objUndef(configPortail) && configPortail.type === 'Coulissant') || (Utils.objUndef(configPortail) && configPortail.albatros === true) ? <Clear /> : <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="motorisation"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleMotorisationChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}

                                    >
                                        {motorisations.map((mot, n) => {
                                            if (!Utils.strUndef(mot)) {
                                                return <MenuItem key={n} value={''}>{''}</MenuItem>
                                            } else {
                                                return <MenuItem key={n} value={mot}>{mot}</MenuItem>
                                            }
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>}
                    </Grid>
                </Grid>

            </Grid>

            {/* Fixation */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Fixation</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={[css.center, (Utils.objUndef(configPortail) && configPortail.type === 'Coulissant') || (Utils.objUndef(configPortail) && configPortail.albatros === true) ? css.notAvailable : ''].join(' ')}
                    >
                        {(Utils.objUndef(configPortail) && configPortail.type === 'Coulissant') || (Utils.objUndef(configPortail) && configPortail.albatros === true) ? <Clear /> :
                            <FormControl fullWidth className={css.menuIndividuel}>
                                <Controller
                                    control={control}
                                    name="fixation"
                                    render={({ field }) =>
                                        <Select {...field}
                                            value={field.value}
                                            onChange={(e) => { field.onChange(e); handleFixationChange(e) }}
                                            disableUnderline
                                            className={css.centerAndFocus}

                                        >
                                            {fixations.map((s, n) => {
                                                return <MenuItem key={n} value={s}>Solution {s}</MenuItem>
                                            })}
                                        </Select>
                                    }
                                />
                            </FormControl>}
                    </Grid>
                </Grid>
            </Grid>


            {/* Traverse */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}
            >
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Traverse</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={[css.center, (!Utils.objUndef(configPortail) || configPortail.gamme !== 'Authentique' || (configPortail.gamme === 'Authentique' && configPortail.forme === 'Droite')) ? css.notAvailable : ''].join(' ')}
                    >
                        {!Utils.objUndef(configPortail) || configPortail.gamme !== 'Authentique' ? <Clear /> : <FormControl fullWidth className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="traverse"
                                render={({ field }) =>
                                    <Select
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleTraverseChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}
                                        disabled={!Utils.objUndef(configPortail) || configPortail.gamme !== 'Authentique' || (configPortail.gamme === 'Authentique' && configPortail.forme === 'Droite') ? true : false}
                                    >
                                        <MenuItem key='Droite' value='Droite'>Droite</MenuItem>
                                        <MenuItem key={getValues('forme')} value={getValues('forme')}>{getValues('forme')}</MenuItem>
                                    </Select>
                                }
                            />
                        </FormControl>}
                    </Grid>
                </Grid>
            </Grid>

            {/* Gâche électrique */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}
            >
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Gâche électrique</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={[css.center, !Utils.objUndef(configPortail) || configPortail.type !== 'Portillon' ? css.notAvailable : ''].join(' ')}
                    >

                        {!Utils.objUndef(configPortail) || configPortail.type !== 'Portillon' ? <Clear /> : <Controller
                            name={"gache"}
                            control={control}
                            render={({ field }) =>
                                <input type='checkbox'
                                    {...field}
                                    checked={field.value}
                                    color='primary'
                                    onChange={e => { field.onChange(e); handleGacheChange(e) }}
                                    size='small'
                                />
                            }
                        />}
                    </Grid>
                </Grid>
            </Grid>

            {/* Serrure */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}
                style={{ borderRadius: '0 0 2px 2px' }}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Serrure</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={[css.center, !Utils.objUndef(configPortail) || configPortail.gache === false || configPortail.type !== 'Portillon' ? css.notAvailable : ''].join(' ')}
                    >
                        {!Utils.objUndef(configPortail) || configPortail.gache === false || configPortail.type !== 'Portillon' ? <Clear /> : <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="serrure"
                                render={({ field }) =>
                                    <Select {...field}
                                        value={field.value}
                                        onChange={(e) => { field.onChange(e); handleSerrureChange(e) }}
                                        disableUnderline
                                        className={css.centerAndFocus}

                                    >
                                        {serrures.map((s, n) => {
                                            return <MenuItem key={n} value={s}>{s}</MenuItem>
                                        })}
                                    </Select>
                                }
                            />
                        </FormControl>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Grid
            container
            style={{ marginTop: 32 }}
            className={css.shadowB}
        >
            {/* Largeur entre piliers */}
            <Grid
                item
                sm={12}
                xs={12}
                className={[css.selectedConfig, css.TopSelectedConfig].join(' ')}
                style={{ borderRadius: '2px 2px 0 0' }}
            >
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant="subtitle2">Largeur entre piliers <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={css.center}
                    >
                        <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="largeur"
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                maxLength: "4",
                                                style: { textAlign: "center" },
                                            }
                                        }}
                                        placeholder="Largeur (mm)"
                                        onChange={(e) => { field.onChange(e); handleLargeurChange(e); }}
                                        value={field.value}
                                        onClick={(e) => e.target.select()}
                                    />
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            {/* Hauteur portail */}
            <Grid
                item
                sm={12}
                xs={12}
                className={css.selectedConfig}
                style={{ borderRadius: '0 0 2px 2px' }}>
                <Grid
                    container
                >
                    <Grid
                        item
                        xs={5}
                        className={css.labelSelectedConfig}>
                        <Typography variant='subtitle2'>Hauteur du {+!Utils.objUndef(configPortail) || configPortail.type !== 'Portillon' ? 'portail' : 'portillon'} <span style={{ fontSize: 10 }}>(mm)</span></Typography>
                    </Grid>
                    <Grid
                        item
                        xs={7}
                        className={css.center}
                    >
                        <FormControl className={css.menuIndividuel}>
                            <Controller
                                control={control}
                                name="hauteur"
                                render={({ field }) =>
                                    <TextField
                                        InputProps={{
                                            disableUnderline: true,
                                            inputProps: {
                                                maxLength: "4",
                                                style: { textAlign: "center" }
                                            }
                                        }}
                                        id='hauteur'
                                        placeholder="Hauteur (mm)"
                                        onChange={(e) => { field.onChange(e); handleHauteurChange(e) }}
                                        value={field.value}
                                        onClick={(e) => e.target.select()}
                                    />
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>


            <Grid
                item
                style={{ width: '100%' }}
                className={[css.labelSelectedConfig, css.leftDimensions].join(' ')}
            >
                <Typography variant='subtitle2'>
                    <span style={{ fontWeight: 'normal' }}> Dimensions limites pour le modèle </span> {Utils.objUndef(configPortail) ? configPortail.modele : 'Topaze'} <span style={{ fontWeight: 'normal' }}> en </span> {Utils.objUndef(configPortail) ? configPortail.type.toLowerCase() : '2 Vantaux'}
                </Typography>
            </Grid>
            <Grid container
                className={css.dimensions}
            >
                <Grid item
                    className={[css.center, css.notAvailable].join(' ')}
                    xs={12}>
                    <Typography variant='subtitle2'> <span style={{ fontWeight: 'normal' }}>Largeur : de </span>{getLimitLargeurMin()} <span style={{ fontWeight: 'normal' }}>à</span> {getLimitLargeurMax()} <span style={{ fontWeight: 'normal' }}>mm</span> </Typography>
                </Grid>
                <Grid item
                    className={[css.center, css.notAvailable].join(' ')}
                    xs={12}>
                    <Typography variant='subtitle2'> <span style={{ fontWeight: 'normal' }}>Hauteur : de </span>{getLimitHauteurMin()} <span style={{ fontWeight: 'normal' }}>à</span> {getLimitHauteurMax()} <span style={{ fontWeight: 'normal' }}>mm</span> </Typography>
                </Grid>
            </Grid>


        </Grid>

    </>
}

export default Menus;