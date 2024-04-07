'use client';
import { useState } from 'react';
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if(response.status === 400){
        setErrorMessage("User with this email is not registered.");
        return;
      }
      if (response.ok) {
        setSuccessMessage('Password reset email sent. Please check your inbox.');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="md" mt={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Forgot Password
      </Heading>
      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting}
          mb={4}
        />
        <Button
          colorScheme="blue"
          onClick={handleResetPassword}
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Reset Password
        </Button>
      </FormControl>
      <Text mt={4} textAlign="center">
        Remember your password?{' '}
        <Button variant="link" color="blue.500" onClick={() => router.push('/login')}>
          Login
        </Button>
      </Text>
    </Container>
  );
};

export default ForgotPasswordPage;
