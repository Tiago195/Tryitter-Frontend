import { Avatar, Box, Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Select, Text, useDisclosure } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IUser } from '../pages/Profile';
import { api } from '../services/axios';
import { Modules } from './ModalSubscribe';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


type Props = {
  user: IUser,
  setUser: (param: IUser) => void
  setUserProfile: Dispatch<SetStateAction<IUser>>
}

export const ModalEditProfile = ({ user, setUser, setUserProfile }: Props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<Modules[]>([]);
  const [showPassword, setshowPassword] = useState(false);
  const handleClick = () => setshowPassword(!showPassword);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const modulo = useRef<HTMLSelectElement>(null);
  const arroba = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<any>(user.img);
  const [base64, setBase64] = useState<string>(user.img);
  const navigator = useNavigate();

  useEffect(() => {
    setImg(user.img);
  }, [user.img]);

  useEffect(() => {
    (async () => {
      const modules = await (await api.get('/module')).data;
      setModules(modules);
    })();
  }, []);

  const changeImg = async ({ target }: any) => {
    if (target.files != null) {
      setImg(URL.createObjectURL(target.files[0] as Blob));
      setBase64(await convertToBase64(target.files[0]));
    }
  };

  const close = () => {
    setImg(user.img);
    onClose();
  };

  const convertToBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      // console.log(img);
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const saveChanges = async () => {
    try {
      setLoading(true);
      const userStorage = JSON.parse(localStorage.getItem('user') as string);

      const body = {
        email: email.current?.value,
        password: password.current?.value,
        name: name.current?.value,
        moduloId: modulo.current?.value,
        img: base64.replace(/^data:image\/(png|jpg);base64,/, ''),
        arroba: arroba.current?.value
      };

      const data = await (await api.put(`/user/${user.userId}`, body, { headers: { Authorization: 'Bearer ' + userStorage.token } })).data;

      const local = { ...userStorage, ...data };
      delete local.posts;

      localStorage.setItem('user', JSON.stringify(local));

      navigator(`/profile/${data.arroba}`);
      // window.location.reload();
      // console.log(local);
      setUser(local);
      setUserProfile((old) => ({ ...old, ...local }));
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} borderRadius="25px" border="1px solid white" _light={{ borderColor: 'black' }}>Editar Perfil</Button>
      <Modal
        isOpen={isOpen}
        onClose={close}
      >
        <ModalOverlay />
        <ModalContent padding="10px">
          <ModalHeader display="flex" gap="10px" justifyContent="space-between">
            <Text as="h1">Editar Perfil </Text>
            <Flex gap="10px">
              <Button colorScheme='red' onClick={onClose}>Cancelar</Button>
              <Button onClick={saveChanges}>Salvar</Button>
            </Flex>
          </ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap="20px">
            <FormControl>
              <FormLabel cursor="pointer" w="150px" h="150px">
                {/* <Box> */}
                <Avatar fontSize="80px" w="100%" h="100%" size="2x1" name={user.name} src={img} />
                {/* </Box> */}
              </FormLabel>
              <Input onChange={changeImg} type="file" display="none" />
            </FormControl>
            <FormControl >
              <FormLabel >Email</FormLabel>
              <Input ref={email} defaultValue={user.email} placeholder='Email' />
            </FormControl>
            <Flex alignItems="center">
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input defaultValue={user.name} ref={name} placeholder='Nome' />
              </FormControl>
              <FormControl>
                <FormLabel>Modulo</FormLabel>
                <Select defaultValue={user.modulo.moduloId} ref={modulo} placeholder='Selecione o modulo'>
                  {modules.map(module => (
                    <option value={module.moduloId} key={module.moduloId}>{module.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            <FormControl>
              <InputGroup>
                <InputLeftElement>@</InputLeftElement>
                <Input defaultValue={user.arroba} ref={arroba} placeholder='Arroba' />
              </InputGroup>
              <FormHelperText>É por esse nome que as pessoas vão te encontrar</FormHelperText>
            </FormControl>
            <InputGroup>
              {/* <FormControl > */}
              <FormLabel >Password</FormLabel>
              <Input type={showPassword ? 'text' : 'password'} ref={password} defaultValue={user.password} placeholder='Password' />
              <InputRightElement>
                <Button bg="none" h='1.75rem' size='sm' onClick={handleClick}>{showPassword ? < HiOutlineEyeOff /> : < HiOutlineEye />}</Button>
              </InputRightElement>
              {/* </FormControl> */}
            </InputGroup>
          </ModalBody>
          {loading && (<Progress size="xs" isIndeterminate />)}
        </ModalContent>
      </Modal>
    </>
  );
};
