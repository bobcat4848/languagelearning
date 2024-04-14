'use client'
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Spacer,
    Avatar
} from '@chakra-ui/react';

import { IoLanguage, IoRepeat, IoGameController } from "react-icons/io5";
import Navbar from '../components/Navbar';

export default function Home() {

    return (
        <Box>
            <Navbar />
            <Container maxW="container.xl" py={10}>
                <Box
                    backgroundImage="images/header.jpg"
                    bgPos="top"
                    bgSize="cover"
                    borderRadius="20"
                    py={200}
                >
                    <VStack my="-100px" textAlign="center">
                        <Heading color="gray.800">Language Leap</Heading>
                        <Text color="gray.700">If you want to learn, we're here to teach.</Text>

                        <Heading color="gray.700">Discover Japanese learning</Heading>
                        <Text mt={4} fontSize="lg" color="gray.700">Join our community and start your journey to fluency today!</Text>

                        <HStack>
                            <Button colorScheme="blue" variant="solid" size="lg">Get Started</Button>
                            <Button colorScheme="gray" variant="solid" size="lg">Learn More</Button>
                        </HStack>
                    </VStack>
                </Box>

                <Spacer />

                <VStack w="75%" m="auto" mt={20} spacing={10}>
                    <HStack>
                        <Box bgColor="gray.200" borderRadius="20" p={4}>
                            <IoLanguage size={40} />
                        </Box>
                        <Text fontSize="lg">Not comfortable typing in Japanese? Speak to a live assistant in a given language, get pointers, corrections, and more. Try it out for free by creating a free account by clicking Get Started above.</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize="lg">Memorize more than you ever have before with our in-house SRS system. Quickly memorize and learn new information while allowing our systems to do the heavy lifting for you.</Text>
                        <Box bgColor="gray.200" borderRadius="20" p={4}>
                            <IoRepeat size={40}/>
                        </Box>
                    </HStack>
                    <HStack>
                        <Box bgColor="gray.200" borderRadius="20" p={4}>
                            <IoGameController size={40}/>
                        </Box>
                        <Text fontSize="lg">Keep track of your stats with a point system. Keep trying each and every day to earn more points and keep track of your streak. Never miss a day of study and reap the benefits!</Text>
                    </HStack>
                </VStack>

                <VStack mt={20} spacing={8} align="center">
                    <Heading as="h2">Testimonials</Heading>

                    <HStack spacing={8}>
                        <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                            <VStack align="start">
                                <Avatar name="Sarah Doe" />
                                <Text fontWeight="bold">Sarah Doe</Text>
                                <Text fontSize="sm">Language Enthusiast</Text>
                                <Text mt={4}>Learning Japanese has always been a dream of mine, and Language Leap's intuitive platform made it possible. The lessons are engaging and effective!</Text>
                            </VStack>
                        </Box>

                        <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                            <VStack align="start">
                                <Avatar name="John Smith" />
                                <Text fontWeight="bold">John Smith</Text>
                                <Text fontSize="sm">Tech Professional</Text>
                                <Text mt={4}>The interactive exercises and the SRS system helped me to improve my Japanese significantly. The progress tracking is motivating!</Text>
                            </VStack>
                        </Box>

                        <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                            <VStack align="start">
                                <Avatar name="Jane Doe" />
                                <Text fontWeight="bold">Jane Doe</Text>
                                <Text fontSize="sm">University Student</Text>
                                <Text mt={4}>As a student, I find Language Leap's flexible scheduling and personalized learning paths incredibly valuable. It's fun and effective!</Text>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>

                <VStack mt={20} spacing={8} align="center">
                    <Heading as="h2">Choose Your Plan</Heading>
                    <Text fontSize="lg" color={'gray.500'}>
                        Select the plan that best suits your needs.
                    </Text>

                    <HStack spacing={8}>
                        <Box w="full" shadow="md" rounded="lg" overflow="hidden" bg="gray.200">
                            <Box py={4} px={12} bg="blue.500" color="white">
                                <Text fontWeight="500" fontSize="2xl">Monthly</Text>
                                <Text fontSize="3xl" fontWeight="600">$4.99</Text>
                                <Text fontSize="xl" color="gray.500">/month</Text>
                            </Box>
                            <Box py={4} px={12} bg="gray.300" color="gray.700">
                                <Text fontWeight="600">Access to all features</Text>
                                <Text mt={3}>Chat with a Japanese Native</Text>
                                <Text>Use SRS cards to memorize Kanji</Text>
                                <Text>Premium support</Text>
                                <Button mt={4} colorScheme="blue">Choose Plan</Button>
                            </Box>
                        </Box>

                        <Box w="full" shadow="md" rounded="lg" overflow="hidden" bg="gray.200">
                            <Box py={4} px={12} bg="green.500" color="white">
                                <Text fontWeight="500" fontSize="2xl">Yearly</Text>
                                <Text fontSize="3xl" fontWeight="600">$49.99</Text>
                                <Text fontSize="xl" color="gray.500">/year</Text>
                            </Box>
                            <Box py={4} px={12} bg="gray.300" color="gray.700">
                                <Text fontWeight="600">Access to all features</Text>
                                <Text mt={3}>Chat with a Japanese Native</Text>
                                <Text>Use SRS cards to memorize Kanji</Text>
                                <Text>Premium support</Text>
                                <Button mt={4} colorScheme="green">Choose Plan</Button>
                            </Box>
                        </Box>
                    </HStack>
                </VStack>

                <VStack py={10} spacing={8} align="center" bg="gray.200">
                    <Heading>Ready to start your Japanese learning adventure?</Heading>
                    <Button colorScheme="blue" variant="solid" size="lg">Get Started</Button>
                    <Text>&copy; {new Date().getFullYear()} Language Leap. All rights reserved.</Text>
                </VStack>
            </Container>
        </Box>
    );
}
