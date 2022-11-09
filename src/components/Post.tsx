import { Avatar, Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineEllipsis, AiOutlineHeart } from 'react-icons/ai';
import { IUser } from '../pages/Profile';
import { api } from '../services/axios';

export interface IPost {
  postId: number,
  content: string,
  createdAt: string,
  likes: number,
  user: IUser

}

type Props = {
  post: IPost,
  user: IUser
}

const styles = {
  gap: ['0px', '10px', '20px']
};

export const Post = ({ post, user }: Props) => {
  const userStorage = JSON.parse(localStorage.getItem('user') as string);

  const deleteTryit = async (id: number) => {
    await api.delete(`/post/${id}`);
    window.location.reload();
  };

  const likeTryit = async (id: number) => {
    await api.post(`/like/${id}`, user, { headers: { Authorization: 'Bearer ' + userStorage.token } });
    window.location.reload();
  };

  return (
    <Flex padding="10px" borderBottom="1px" borderTop="1px" borderColor="gray.700">
      <Box transform="translateY(17px)">
        <Avatar name={user.name} src={user.img} />
      </Box>
      <Flex gap={styles.gap} flexDirection="column" w="100%" padding="10px">
        <Flex justifyContent="space-between">
          <Flex gap={styles.gap}>
            <Text>{user.name}</Text>
            <Text color="gray.500" fontWeight="100">@{user.arroba}</Text>
          </Flex>
          {userStorage.userId == user.userId && (
            <Box zIndex="0">
              <Menu>
                <MenuButton bg="none" p="0px">
                  <AiOutlineEllipsis fontSize="1.5rem" />
                </MenuButton >
                <MenuList>
                  <MenuItem onClick={() => deleteTryit(post.postId)}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </Flex>

        <Box>
          <Text fontSize={['0.8rem', '1rem', '1.2rem']}>
            {post.content}
          </Text>
        </Box>

        <Flex marginTop="5px" align="center" gap="15px" color="gray.500">
          <Button bg="none" onClick={() => likeTryit(post.postId)}>
            <AiOutlineHeart />
          </Button>
          <Text fontWeight="100" fontSize="1rem">{post.likes}</Text>
        </Flex>

      </Flex>
    </Flex>
  );
};
