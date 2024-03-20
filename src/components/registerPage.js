'use client'
import { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
        setError("All fields are necessary.");
        return;
    }

    try {
        const userAlreadyExistsRes = await fetch('api/userAlreadyExists', {
            method: "POST",
            heades: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const { user } = await userAlreadyExistsRes.json();
        if(user){
            setError("User Already Exists.");
            return;
        }

        const res = await fetch("api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            }),
        });

        if(res.ok){
            const form = e.target;
            form.reset();
            router.push("/login");
        } else {
            console.log("User registration failed.");
        }
    } catch (error) {
        console.log("Error during registratuin: ", error);
    }
  };

  return (
    <Container maxW="md" mt={8}>
      <Box borderWidth="1px" borderRadius="lg" p={8}>
        <Heading as="h2" mb={4}>
          Register
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
            Register
          </Button>
          {error && (
            <Heading as="h2" size="sm" mt={2} color="red.500">
              {error}
            </Heading>
          )}
        </form>
      </Box>
    </Container>
  );
}
