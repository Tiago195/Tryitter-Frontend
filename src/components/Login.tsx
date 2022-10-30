import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { ModalLogin } from './ModalLogin';
import React from 'react';
import { ModalSubscribe } from './ModalSubscribe';

export const Login = ({ setUser }: any) => {
  const login = useDisclosure();
  const subscribe = useDisclosure();
  return (
    <Flex zIndex="1" bg="#2FC18C" position="fixed" width="100vw" height="50px" bottom="0" left="0" boxSizing="content-box" p="10px">
      <Box width="20%" />
      <Flex justifyContent="space-around" w="100%">
        <Flex direction="column">
          <Text fontWeight="800" fontSize="1.2rem">Não perca o que está acontecendo</Text>
          <Text>As pessoas que usam o Tryitter são as primeiras a saber.</Text>
        </Flex>
        <Flex gap="15px" alignItems="center">
          <ModalLogin view={login} setUser={setUser} otherView={subscribe} />
          <ModalSubscribe setUser={setUser} view={subscribe} otherView={login} />
        </Flex>
      </Flex>
    </Flex>
  );
};
