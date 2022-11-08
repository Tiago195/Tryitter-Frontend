import { Box, Button, Flex, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { InputTryitar } from './InputTryitar';

export const ModalTryitar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem('user') as string);
  return (
    <>
      <Flex width="100%" className='nav-tryittar'>
        <Button
          className='nav-tryittar-button'
          width="90%"
          padding="25px 0"
          textAlign="center"
          borderRadius="30px"
          bg="#2FC18C" _hover={{ background: '#28a779' }}
          onClick={onOpen}
        >
          Tryitar
        </Button>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}

      >
        <ModalOverlay />
        <ModalContent p={3} h="50vh">
          <ModalCloseButton />
          <ModalHeader>{user.email}</ModalHeader>
          <InputTryitar />
        </ModalContent>
      </Modal>
    </>
  );
};
