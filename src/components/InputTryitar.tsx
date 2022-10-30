import { Box, Button, CircularProgress, CircularProgressLabel, Textarea } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

export const InputTryitar = () => {
  const [value, setValue] = useState('');
  const trackColor = value.length >= 280 ? 'red' : 280 - value.length <= 20 ? 'yellow' : '#2FC18C';
  const t = useRef<HTMLTextAreaElement>(null);

  // const changeHeightTextArea = () => {
  //   if (t.current!.scrollHeight > t.current!.clientHeight) {
  //     console.log(t.current?.scrollHeight);
  //     // t.current!.clientHeight += (t.current!.scrollHeight - t.current!.clientHeight);
  //     // Object.defineProperties(t.current, {
  //     //   clientHeight: {
  //     //     value: t.current!.clientHeight + t.current!.scrollHeight - t.current!.clientHeight,
  //     //     writable: true
  //     //   }
  //     // });
  //     t.current?.
  //   }
  // };
  return (
    <Box display="flex" maxW="60vw" marginBottom="10px" alignItems="center" gap="10px">

      <Textarea
        // onInput={changeHeightTextArea}
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
  );
};
