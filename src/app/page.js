import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Spacer,
    Avatar,
} from '@chakra-ui/react';

import { IoLanguage, IoRepeat, IoGameController } from "react-icons/io5";
import Navbar from '../components/Navbar';


export default function Home() {

    return (
        <Box>
        <Navbar/>
        <Container maxW="container.xl" py={10}>
            <Box
            backgroundImage="images/header.jpg"
            bgPos="top"
            bgSize="cover"
            borderRadius="20"
            py={200}
            >
                <VStack my="-100px">
                    <Heading color="gray.800">Language Leap</Heading>
                    <Text color="gray.700">If you want to learn, we're here to teach.</Text>

                    <Box textAlign="center" pt={5}>
                        <Heading color="gray.700">Discover Japanese learning</Heading>
                        <Text mt={4} fontSize="lg" color="gray.700">Join our community and start your journey to fluency today!</Text>
                    </Box>
                    <HStack>
                        <Button colorScheme="blue" variant="solid" size="lg">Get Started</Button>
                        <Button bgColor="gray.700" variant="solid" size="lg">Learn More</Button>
                    </HStack>
                </VStack>
            </Box>

            <Box>
                
            </Box>

            <Spacer/>

            <VStack w="75%" m="auto" mt={20} spacing={10}>
                <HStack>
                    <Box bgColor="gray.700" borderRadius="20">
                        <IoLanguage size={200} />
                    </Box>
                    <Text fontSize="lg" color="white">Not comfortable typing in Japanese? Speak to a live assistant in a given language, get pointers, corrections, and more. Try it out for free by creating a free account by clicking Get Started above.</Text>
                </HStack>
                <HStack>
                    <Text fontSize="lg" color="white">Memorize more than you ever have before with our in-house SRS system. Quickly memorize and learn new information while allowing our systems to do the heavy lifting for you.</Text>
                    <Box bgColor="gray.700" borderRadius="20">
                        <IoRepeat size={200}/>
                    </Box>
                </HStack>
                <HStack>
                    <Box bgColor="gray.700" borderRadius="20">
                        <IoGameController size={200}/>
                    </Box>
                    <Text fontSize="lg" color="white">Keep track of your stats with a point system. Keep trying each and every day to earn more points and keep track of your streak. Never miss a day of study and reap the benefits!</Text>
                </HStack>
            </VStack>

            <VStack mt={20}>
                <Heading>Testimonals</Heading>

                <HStack>
                    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                        <VStack align="start">
                            <Avatar name="Sarah Doe" src="" />
                            <Text fontWeight="bold">Sarah Doe</Text>
                            <Text fontSize="sm">Language Enthusiast</Text>
                            <Text mt={4}>Learning Japanese has always been a dream of mine, and Language Leap's intuitive platform made it possible. The lessons are engaging and effective!</Text>
                        </VStack>
                    </Box>

                    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                        <VStack align="start">
                            <Avatar name="John Smith" src="" />
                            <Text fontWeight="bold">John Smith</Text>
                            <Text fontSize="sm">Tech Professional</Text>
                            <Text mt={4}>The interactive exercises and the SRS system helped me to improve my Japanese significantly. The progress tracking is motivating!</Text>
                        </VStack>
                    </Box>

                    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                        <VStack align="start">
                            <Avatar name="Jane Doe" src="" />
                            <Text fontWeight="bold">Jane Doe</Text>
                            <Text fontSize="sm">University Student</Text>
                            <Text mt={4}>As a student, I find Language Leap's flexible scheduling and personalized learning paths incredibly valuable. It's fun and effective!</Text>
                        </VStack>
                    </Box>
                </HStack>
            </VStack>
        </Container>

        <VStack spacing={2} textAlign="center">
            <Heading as="del" fontSize="4xl">Choose Your Plan</Heading> 
            <Heading>Free during evaluation</Heading>
            <Text fontSize="lg" color={'gray.500'}>
                Select the plan that best suits your needs.
            </Text>

            <HStack textAlign="center" justify="center" py={50}>
                <Box w="full" shadow="md" rounded="lg" overflow="hidden" bg="gray.800">
                    <Box py={4} px={12} bg="blue.800" color="white">
                        <Text fontWeight="500" fontSize="2xl">
                            Monthly
                        </Text>
                        <HStack justifyContent="center">
                            <Text fontSize="3xl" fontWeight="600">
                                $4.99
                            </Text>
                            <Text fontSize="xl" color="gray.200">
                                /month
                            </Text>
                        </HStack>
                    </Box>
                    <Box h="100%" py={4} px={12} bg="gray.700" color="white">
                        <Text fontWeight="600">Access to all features</Text>
                        <Text mt={5}>Chat with a Japanese Native</Text>
                        <Text mt={5}>Use SRS cards to memorize Kanji</Text>
                        <Text mt={5}>Premium support</Text>
                        <Button mt={4} colorScheme="blue">Choose Plan</Button>
                    </Box>
                </Box>

                <Box w="full" bg="black" shadow="md" rounded="lg" overflow="hidden">
                    <Box py={4} px={12} bg="green.800" color="white">
                        <Text fontWeight="500" fontSize="2xl">
                            Yearly
                        </Text>
                        <HStack justifyContent="center">
                            <Text fontSize="3xl" fontWeight="600">
                                $49.99
                            </Text>
                            <Text fontSize="xl" color="gray.200">
                                /year
                            </Text>
                        </HStack>
                    </Box>
                    <Box py={4} px={12} bg="gray.700" color="white">
                        <Text fontWeight="600">Access to all features</Text>
                        <Text mt={5}>Chat with a Japanese Native</Text>
                        <Text mt={5}>Use SRS cards to memorize Kanji</Text>
                        <Text mt={5}>Premium support</Text>
                        <Button mt={4} colorScheme="green">Choose Plan</Button>
                    </Box>
                </Box>
            </HStack>
        </VStack>


        <VStack bgColor="gray.700" pt={10}>
            <Box textAlign="center">
                <Heading>Ready to start your Japanese learning adventure?</Heading>
                <Button mt={5} colorScheme="blue" variant="solid" size="lg">Get Started</Button>
            </Box>

            <Box as="footer" py={10}>
            <Text align="center">&copy; {new Date().getFullYear()} Language Leap. All rights reserved.</Text>
            </Box>
        </VStack>



        </Box>
    );
}
  