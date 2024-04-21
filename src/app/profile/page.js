'use client';
import { useEffect } from 'react';
import { Container, Button, Heading, Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import AccountNavbar from '@/components/AccountNavbar';
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  const handleChangeEmail = () => {
    router.push('/change-email');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };
  return (<>
  <AccountNavbar/>
    <Container maxW="md" mt={8}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={8}
        boxShadow="lg"
      >
        <Heading as="h2" mb={4} >
          Your Profile
        </Heading>
        <Box mb={4}>
          <Text fontSize="lg">
            Email: {session?.user?.email}
          </Text>
        </Box>
        <Button
          colorScheme="blue"
          onClick={handleChangeEmail}
          mb={4}
          w="100%"
        >
          Change Email
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleChangePassword}
          mb={4}
          w="100%"
        >
          Change Password
        </Button>
        {/* More profile details can be added */}
      </Box>
    </Container>
    </>
  );
}
