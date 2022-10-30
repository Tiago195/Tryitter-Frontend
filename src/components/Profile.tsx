import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Post, IPost } from './Post';

export interface IUser {
  arroba: string,
  createdAt: string,
  email: string,
  name: string,
  password: string
  posts: IPost[],
  userId: number
}

export const Profile = () => {
  const { arroba } = useParams();
  const [user, setUser] = useState<IUser>({
    arroba: '',
    createdAt: '',
    email: '',
    name: '',
    password: '',
    posts: [],
    userId: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await (await axios.get(`http://localhost:3001/user/${arroba}`)).data;
        setUser(data);
      } catch (error) {
        navigate('/notFound');
      }
    })();
  }, []);

  return (
    <Box minH="100vh" maxW="60vw" fontSize="xl" flex="2">
      <Flex padding="10px" justifyContent="space-between" alignItems="center">

        <Box display="inline-flex" gap="20px" alignItems="center">
          <BsArrowLeft fontSize="1.8rem" />
          <Box>
            <Box display="inline-flex" gap="10px">
              <Text>{user.name}</Text>
              <Center height='inherit'>
                <Divider orientation='vertical' />
              </Center>
              <Text>Ingressou em {new Date(user.createdAt).toLocaleDateString()}</Text>
            </Box>
            <Text color="gray.500" fontWeight="100" fontSize="1rem">{user.posts.length} Tryits</Text>
          </Box>
        </Box>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <Box padding="10px 0">
        <Text borderBottom="1px" paddingLeft="10px" paddingBottom="5px" as="h1">Meus Tryits</Text>
        <Box>
          {user.posts.map(post => (
            <Post key={post.postId} post={post} />
          ))}
        </Box>
      </Box>

    </Box>
  );
};
