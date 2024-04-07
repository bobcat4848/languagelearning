'use client';
import { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError('Invalid Credentials');
        return;
      }

      router.replace('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password'); // Redirect to the forgot password page
  };

  return (
    <Container maxW="md" mt={8}>
      <Box borderWidth="1px" borderRadius="lg" p={8}>
        <Heading as="h2" mb={4}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password" mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
          {error && (
            <Heading as="h2" size="sm" mt={2} color="red.500">
              {error}
            </Heading>
          )}
        </form>
        <Text mt={4}>
          <ChakraLink onClick={handleForgotPassword} color="blue.500" cursor="pointer">
            Forgot your password?
          </ChakraLink>
        </Text>
        <Text mt={4}>
          Don't have an account?{' '}
          <ChakraLink href="/register" color="blue.500">
            Register
          </ChakraLink>
        </Text>
      </Box>
    </Container>
  );
}
