import { Box, Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Skeleton, Stack, Text } from '@chakra-ui/react';
// import 'dotenv/config';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AiOutlineSearch } from 'react-icons/ai';

interface INews {
  source: {
    id: string,
    name: string
  },
  author?: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string
  content: string
}

export const Explorer = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [previewUsers, setPreviewUsers] = useState(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // const news = await (await axios.get('https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=f65a607c167340dd806bc49da8680942')).data;
      const t = await (await axios.get('http://localhost:3001/user')).data;
      setUsers(t);
      console.log(t);
      // setNews(news.articles);
    })();
    console.log(news);
  }, []);

  const search = ({ target }: any) => {
    setPreviewUsers(true);
    setInput(target.value);
  };

  return (
    <Box maxW="60vw">

      <Flex padding="10px" justifyContent="space-between" >
        <InputGroup _dark={{ bg: '#353c44' }} padding="2px 20px" borderRadius="20px">
          <InputLeftElement pointerEvents="none" ><AiOutlineSearch fontSize="1.4rem" /></InputLeftElement>

          <Input onFocus={() => setPreviewUsers(true)} onChange={search} placeholder='Buscar no Tryitter' variant='unstyled' />

        </InputGroup>

        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <Box
        h={previewUsers ? 'fit-content' : '0'}
        transition=".5s all"
        overflow="auto"
        _light={{ bg: '#ffffff' }} _dark={{ bg: '#1a202c' }}
        borderRadius="5px"
        p={previewUsers ? 3 : 0}
        position="fixed" display="flex"
        flexDirection="column" zIndex="1"
        border={previewUsers ? '1px' : 'none'}
        minW="60vw" maxH="50vh" gap="10px"
        onMouseLeave={() => setPreviewUsers(false)}
      >

        {users.filter(e => e.arroba.includes(input)).map(e => (
          <Box key={e.userId}>
            <Button display="flex" flexDirection="column" alignItems="self-start" w="100%" p={3} h="fit-content" onClick={() => navigate(`/profile/${e.arroba}`)}>
              <Text fontWeight="900">{e.name}</Text>
              <Text color="gray.500" fontWeight="100">@{e.arroba}</Text>
              <Text color="gray.500" fontWeight="100">{e.posts?.length || 0} Tryits</Text>
            </Button>
          </Box>
        ))}
      </Box>

      {!news.length && (
        <Stack minW="60vw">
          <Skeleton height='100px' />
          <Skeleton height='100px' />
          <Skeleton height='100px' />
          <Skeleton height='100px' />
          <Skeleton height='100px' />
        </Stack>
      )}
      {!!news.length && (
        news.map(e => (
          <Flex key={e.title} justifyContent="space-between" p={2} borderBottom="1px" borderColor="gray.700">
            <Box>
              <Text color="gray.500">{new Date(e.publishedAt).toLocaleDateString()}</Text>
              <Text marginBottom="10px">{e.title}</Text>
              <Text fontSize="0.8rem" color="gray.500">{e.description}</Text>
              <Text fontSize="0.7rem" marginTop="10px" color="#2FC18C"><a target="_blank" href={e.url} rel="noreferrer">Ler mais</a></Text>
            </Box>
            <Box>
              <Box backgroundSize="cover" backgroundPosition="center" borderRadius="10px" backgroundImage={e.urlToImage} height="85px" width="85px" />
            </Box>
          </Flex>
        ))
      )}
    </Box >
  );
};
