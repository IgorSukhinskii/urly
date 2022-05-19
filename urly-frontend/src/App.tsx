import React from 'react';
import { Switch, Route } from 'wouter';
import { Stack, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ShortenUrlForm from './pages/shorten-url-form';
import LinkPage from './pages/link-page';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <Switch>
          <Route path='/' component={ShortenUrlForm} />
          <Route path='/links/:shortUrl' component={LinkPage} />
        </Switch>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
