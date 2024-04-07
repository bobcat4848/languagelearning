'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

const ResetPasswordPage = ({ params }) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        body: JSON.stringify({ token: params.token }),
        headers: { 'Content-Type': 'application/json' },
      });
      if(response.status === 400){
        setErrorMessage("Invalid or expired token");
        setVerified(true);
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong. Please try again.');
      }

      const userData = await response.json();
      setUser(userData);
      setVerified(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (params.token) {
      handleResetPassword();
    } else {
      setErrorMessage("Invalid or expired token.")
    }
  }, []);

  const handleSubmit = async () => {
    console.log('New password:', password);
    const response = await fetch('/api/reset-password', {
      method: 'POST',
      body: JSON.stringify({ 
      email: user?.email,
      password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if(response.status === 400){
      setErrorMessage("Something went wrong, try again");
    }

    if(response.status === 200){
      setErrorMessage("");
      router.push("/login");
    }
  };

  return (
    <Container maxW="md" mt={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Reset Password
      </Heading>
      {verified ? (
        <>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              disabled={isSubmitting || errorMessage}
              mb={4}
            />
            <Button
              colorScheme="blue"
              onClick={isSubmitting || errorMessage ? null : handleSubmit}
              isLoading={isSubmitting}
              loadingText="Resetting..."
              disabled={isSubmitting || errorMessage}
            >
              Reset Password
            </Button>
          </FormControl>
        </>
      ) : (
        <Text textAlign="center">Verifying token...</Text>
      )}
      {errorMessage && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};

export default ResetPasswordPage;
