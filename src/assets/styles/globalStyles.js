import { makeStyles } from "@material-ui/core/styles";

const globalStyle = makeStyles((theme) => ({
    LayoutRoot: {
        backgroundColor: theme.palette.background.main,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    cardContent: {
        backgroundColor: theme.palette.background.main,
        color: theme.palette.background.contrastText,
        padding: "15px!important",
        position: 'relative'
    },
    LayoutWrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        zIndex: 0,
        backgroundColor: theme.palette.background.light,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 75
        }
    },
    LayoutContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    LayoutContent: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '70vw',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '75vw',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '85vw',
        }
    },
    modalContainer: {
        backgroundColor: theme.palette.background.light,
        outline: 'none!important',
        position: 'relative',
        maxWidth: '100%',
    },
    modalHeader: {
        padding: '10px 15px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    modalTitle: {
        fontSize: '1.6em',
        lineHeight: '1.6em',
    },
    modalClose: {
        filter: 'drop-shadow(0px 0px 15px rgba(255,255,255,0.3))',
        position: 'absolute',
        top: 0,
        right: 0,
        transform: 'translate(50%,-50%)',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.8rem',
    },
    modalBody: {
        padding: '10px 15px',
        maxHeight: '80vh',
        overflow: 'auto',
    },
    modalFooter: {
        padding: '10px 15px',
        backgroundColor: theme.palette.background.main,
        color: theme.palette.background.contrastText,
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& > button + button': {
            marginLeft: '15px',
        }
    },
    buttonInfo:{
        color: '#FFF',
        backgroundColor: "#0288d1",
        '&:hover, &:focus, &:active': {
            backgroundColor: "#01579b"
        }
    },
    buttonSuccess: {
        color: '#FFF',
        backgroundColor: "#5bb521",
        '&:hover, &:focus, &:active': {
            backgroundColor: "#3f7e17"
        }
    },
    buttonWarning: {
        color: '#FFF',
        backgroundColor: "#ff9800",
        '&:hover, &:focus, &:active': {
            backgroundColor: "#f57c00"
        }
    },
    buttonError: {
        color: '#FFF',
        backgroundColor: "#f44336",
        '&:hover, &:focus, &:active': {
            backgroundColor: "#aa2e25"
        }
    },
    link: {
        color: theme.palette.background.contrastText,
        transition: '0.2s ease color',
        "&:hover, &:focus": {
            color: theme.palette.primary.main,
        }
    },
    exportLink: {
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        color: theme.palette.primary.main,
        '& > span': {
            lineHeight: '1em',
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        '& .MuiSvgIcon-root': {
            fontSize: '1.3em',
            verticalAlign: 'middle'
        }
    },
    CustomDataGridFooter: {
        '& .MuiDataGrid-footerContainer .MuiDataGrid-selectedRowCount': {
            display: 'none',
        }
    }
}), { index: 999 });

export default globalStyle;