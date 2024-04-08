import React from 'react';
import { Box, Text, Button, VStack, HStack, Badge } from '@chakra-ui/react';

const KanjiCard = ({ kanji, onReview }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%">
            <VStack spacing={4}>
                <VStack width="100%">
                    <Badge colorScheme={kanji.status === 'new' ? 'green' : 'purple'}>
                        {kanji.status === 'new' ? 'New' : 'Review'}
                    </Badge>
                    <Text fontSize="4xl">{kanji.literal}</Text>
                </VStack>
                <Text fontSize="xl">Meanings: {kanji.meanings.join(', ')}</Text>
                <Text>Onyomi: {kanji.onyomi.join(', ')}</Text>
                <Text>Kunyomi: {kanji.kunyomi.join(', ')}</Text>
                <Text>Stroke Count: {kanji.stroke_count}</Text>
            </VStack>
            <HStack justify="center" mt={4}>
                <Button colorScheme="red" onClick={() => onReview(kanji, 'unhappy')}>😟</Button>
                <Button colorScheme="yellow" onClick={() => onReview(kanji, 'neutral')}>😐</Button>
                <Button colorScheme="green" onClick={() => onReview(kanji, 'happy')}>😊</Button>
            </HStack>
        </Box>
    );
};

export default KanjiCard;