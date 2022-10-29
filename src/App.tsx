import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme
} from '@chakra-ui/react';
import { Nav } from './components/Nav';
import { Home } from './components/Home';

export const App = () => {
  const [render, setRender] = useState('home');

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" width="100vw" padding="0 3rem">
        <Nav />
        {render == 'home' && <Home />}
        {render == 'profile' && <Home />}
        {render == 'explore' && <Home />}
      </Box>
    </ChakraProvider>
  );
};
