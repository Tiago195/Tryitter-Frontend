import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Toast, useDisclosure, useToast } from '@chakra-ui/react';
import logo from './logo.svg';

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/axios';

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

export type Modules = {
  moduloId: number,
  name: string,
}

export const ModalSubscribe = ({ view: { isOpen, onOpen, onClose }, otherView, setUser }: Props) => {
  const [modules, setModules] = useState<Modules[]>([]);
  const toast = useToast();
  const navigation = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const arroba = useRef<HTMLInputElement>(null);
  const modulo = useRef<HTMLSelectElement>(null);
  // const [modulo, setModulo] = useState('');
  const changeView = () => {
    onClose();
    otherView.onOpen();
  };

  const createAccount = async () => {

    const body = {
      email: email.current?.value,
      name: name.current?.value,
      password: password.current?.value,
      arroba: arroba.current?.value,
      moduloId: modulo.current?.value
    };
    try {
      const token = await (await api.post('/user', body)).data;
      const user = await (await api.get(`/user/${body.arroba}`)).data;
      delete user.password;

      setUser({ ...user, token });
      localStorage.setItem('user', JSON.stringify({ ...user, token }));
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

  useEffect(() => {
    (async () => {
      const modules = await (await api.get('/module')).data;
      setModules(modules);
    })();
  }, []);

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
            <Flex alignItems="center">
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input ref={name} placeholder='Nome' />
              </FormControl>
              <FormControl>
                <FormLabel>Modulo</FormLabel>
                <Select ref={modulo} placeholder='Selecione o modulo'>
                  {modules.map(module => (
                    <option value={module.moduloId} key={module.moduloId}>{module.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            <FormControl>
              <InputGroup>
                <InputLeftElement>@</InputLeftElement>
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
