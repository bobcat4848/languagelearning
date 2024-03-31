import React from 'react';
import { Box, Container, Heading, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useToast } from '@chakra-ui/react';

const AccountNavbar = () => {
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
    toast({
      title: 'Logged out successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box as="nav" bg={bgColor} w="100%" p={4} color="black" boxShadow="sm">
      <Container maxW="6xl" display="flex" justifyContent="space-between" alignItems="center">
        <Link href="/dashboard" passHref>
            <Heading as="h3" size="lg" color="white">Language Leap</Heading>
        </Link>
        <HStack>
          <Link href="/profile" passHref>
            <Button leftIcon={<FaUserCircle />} colorScheme="blue" variant="ghost">Profile</Button>
          </Link>
          <Button colorScheme="red" onClick={handleSignOut} variant="ghost">Log Out</Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default AccountNavbar;
