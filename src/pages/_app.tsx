import { SessionProvider } from "next-auth/react";
import { createTheme, CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import React, { useState, useMemo, useContext } from "react";
import lightTheme from "@/theme/lightTheme";
import darkTheme from "@/theme/darkTheme";
import Header from "@/components/Header";
import Layout from "@/components/Layout";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = ({
  Component, pageProps: { session, ...pageProps }
}) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const ToggleColorMode = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('dark');
    
    const colorMode = useMemo(() => ({
      toggleColorMode: () => {
        setMode((prevMode: "light" | "dark") => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }), []);

    const darkThemechosen = useMemo(() =>
      createTheme({
        ...darkTheme,
      }),
    [mode]);

    const lightThemechosen = useMemo(() =>
      createTheme({
        ...lightTheme,
      }),
    [mode]);

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={mode === 'dark' ? darkThemechosen : lightThemechosen}>
          <SessionProvider session={session}>
            <CssBaseline />
            <Header ColorModeContext={ColorModeContext}/>
            <Layout>
            <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  };

  return <ToggleColorMode />;
};

export default App;
