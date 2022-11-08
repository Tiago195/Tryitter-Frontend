import { Avatar, Box, Button, Center, Divider, Flex, Image, Text } from '@chakra-ui/react';
import React, { Dispatch, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

import { Modules } from '../components/ModalSubscribe';

import { api } from '../services/axios';
import { Post, IPost } from '../components/Post';
import { ModalEditProfile } from '../components/ModalEditProfile';

export interface IUser {
  userId: number,
  arroba: string,
  email: string,
  name: string,
  password: string
  posts: IPost[],
  createdAt: string,
  img: string,
  modulo: Modules
}

type Props = {
  user: any,
  setUser: Dispatch<any>
}

export const Profile = ({ setUser, user }: Props) => {
  const { arroba } = useParams();
  const [userProfile, setUserProfile] = useState<IUser>({
    arroba: '',
    createdAt: '',
    email: '',
    name: '',
    password: '',
    posts: [],
    userId: 0,
    img: '',
    modulo: { moduloId: 0, name: '' }
  });
  const navigate = useNavigate();
  // const userStorage = JSON.parse(localStorage.getItem('user') as string);

  useEffect(() => {
    (async () => {
      try {
        const data = await (await api.get(`/user/${arroba}`)).data;
        // console.log(data);
        setUserProfile(data);
      } catch (error) {
        navigate('/notFound');
      }
    })();
  }, []);
  return (
    <Box minH="100vh" maxW={['100vw', '100vw', '60vw']} fontSize="xl" flex="2">
      <Flex padding="10px" justifyContent="space-between" alignItems="center">

        <Box display="inline-flex" gap="20px" alignItems="center">
          <BsArrowLeft fontSize="1.8rem" cursor="pointer" onClick={() => navigate('/')} />
          <Box>
            <Box display="inline-flex" gap="10px" className='profile-header'>
              <Text >{userProfile.name}</Text>
            </Box>
            <Text color="gray.500" fontWeight="100" fontSize="1rem">{userProfile.posts.length} Tryits</Text>
          </Box>
        </Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <Box padding="10px">
        <Flex marginBottom="30px" justifyContent="space-between">
          <Box padding="5px" w="150px">
            <Avatar size="2xl" name={userProfile.name} src={userProfile.img} />
          </Box>
          {user.arroba === userProfile.arroba && (
            <ModalEditProfile setUserProfile={setUserProfile} setUser={setUser} user={userProfile} />
          )}
        </Flex>
        <Text>{userProfile.email}</Text>
        <Text color="gray.500" fontWeight="100" fontSize="1rem">@{userProfile.arroba}</Text>
        <Text color="gray.500" fontWeight="100" fontSize="1rem">Ingressou em {new Date(userProfile.createdAt).toLocaleDateString()}</Text>
      </Box>

      <Box padding="10px 0">
        <Text borderBottom="1px" paddingLeft="10px" paddingBottom="5px" as="h1">{user.arroba === userProfile.arroba ? 'Meus Tryits' : `Tryits de ${userProfile.name}`} </Text>
        <Box>
          {userProfile.posts.map(post => (
            <Post key={post.postId} post={post} user={userProfile} />
          ))}
        </Box>
      </Box>

    </Box>
  );
};
