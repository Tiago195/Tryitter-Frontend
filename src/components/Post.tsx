import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineEllipsis, AiOutlineHeart } from 'react-icons/ai';
import { IUser } from '../pages/Profile';

export interface IPost {
  postId: number,
  content: string,
  createdAt: string,
  likes: number,
  user: IUser
}

type Props = {
  post: IPost
}

const styles = {
  gap: ['0px', '10px', '20px']
};

export const Post = () => {
  return (
    <Flex padding="10px" borderBottom="1px" borderTop="1px" borderColor="gray.700">
      <Box transform="translateY(17px)">
        <Avatar src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-line-black-icon-png-image_691065.jpg" />
      </Box>
      <Flex gap={styles.gap} flexDirection="column" padding="10px">
        <Flex justifyContent="space-between">
          <Flex gap={styles.gap}>
            <Text>UserName</Text>
            <Text color="gray.500" fontWeight="100">@User</Text>
          </Flex>
          <Box>
            <AiOutlineEllipsis fontSize="1.5rem" />
          </Box>
        </Flex>

        <Box>
          <Text fontSize={['0.8rem', '1rem', '1.2rem']}>
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
    </Flex>
  );
};
