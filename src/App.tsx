import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  theme
} from '@chakra-ui/react';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Explorer } from './components/Explorer';
import { Profile } from './components/Profile';

export const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') as string) || undefined);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box display="flex" width="100vw" padding="0 3rem">
          <Nav user={user} setUser={setUser} />
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/explorer' element={<Explorer />} />
            <Route path='/profile/:arroba' element={<Profile />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
};
