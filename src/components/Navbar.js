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
import ColorModeToggle from './darkModeToggle';
export default function Navbar() {
    return (
        <Box>
            <Alert status='info' justifyContent="center">
                <AlertIcon />
                The site is running in development mode, all resources are currently free to try. Development mode ends May 20th, 2024.
            </Alert>

            <Flex maxW="container.xl" m="auto" mt={5} textAlign="center" alignItems='center' justifyContent="center" gap='2'>
                <Box p='2'>
                    <Heading size='md'>Language Leap</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <ColorModeToggle/>
                    <Button as="a" href="/login">
                        Login
                    </Button>
                    <Button as="a" href="/register">
                        Register
                    </Button>
                </ButtonGroup>
            </Flex>
        </Box>
    );
}