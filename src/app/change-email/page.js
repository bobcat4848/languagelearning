'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Heading, Text, Button, Input, useToast } from '@chakra-ui/react';
import { useSession,signOut } from 'next-auth/react';
import { getServerSession } from "next-auth";
import AccountNavbar from '@/components/AccountNavbar';

export default function ChangeEmail() {
  const { data: session} = useSession();
  const router = useRouter();
  const toast = useToast();
  const email = session?.user?.email;
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  if (!session) {
    router.push('/login');
    return null; 
  }
  const handleChangeEmail = async () => {
    try {
        const userAlreadyExistsRes = await fetch('api/userAlreadyExists', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const { user } = await userAlreadyExistsRes.json();
        if(user){
            setError("Email Already In Use.");
            return;
        }
    
      const response = await fetch('api/update-email', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newEmail
        }),
    });
      if (response.ok) {
        signOut({ redirect: true, callbackUrl: '/login' });
        toast({
          title: 'Email updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to update email');
      }
    } catch (error) {
      console.error('Email update failed:', error);
      toast({
        title: 'Email update failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
    <>
      <AccountNavbar />

      <Container maxW="xl" mt={8}>
        <Heading as="h1" mb={4}>
          Change Email
        </Heading>
        <Box borderWidth="1px" p={4} borderRadius="md">
          <Text>Email: {session?.user?.email}</Text>
          <Text mt={2}>Change Email:</Text>
          <Input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email"
            mt={2}
          />
          <Button colorScheme="blue" mt={2} onClick={handleChangeEmail}>
            Update Email
          </Button>
          <Button colorScheme="red" mt={2} ml={2} onClick={handleSignOut}>
            Logout
          </Button>
          {error && (
            <Heading as="h2" size="sm" mt={2} color="red.500">
              {error}
            </Heading>
          )}
        </Box>
      </Container>
    </>
  );
}
