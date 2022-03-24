import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider, alpha } from '@material-ui/core';

const ThemeConfig = {
    primary: {
        main: '#027DB6',
        text: '#ffffff'
    },
    secondary: {
        main: '#ffffff',
        variant1: '#f9f9f9',
        variant2: '#e7e7e7',
        text: '#161616'
    }
}

const Theme = createTheme({
    palette: {
        primary: {
            main: ThemeConfig.primary.main,
            contrastText: ThemeConfig.primary.text
        },
        secondary: {
            main: ThemeConfig.secondary.main,
            contrastText: ThemeConfig.secondary.text
        },
        background: {
            default: ThemeConfig.secondary.main,
            main: ThemeConfig.secondary.main,
            paper: ThemeConfig.secondary.main,
            contrastText: ThemeConfig.secondary.text,
            secondary: ThemeConfig.secondary.variant1,
            light: ThemeConfig.secondary.variant2,
        },
        text: {
            primary: ThemeConfig.secondary.text,
            secondary: ThemeConfig.secondary.text,
            disabled: ThemeConfig.secondary.text,
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                ':root': {
                    '--primary-main': hexToRgbA(ThemeConfig.primary.main),
                    '--primary-contrastText': hexToRgbA(ThemeConfig.primary.text),
                    '--secondary-main': hexToRgbA(ThemeConfig.secondary.main),
                    '--secondary-variant-1': hexToRgbA(ThemeConfig.secondary.variant1),
                    '--secondary-variant-2': hexToRgbA(ThemeConfig.secondary.variant2),
                    '--secondary-contrastText': hexToRgbA(ThemeConfig.secondary.text),
                },
                'input[type="date"]::-webkit-calendar-picker-indicator': {
                    filter: (ThemeConfig.secondary.text.toLowerCase().includes('#fff') ? 'invert(100)' : 'invert(0)'),
                }
            },
        },
        MuiInput: {
            input: {
                color: ThemeConfig.secondary.text,
            },
            underline: {
                '&:before, &:not(.Mui-disabled):hover::before': {
                    borderColor: ThemeConfig.secondary.text,
                },
                "& .MuiSvgIcon-root, & + .MuiFormHelperText-root": {
                    color: ThemeConfig.secondary.text,
                },
            }
        },
        MuiSelect: {
            icon: {
                color: ThemeConfig.secondary.text,
            }
        },
        MuiButton: {
            contained: {
                '&.Mui-disabled': {
                    color: alpha(ThemeConfig.secondary.text, 0.26),
                    backgroundColor: alpha(ThemeConfig.secondary.text, 0.12),
                }
            },
        },
        MuiTooltip: {
            tooltip: {
                whiteSpace: 'pre-wrap'
            }
        }
    }
})


function hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
    }
    throw new Error('Bad Hex');
}

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <App />
    </ThemeProvider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
