import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AiOutlineEllipsis, AiOutlineHeart } from 'react-icons/ai';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { InputTryitar } from './InputTryitar';
import { IPost, Post } from './Post';
// import { Post } from './Post';



export const Home = ({ user }: any) => {
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
      const data = await (await axios.get('http://localhost:3001/posts')).data;
      setPosts(data);
    });
  }, []);

  return (
    <Box minH="100vh" maxW="60vw" fontSize="xl" flex="2">

      <Flex padding="10px" justifyContent="space-between">
        <Text>Página inicial</Text>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <InputTryitar />
      {posts.map(e => (
        <Post key={e.postId} post={e} />
      ))}
    </Box >
  );
};
