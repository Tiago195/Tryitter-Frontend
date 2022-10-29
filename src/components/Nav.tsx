import React from 'react';
import { BiHomeSmile, BiHash } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Button, Box, Text, Flex, Image } from '@chakra-ui/react';

import logo from './logo.svg';

export const Nav = () => {
  const style = {
    flexIcons: {
      fontSize: '1.4rem',
      gap: '10px',
      alignItems: 'center',
    },
    icon: {
      fontSize: '1.8rem'
    }
  };
  return (
    <Flex flex="0.5" gap="20px" flexDirection="column" borderRight="1px" borderColor="gray.700">

      <Box width="100%" padding="10px 10px 0" >
        <Box width="1.9rem">
          <Image src={logo} color="red" />
        </Box>
      </Box>

      <Flex as="nav" flexDirection="column" gap="1rem" paddingLeft="10px">
        <Flex {...style.flexIcons}>
          <BiHomeSmile {...style.icon} />
          <Text>Página Inicial</Text>
        </Flex>

        <Flex {...style.flexIcons}>
          <BiHash {...style.icon} />
          <Text>Explorar</Text>
        </Flex>

        <Flex {...style.flexIcons}>
          <BsPerson {...style.icon} />
          <Text>Perfil</Text>
        </Flex>
      </Flex>

      <Flex width="100%">
        <Button
          width="90%"
          padding="25px 0"
          textAlign="center"
          borderRadius="30px"
          bg="#2FC18C" _hover={{ background: '#28a779' }}
        >Tryitar</Button>
      </Flex>

      <Box textAlign="right" marginRight="13px">
        <Button
          width="100%"
          borderRadius="30px"
          padding="28px 0"
          justifyContent="space-around"
          bg="none"
        >

          <Flex flexDirection="column" gap="1px" alignItems="flex-start">
            <Text>UserName</Text>
            <Text color="gray.500" fontWeight="100">@User</Text>
          </Flex>

          <Box >
            <AiOutlineEllipsis fontSize="1.5rem" />
          </Box>

        </Button>
      </Box>

    </Flex>
  );
};
