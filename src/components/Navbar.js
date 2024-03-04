'use client'

import React, { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Spacer,
    Alert,
    AlertIcon,
    Flex,
    ButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    useDisclosure,
    FormLabel,
    Input,
    Progress,
    Text,
    Tooltip
} from '@chakra-ui/react';

export default function Navbar() {
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleEmailChange = (event) => {
        const emailInput = event.target.value;
        setEmail(emailInput);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)); // Simple email regex validation
    };

    const handlePasswordChange = (event) => {
        const passwordInput = event.target.value;
        setPassword(passwordInput);
        setPasswordsMatch(confirmPassword === passwordInput);
        setPasswordStrength(calculatePasswordStrength(passwordInput));
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPasswordInput = event.target.value;
        setConfirmPassword(confirmPasswordInput);
        setPasswordsMatch(password === confirmPasswordInput);
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 5) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;
        return strength;
    };

    const isFormValid = isEmailValid && passwordsMatch && passwordStrength >= 80;

    return (
        <Box>
            <Alert status='info' justifyContent="center">
                <AlertIcon />
                The site is running in evaluation mode, all resources are currently free to try. Evaluation ends May 20th, 2024.
            </Alert>

            <Flex maxW="container.xl" m="auto" mt={5} textAlign="center" alignItems='center' justifyContent="center" gap='2'>
                <Box p='2'>
                    <Heading size='md'>Language Leap</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                <Button colorScheme="blue" variant="outline" onClick={onLoginOpen}>
                    Login
                </Button>

                <Button colorScheme="blue" variant="solid" onClick={onRegisterOpen}>
                    Get Started --- it's free
                </Button>
                </ButtonGroup>
            </Flex>
            
            {/* Login Modal */}
            <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login to your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="Enter your password" type="password" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onLoginClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Login</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Registration Modal */}
            <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a new account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="Enter your name" />
                        </FormControl>

                        <FormControl mt={4} isInvalid={!isEmailValid}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Enter your email" value={email} onChange={handleEmailChange} />
                            {!isEmailValid && <Text color="red.500">Please enter a valid email.</Text>}
                        </FormControl>

                        <Tooltip label="Password must be 8+ characters long, include uppercase and lowercase letters, a number, and a special character." mt="3">
                            <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input placeholder="Enter your password" type="password" value={password} onChange={handlePasswordChange} />
                                <Progress value={passwordStrength} size="sm" colorScheme={passwordStrength >= 80 ? "green" : passwordStrength >= 40 ? "orange" : "red"} mt={2} />
                            </FormControl>
                        </Tooltip>

                        <FormControl mt={4} isInvalid={!passwordsMatch}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input placeholder="Confirm your password" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                            {!passwordsMatch && <Text color="red.500">Passwords do not match.</Text>}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onRegisterClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={() => console.log('Registered')} isDisabled={!isFormValid}>
                            Register
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}