import { makeStyles, alpha } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    containerViewCalculator: {
        width: '100%',
        height: '100%',
        margin: '0 -20px',
        [theme.breakpoints.up('md')]: {
            overflow: 'hidden',
        }
    },
    gridTwin: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield'
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0
        },
    },
    viewCalculator: {
        height: '100%',
        width: 'calc(200% + 80px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        transform: 'translateX(0)',
        '&.showRight': {
            transform: 'translateX(-50%)'
        }
    },
    tabViewCalculator: {
        height: '100%',
        width: '50%',
        padding: '0 20px'
    },
    menuIndividuel: {
        maxWidth: '80%',
    },
    divPortail: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        left: 0,
        padding: 10,
    },
    photoPortail: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    photoTwin: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    selectedConfig: {
        borderRight: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderLeft: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderBottom: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
    },
    TopSelectedConfig: {
        borderTop: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderRadius: '2px 2px 0 0',
    },
    labelSelectedConfig: {
        background: alpha(theme.palette.secondary.contrastText, 0.05),
        borderRight: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            background: 'rgba(0,0,0,0.05)'
        }
    },
    centerResultat: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 32,
    },
    notAvailable: {
        background: alpha(theme.palette.secondary.contrastText, 0.05),
    },
    entete: {
        background: theme.palette.primary.main,
        fontSize: 18,
        padding: 4,
        color: theme.palette.primary.contrastText,
    },
    containerResultat: {
        border: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderRadius: 5,
    },
    containerResultatWithoutLeft: {
        borderTop: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderBottom: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderRight: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
    },
    containerResultatWithoutTopAndBottom: {
        borderRight: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        borderLeft: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
    },
    labelResultat: {
        background: alpha(theme.palette.secondary.contrastText, 0.05),
        borderBottom: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    itemTwin: {
        borderBottom: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
    },
    shadowB: {
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
    },
    espaceRes: {
        margin: '0 10px',
        marginBottom: 10
    },
    centerAndFocus: {
        '& .MuiSelect-select:focus': {
            background: 'transparent'
        },
        paddingLeft: 12,
        marginRight: -12,
    },
    dimensions: {
        border: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
    },
    leftDimensions: {
        borderLeft: '1px solid ' + alpha(theme.palette.secondary.contrastText, 0.3),
    }







}), { index: 999 });

export default useStyles;