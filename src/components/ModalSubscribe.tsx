import { Box, Button, FormControl, FormHelperText, FormLabel, Image, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Toast, useDisclosure, useToast } from '@chakra-ui/react';
import logo from './logo.svg';

import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ModalSubscribe = ({ view: { isOpen, onOpen, onClose }, otherView, setUser }: any) => {
  // const {  } = useDisclosure();
  const toast = useToast();
  const navigation = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const arroba = useRef<HTMLInputElement>(null);
  const changeView = () => {
    onClose();
    otherView.onOpen();
  };

  const createAccount = async () => {
    // console.log(email, name, password);

    const body = {
      email: email.current?.value,
      name: name.current?.value,
      password: password.current?.value,
      arroba: arroba.current?.value,
    };
    try {
      const token = await (await axios.post('http://localhost:3001/user', body)).data;
      delete body.password;
      setUser((old: any) => ({ ...old, ...body, token }));
      localStorage.setItem('user', JSON.stringify({ ...body, token }));
      navigation('/');
      onClose();
    } catch (er) {
      const message = (er as any).response.data.message ? 'Usuario ja existe' : `${Object.keys((er as any).response.data.errors)[0]} invalido.`;
      console.log(er);
      toast({
        title: 'Erro ao criar conta',
        description: message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} borderRadius="25px" bg="white" color="black" _hover={{ background: '#F2F2F2' }}>Inscrever-se</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader display="flex" gap="10px">
            <Text as="h1">Inscrever-se no Tryitter </Text>
            <Box width="1.9rem">
              <Image src={logo} color="red" />
            </Box>
          </ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap="20px">
            <FormControl >
              <FormLabel >Email</FormLabel>
              <Input ref={email} placeholder='Email' />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input ref={password} placeholder='Password' />
            </FormControl>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input ref={name} placeholder='Nome' />
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement>@</InputLeftElement>
                {/* <FormLabel>Arroba</FormLabel> */}
                <Input ref={arroba} placeholder='Arroba' />
              </InputGroup>
              <FormHelperText>É por esse nome que as pessoas vão te encontrar</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" flexDirection="column" gap="50px">
            <Button w="100%" borderRadius="25px" onClick={createAccount}>Inscrever-se</Button>
            <Text display="inline-flex" gap="10px">Já tem uma conta?
              <Text color='#2FC18C'><Text cursor="pointer" onClick={changeView}>Entrar</Text></Text>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};