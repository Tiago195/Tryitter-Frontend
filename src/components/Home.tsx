import { Box, Button, CircularProgress, CircularProgressLabel, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineEllipsis, AiOutlineHeart } from 'react-icons/ai';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const Home = () => {
  // const theme = useTheme();
  const [value, setValue] = useState('');
  const trackColor = value.length >= 280 ? 'red' : 280 - value.length <= 20 ? 'yellow' : '#2FC18C';
  return (
    <Box minH="100vh" fontSize="xl" flex="2">

      <Flex padding="10px" justifyContent="space-between">
        <Text>Página inicial</Text>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <Box display="flex" maxW="60vw" marginBottom="10px" alignItems="center" gap="10px">

        <Input
          border="none"
          onChange={({ target }) => setValue(target.value)}
          focusBorderColor='none'
          placeholder='O que está acontecendo?'
          paddingLeft="10px"
          paddingRight="0"
          fontSize="1.3rem"
          _placeholder={{ color: 'gray.500' }}
        />

        <Box borderLeft="1px" borderRight="1px" padding="0 10px" borderColor="gray.700">
          <CircularProgress size="2.3rem" value={value.length} thickness="4px" max={280} color={trackColor}>
            <CircularProgressLabel>{280 - value.length}</CircularProgressLabel>
          </CircularProgress>
        </Box>

        <Box>
          <Button bg="#2FC18C" _hover={{ background: '#28a779' }}>Tryitar</Button>
        </Box>

      </Box>

      <Flex gap="10px" flexDirection="column" padding="10px" borderBottom="1px" borderTop="1px" borderColor="gray.700">

        <Flex justifyContent="space-between">
          <Flex gap="10px">
            <Text>UserName</Text>
            <Text color="gray.500" fontWeight="100">@User</Text>
          </Flex>
          <Box>
            <AiOutlineEllipsis fontSize="1.5rem" />
          </Box>
        </Flex>

        <Box>
          <Text fontSize="1.2rem">
            Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
            Molestias, magnam quae laboriosam pariatur repudiandae sed dicta amet alias consequatur nam vel.
            Nesciunt quas hic odit? Numquam autem nobis saepe consequatur.
          </Text>
        </Box>

        <Flex marginTop="5px" align="center" gap="15px" color="gray.500">
          <AiOutlineHeart />
          <Text fontWeight="100" fontSize="1rem">123</Text>
        </Flex>

      </Flex>
    </Box >
  );
};
