import { Box, Flex, FormLabel, Input, Skeleton, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {

    (async () => {
      const news = await (await axios.get('https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=f65a607c167340dd806bc49da8680942')).data;
      setNews(news.articles);
    })();
    console.log(news);
  }, []);
  return (
    <Box>

      <Flex padding="10px" justifyContent="space-between" >
        <FormLabel display="flex" alignItems="center" width="70%" gap="15px" bg="#353c44" padding="2px 20px" borderRadius="20px">
          <AiOutlineSearch fontSize="1.4rem" />
          <Input
            placeholder='Buscar no Tryitter'
            focusBorderColor="none"
            border="none"
          />
        </FormLabel>

        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      {!news.length && (
        <Stack width="73vw">
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
