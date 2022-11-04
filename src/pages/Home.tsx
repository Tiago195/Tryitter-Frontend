import { Box, Flex, Text } from '@chakra-ui/react';
import { api } from '../services/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AiOutlineEllipsis, AiOutlineHeart } from 'react-icons/ai';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { InputTryitar } from '../components/InputTryitar';
import { IPost, Post } from '../components/Post';
import { IUser } from './Profile';
// import { Post } from './Post';

type Props = {
  user: IUser
}

export const Home = ({ user }: Props) => {
  // const theme = useTheme();
  const [posts, setPosts] = useState<IPost[]>([]);

  const navigation = useNavigate();

  useEffect(() => {
    if (!user) {
      navigation('/explorer');
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await (await api.get('/posts')).data;
      setPosts(data);
    });
  }, []);

  return (
    <Box minH="100vh" maxW={['100vw', '100vw', '60vw']} fontSize="xl" flex="2">

      <Flex padding="10px" justifyContent="space-between">
        <Text>Página inicial</Text>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
      <Box display={['none', 'none', 'flex']}>
        <InputTryitar />
      </Box>
      {/* {posts.map(e => (
      ))} */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Box >
  );
};
