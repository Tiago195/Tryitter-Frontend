import { Box, Button, CircularProgress, CircularProgressLabel, Textarea } from '@chakra-ui/react';
import React, { SetStateAction, Dispatch, useRef, useState } from 'react';
import { api } from '../services/axios';
import { IPost } from './Post';

export const InputTryitar = () => {
  const [value, setValue] = useState('');
  const trackColor = value.length >= 280 ? 'red' : 280 - value.length <= 20 ? 'yellow' : '#2FC18C';
  const t = useRef<HTMLTextAreaElement>(null);

  const postTryit = async () => {
    const userStorage = JSON.parse(localStorage.getItem('user') as string);
    await api.post(`/post/${userStorage.userId}`, { content: value }, { headers: { Authorization: 'Bearer ' + userStorage.token } });
    // console.log(c);
    setValue('');
    window.location.reload();
  };

  return (
    <Box className='tryitter-container' h="100%" display='flex' width="100%" marginBottom="10px" alignItems="center" gap="10px">

      <Textarea
        ref={t}
        resize="none"
        border="none"
        onChange={({ target }) => setValue(target.value)}
        focusBorderColor='none'
        placeholder='O que está acontecendo?'
        paddingLeft="10px"
        paddingRight="0"
        fontSize="1.3rem"
        _placeholder={{ color: 'gray.500' }}
        w="100%"
        h="100%"
      />
      <Box display="flex">

        <Box borderLeft="1px" borderRight="1px" padding="0 10px" borderColor="gray.700">
          <CircularProgress size="2.3rem" value={value.length} thickness="4px" max={280} color={trackColor}>
            <CircularProgressLabel>{280 - value.length}</CircularProgressLabel>
          </CircularProgress>
        </Box>

        <Box className='tryitter-container-btn'>
          <Button onClick={postTryit} bg="#2FC18C" _hover={{ background: '#28a779' }}>Tryitar</Button>
        </Box>

      </Box>

    </Box>
  );
};
