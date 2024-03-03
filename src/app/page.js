import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Spacer,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Home() {
    //const bg = useColorModeValue('gray.50', 'gray.800')

    return (
        <Box>

        <Container maxW="container.xl" py={10} colorScheme="blue">
            <Box
            bgImage="url('images/header.jpg')"
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
                        <Button colorScheme="blue" size="lg">Get Started</Button>
                        <Button colorScheme="gray" variant="solid" size="lg">Learn More</Button>
                    </HStack>
                </VStack>
            </Box>
        </Container>

        <Box as="footer" py={10}>
            <Text align="center">&copy; {new Date().getFullYear()} Language Leap. All rights reserved.</Text>
        </Box>

        </Box>
    );
}
  