import { Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { api } from '../services/axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import { IUser } from '../pages/Profile';

type TView = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
}

type Props = {
  view: TView
  otherView: TView,
  setUser: any
}

export const ModalLogin = ({ view: { isOpen, onOpen, onClose }, otherView, setUser }: Props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigation = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const changeView = () => {
    onClose();
    otherView.onOpen();
  };

  const login = async () => {
    const body = {
      email: email.current?.value,
      password: password.current?.value
    };
    try {
      const data = await (await api.post('/login', body)).data;

      setUser((user: IUser) => ({ ...user, ...data }));
      localStorage.setItem('user', JSON.stringify(data));
      navigation('/');
      onClose();
    } catch (er) {
      const message = (er as any).response.data.message ? 'Email ou senha invalida' : `${Object.keys((er as any).response.data.errors)[0]} invalido.`;

      toast({
        title: 'Erro ao fazer login',
        description: message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} borderRadius="25px" border="1px solid white" _light={{ bg: 'none' }}>Entrar</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader display="flex" gap="10px">
            <Text as="h1">Entrar no Tryitter </Text>
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
              <FormLabel >Password</FormLabel>
              <Input ref={password} placeholder='Password' />
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" flexDirection="column" gap="50px">
            <Button w="100%" borderRadius="25px" onClick={login}>Entrar</Button>
            <Text display="inline-flex" gap="10px">Não tem uma conta?
              <Text color='#2FC18C'><Text cursor="pointer" onClick={changeView}>Inscreva-se</Text></Text>
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
