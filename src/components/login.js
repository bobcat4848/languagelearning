import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Box,
  Button,
  Heading
} from '@chakra-ui/react';

function Login() {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    <Box>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {user ? (
        <div>
          <Heading size='md'>Hello {user.name}</Heading>
          <Button as="a" colorScheme="blue" variant="solid" href="/api/auth/logout">
            Log Out
          </Button>
        </div>
      ) : (
        <div>
          <Button as="a" colorScheme="blue" variant="solid" href="/api/auth/login" mr={2}>
            Log In
          </Button>
          <Button as="a" colorScheme="blue" variant="solid" href="/api/auth/login" mr={2}>
            Register/Get Started --- it's free
          </Button>
        </div>
      )}
    </Box>
  );
}

export default Login;
