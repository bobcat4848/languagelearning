import React from 'react';
import { Box, Container, Heading, Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaMicrochip, FaTasks, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useToast } from '@chakra-ui/react';
import ColorModeToggle from './darkModeToggle';
const AccountNavbar = () => {
  const toast = useToast();
  const bgColor = useColorModeValue('gray.100', 'gray.700');

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
    <Box as="nav" bgColor={bgColor} w="100%" p={4} boxShadow="sm">
      <Container maxW="6xl" display="flex" justifyContent="space-between" alignItems="center">
        <Link href="/dashboard" passHref>
            <Heading as="h3" size="lg">Language Leap</Heading>
        </Link>
        <HStack>
        <ColorModeToggle/>
        <Link href="/dashboard" passHref>
            <Button leftIcon={<FaTasks />} colorScheme="blue" variant="ghost">Dashboard</Button>
          </Link>
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
