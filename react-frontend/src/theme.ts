import {createTheme, PaletteOptions} from "@mui/material";

const palette: PaletteOptions = {
    mode: 'dark',
    primary : {
        main: '#FFCD00',
        contrastText: '#242526'
    },
    secondary : {
        main: '#242526',
        contrastText: '#242526'
    },
    background: {
        default: '#242526',
        paper: '#FFCD00',
    },
}

const theme = createTheme({
    palette: palette,
})

export default theme