"use client";
import React from 'react';
import {
  Container, Box, Heading, SimpleGrid, Button, Text, useColorModeValue, LinkBox, LinkOverlay, VStack
} from '@chakra-ui/react';
import { FaPencilAlt } from 'react-icons/fa';
import AccountNavbar from '@/components/AccountNavbar';

export default function Assessments() {
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const assessments = [
    { level: 'N1', description: 'Advanced proficiency in a wide range of complex Japanese.' },
    { level: 'N2', description: 'Proficiency in everyday Japanese conversations and reading.' },
    { level: 'N3', description: 'Intermediate proficiency in Japanese in various everyday scenarios.' },
    { level: 'N4', description: 'Basic proficiency for everyday conversations and situations.' },
    { level: 'N5', description: 'Introductory Japanese for simple communication.' }
  ];

  return (
    <>
      <AccountNavbar/>
      <Container maxW="6xl" p={5}>
        <Heading as="h1" mb={5}>JLPT Assessments</Heading>
        <Text mb={5}>
          Test your Japanese language skills with assessments tailored to each JLPT level.
          Select a level below to start the assessment.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {assessments.map((assessment, index) => (
            <LinkBox
              as={Box}
              key={index}
              p={5}
              borderWidth="1px"
              borderRadius="lg"
              shadow="base"
              bg={bgColor}
              _hover={{ bg: hoverBgColor, transform: 'translateY(-2px)', transition: 'all 0.3s' }}
            >
              <VStack spacing={3}>
                <Heading as="h2" size="md">{`JLPT ${assessment.level}`}</Heading>
                <Text>{assessment.description}</Text>
                <Button leftIcon={<FaPencilAlt />} colorScheme="blue">
                  <LinkOverlay href={`/assessments/${assessment.level.toLowerCase()}`}>Start Assessment</LinkOverlay>
                </Button>
              </VStack>
            </LinkBox>
          ))}
        </SimpleGrid>
      </Container>

      <Box as="footer" py={10}>
        <Text align="center">&copy; {new Date().getFullYear()} Language Leap. All rights reserved.</Text>
      </Box>
    </>
  );
}