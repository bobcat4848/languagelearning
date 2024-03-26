import React from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';

const KanjiCard = ({ kanji, onReview }) => {
    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Text fontSize="4xl" mb={4}>{kanji.character}</Text>
            <Text fontSize="xl" mb={4}>{kanji.meaning}</Text>
            <Text mb={4}>{kanji.example}</Text>
            <HStack justify="center">
                <Button colorScheme="red" onClick={() => onReview('unhappy')}>😟</Button>
                <Button colorScheme="yellow" onClick={() => onReview('neutral')}>😐</Button>
                <Button colorScheme="green" onClick={() => onReview('happy')}>😊</Button>
            </HStack>
        </Box>
    );
};

export default KanjiCard;
