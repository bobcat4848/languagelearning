"use client"

import React, { useState, useEffect } from 'react';
import { Box, Text, Container, VStack, Button, useToast } from '@chakra-ui/react';
import { fetchKanji, saveProgress } from '../lib/api.js';
import KanjiCard from '../../components/KanjiCard.js';
import AccountNavbar from '@/components/AccountNavbar.js';
import { useSession } from "next-auth/react";

export default function KanjiStudyPage() {
    const { data: session } = useSession();
    const [kanjiList, setKanjiList] = useState([]);
    const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
    const toast = useToast();

    useEffect(() => {
        async function loadKanji() {
            try {
                const data = await fetchKanji();
                console.log(data.kanjiCharacters);
                setKanjiList(data.kanjiCharacters); // Ensure your API returns an object with a kanjiList property
            } catch (error) {
                toast({
                    title: 'Error loading Kanji.',
                    description: error.toString(),
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
        loadKanji();
    }, [toast]);

    const handleReview = async (kanjiId, confidence) => {
        const userEmail = session.user.email; 
        try {
            // console.log(userId, kanjiId, confidence)
            await saveProgress(userEmail, kanjiId, confidence); // Updated to send an object with all necessary data
            setCurrentKanjiIndex((prevIndex) => prevIndex + 1 < kanjiList.length ? prevIndex + 1 : 0);
        } catch (error) {
            toast({
                title: 'Error saving progress.',
                description: error.toString(),
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
        <AccountNavbar/>
        <Container centerContent>
            <VStack mt={25} spacing={8}>
                {kanjiList.length > 0 ? (
                    <KanjiCard
                        kanji={kanjiList[currentKanjiIndex]}
                        onReview={(confidence) => handleReview(kanjiList[currentKanjiIndex].id, confidence)}
                    />
                ) : (
                    <Button isLoading>Loading Kanji...</Button>
                )}
            </VStack>
        </Container>
        <Box as="footer" py={10}>
            <Text align="center">&copy; {new Date().getFullYear()} Language Leap. All rights reserved.</Text>
        </Box>
        </>
    );
}