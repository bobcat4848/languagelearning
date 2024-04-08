'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Box, Heading, Text, Button, Input, useToast } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import AccountNavbar from '@/components/AccountNavbar';

export default function ChangePassword() {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const email = session?.user?.email;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);
  
  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch('api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Password updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      console.error('Password update failed:', error);
      toast({
        title: 'Password update failed',
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
          Change Password
        </Heading>
        <Box borderWidth="1px" p={4} borderRadius="md">
          <Text>Email: {session?.user?.email}</Text>
          <Text mt={2}>New Password:</Text>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            mt={2}
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            mt={2}
          />
          <Button colorScheme="blue" mt={2} onClick={handleChangePassword}>
            Update Password
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
