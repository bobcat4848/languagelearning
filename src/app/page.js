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
import Navbar from '@/components/Navbar';


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
                            <Avatar name="Sarah Doe" src="path_to_image" />
                            <Text fontWeight="bold">Sarah Doe</Text>
                            <Text fontSize="sm">Language Enthusiast</Text>
                            <Text mt={4}>Learning Japanese has always been a dream of mine, and Language Leap's intuitive platform made it possible. The lessons are engaging and effective!</Text>
                        </VStack>
                    </Box>

                    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                        <VStack align="start">
                            <Avatar name="John Smith" src="path_to_image" />
                            <Text fontWeight="bold">John Smith</Text>
                            <Text fontSize="sm">Tech Professional</Text>
                            <Text mt={4}>The interactive exercises and the SRS system helped me to improve my Japanese significantly. The progress tracking is motivating!</Text>
                        </VStack>
                    </Box>

                    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                        <VStack align="start">
                            <Avatar name="Jane Doe" src="path_to_image" />
                            <Text fontWeight="bold">Jane Doe</Text>
                            <Text fontSize="sm">University Student</Text>
                            <Text mt={4}>As a student, I find Language Leap's flexible scheduling and personalized learning paths incredibly valuable. It's fun and effective!</Text>
                        </VStack>
                    </Box>
                </HStack>
            </VStack>

        </Container>

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
  