import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme
} from '@chakra-ui/react';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Explorer } from './components/Explorer';

export const App = () => {
  const [render, setRender] = useState('home');

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" width="100vw" padding="0 3rem">
        <Nav changeRender={setRender} />
        {render == 'home' && <Home />}
        {render == 'profile' && <Home />}
        {render == 'explore' && <Explorer />}
      </Box>
    </ChakraProvider>
  );
};
