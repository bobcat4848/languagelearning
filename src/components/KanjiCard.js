import React from 'react';
import { Box, Text, Button, VStack, HStack } from '@chakra-ui/react';

const KanjiCard = ({ kanji, onReview }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <VStack spacing={4}>
                <Text fontSize="4xl">{kanji.literal}</Text>  // Display the kanji character
                <Text fontSize="xl">Meanings: {kanji.meanings.join(', ')}</Text>  // Join meanings into a string
                <Text>Onyomi: {kanji.onyomi.join(', ')}</Text>  // Onyomi readings
                <Text>Kunyomi: {kanji.kunyomi.join(', ')}</Text>  // Kunyomi readings
                <Text>Stroke Count: {kanji.stroke_count}</Text>  // Number of strokes
            </VStack>
            <HStack justify="center" mt={4}>
                <Button colorScheme="red" onClick={() => onReview(kanji.literal, 'unhappy')}>😟</Button>
                <Button colorScheme="yellow" onClick={() => onReview(kanji.literal, 'neutral')}>😐</Button>
                <Button colorScheme="green" onClick={() => onReview(kanji.literal, 'happy')}>😊</Button>
            </HStack>
        </Box>
    );
};

export default KanjiCard;