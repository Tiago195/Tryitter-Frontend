import React, { useState } from 'react';
import './app.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  theme,
  extendTheme
} from '@chakra-ui/react';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Explorer } from './pages/Explorer';
import { Profile } from './pages/Profile';

export const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') as string) || undefined);
  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  };
  const c = extendTheme({ breakpoints });

  return (
    <ChakraProvider theme={c}>
      <BrowserRouter>
        <Box display="flex" width="100vw" padding={{ sm: '0px', md: '0px 20px' }} >
          <Nav user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/explorer' element={<Explorer />} />
            <Route path='/profile/:arroba' element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
};
