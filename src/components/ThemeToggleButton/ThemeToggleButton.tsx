import { createTheme, CssBaseline, IconButton, ThemeProvider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useMemo, useContext } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from "@mui/material/Box";

export type ThemeToggleButtonProps = {
    ColorModeContext: React.Context<{ toggleColorMode: () => void; }>,
}

const ThemeToggleButton = (props: ThemeToggleButtonProps) => {

    const mobileCheck = useMediaQuery(queryinput:'min-width: 500px');


    const { ColorModeContext = React.createContext(defaultValue: { toggleColorMode: () => {} })} = props;
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    
    return (
        <>
            {mobileCheck && (
                <Typography>{theme.palette.mode}</Typography>)
            }
            <IconButton sx={{ mr: 2 }} title={theme.palette.mode + 'mode' aria-label={theme.palette.mode + 'mode button'}} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
        
        </>
        )
}

export default ThemeToggleButton;

/**
 <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
              }}
            ></Box>
            </Box>
**/