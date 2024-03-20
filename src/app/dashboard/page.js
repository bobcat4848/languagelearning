"use client"

import { Container, Box, Heading, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const {data:session} = useSession();

  return (
    <Container maxW="xl" centerContent>
      <Box p="8" borderWidth="1px" borderRadius="lg" shadow="md">
        <Heading as="h1" mb="4">
          Dashboard
        </Heading>
        <Text>Hello, {session?.user?.email}!Welcome to your dashboard!</Text>
        <Box mt="6">
          <Link href="/profile" passHref>
            <Button colorScheme="blue" mr="4">
              Go to Profile
            </Button>
          </Link>
          <Link href="/settings" passHref>
            <Button colorScheme="green" onClick={() => signOut()}>
              Log Out
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
