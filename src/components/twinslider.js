import useStyles from "../styles/styles";
import { FormControl, Grid, TextField, CardContent, Card, Typography, } from "@material-ui/core";
import * as React from 'react';
import { Controller, useForm } from "react-hook-form";
// import SERVER from '../../config/config';
import globalStyle from "../styles/globalStyles";

const Twinslider = () => {

  const css = useStyles();
  const globalCss = globalStyle();

  let portailUrl = '../assets/pictoPortail/generique/twinSlider.png'

  const init_values = {
    largeurTotale: 3900,
    largeurPassage: 2310,
    largeurRefoulement: 1590,
    largeurVantail: 1470,
  }

  const { setValue, control, getValues } = useForm({ defaultValues: init_values })

  const handleLargeurTotaleChange = (e) => { updateValuesForm(true, false, false) };
  const handleLargeurPassageChange = (e) => { updateValuesForm(false, true, false) };
  const handleLargeurRefoulementChange = (e) => { updateValuesForm(false, false, true) };

  function updateValuesForm(withLargeurTotale = false, withLargeurPassage = false, withLargeurRefoulement = false) {
    if (withLargeurTotale) {
      setValue('largeurPassage', (Math.round((2 * parseInt(getValues('largeurTotale')) - 870) / 3) * 100) / 100)
      setValue('largeurRefoulement', (Math.round(parseInt(getValues('largeurTotale')) - getValues('largeurPassage')) * 100) / 100)
      setValue('largeurVantail', (Math.round(parseInt(getValues('largeurRefoulement')) - 120) * 100) / 100)
    }
    if (withLargeurPassage) {
      setValue('largeurVantail', (Math.round(((parseInt(getValues('largeurPassage')) + 30)) / 2 + 300) * 100) / 100)
      setValue('largeurRefoulement', (Math.round(parseInt(getValues('largeurVantail')) + 120) * 100) / 100)
      setValue('largeurTotale', (Math.round(parseInt(getValues('largeurPassage')) + parseInt(getValues('largeurRefoulement'))) * 100) / 100)
    }
    if (withLargeurRefoulement) {
      setValue('largeurVantail', (Math.round((parseInt(getValues('largeurRefoulement'))) - 120) * 100) / 100)
      setValue('largeurPassage', (Math.round((parseInt(getValues('largeurVantail'))) * 2 - 600 - 30) * 100) / 100)
      setValue('largeurTotale', (Math.round(parseInt(getValues('largeurRefoulement')) + parseInt(getValues('largeurPassage'))) * 100) / 100)
    }
  }

  return <>
    <Grid container justifyContent="center" spacing={2}>

      <Grid item
        xl={2}
        lg={3}
        sm={12}
        xs={12} >
        <Card>
          <CardContent className={globalCss.cardContent}>
            <Grid item sm={12} xs={12}>
              <div style={{ textAlign: 'center' }} className={[css.selectedConfig, css.TopSelectedConfig, css.entete].join(' ')}>Indiquez la dimension que vous connaissez</div>
            </Grid>
            <Grid container style={{ marginTop: 10 }} className={[css.containerResultat, css.shadowB].join(' ')}>
              <Grid item xs={12} className={[css.center, css.itemTwin, css.notAvailable].join(' ')} style={{ height: 32 }}>
                <Typography variant='subtitle2'>Largeur totale <span style={{ fontSize: 10 }}>(mm)</span></Typography>
              </Grid>
              <Grid item xs={12} className={css.center}>
                <FormControl>
                  <Controller
                    control={control}
                    name="largeurTotale"
                    render={({ field }) =>
                      <TextField
                        onChange={(e) => { field.onChange(e); handleLargeurTotaleChange(e) }}
                        InputProps={{
                          disableUnderline: true,
                          inputProps: {
                            maxLength: "4",
                            style: { textAlign: "center" }
                          }
                        }}
                        value={field.value}
                        onClick={(e) => e.target.select()}
                      />
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 10 }} className={[css.containerResultat, css.shadowB].join(' ')}>
              <Grid item xs={12} className={[css.center, css.itemTwin, css.notAvailable].join(' ')} style={{ height: 32 }}>
                <Typography variant='subtitle2'>Largeur de passage <span style={{ fontSize: 10 }}>(mm)</span></Typography>
              </Grid>
              <Grid item xs={12} className={css.center}>
                <FormControl>
                  <Controller
                    control={control}
                    name="largeurPassage"
                    render={({ field }) =>
                      <TextField
                        onChange={(e) => { field.onChange(e); handleLargeurPassageChange(e) }}
                        InputProps={{
                          disableUnderline: true,
                          inputProps: {
                            maxLength: "4",
                            style: { textAlign: "center" }
                          }
                        }}
                        value={field.value}
                        onClick={(e) => e.target.select()}
                      />
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 10 }} className={[css.containerResultat, css.shadowB].join(' ')}>
              <Grid item xs={12} className={[css.center, css.itemTwin, css.notAvailable].join(' ')} style={{ height: 32 }}>
                <Typography variant='subtitle2'>Largeur de refoulement <span style={{ fontSize: 10 }}>(mm)</span></Typography>
              </Grid>
              <Grid item xs={12} className={css.center}>
                <FormControl>
                  <Controller
                    control={control}
                    name="largeurRefoulement"
                    render={({ field }) =>
                      <TextField
                        onChange={(e) => { field.onChange(e); handleLargeurRefoulementChange(e) }}
                        InputProps={{
                          disableUnderline: true,
                          inputProps: {
                            maxLength: "4",
                            style: { textAlign: "center" }
                          }
                        }}
                        value={field.value}
                        onClick={(e) => e.target.select()}
                      />
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container style={{ marginTop: 74 }} className={[css.containerResultat, css.shadowB].join(' ')}>
              <Grid item xs={12} className={[css.center, css.itemTwin, css.notAvailable].join(' ')} style={{ height: 32 }}>
                <Typography variant='subtitle2'>Largeur du vantail <span style={{ fontSize: 10 }}>(mm)</span></Typography>
              </Grid>
              <Grid item xs={12} className={[css.center, css.notAvailable].join(' ')}>
                <FormControl>
                  <Controller
                    control={control}
                    name="largeurVantail"
                    render={({ field }) =>
                      <TextField
                        onChange={(e) => { field.onChange(e); handleLargeurTotaleChange(e) }}
                        InputProps={{
                          disableUnderline: true,
                          inputProps: {
                            maxLength: "4",
                            style: { textAlign: "center" }
                          }
                        }}
                        value={field.value}
                      />
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>


      <Grid item xl={5}
        lg={7}
        sm={7}
        xs={12} className={css.gridTwin}>
        <Card>
          <CardContent className={globalCss.cardContent} style={{ height: 459.47 }}>
            <img className={css.photoTwin} src={portailUrl} alt='Twin Slider'></img>
          </CardContent>
        </Card>
      </Grid>
    </Grid>


  </>

}

export default Twinslider