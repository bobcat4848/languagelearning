"use client"
import React, { useState, useEffect } from 'react';
import { Box, Container, VStack, Button, useToast, Text } from '@chakra-ui/react';
import KanjiCard from '../../components/KanjiCard';
import AccountNavbar from '@/components/AccountNavbar';
import { useSession } from "next-auth/react";
import { fetchKanji, saveProgress } from '../lib/api';

export default function KanjiStudyPage() {
    const { data: session } = useSession();
    const [kanjiList, setKanjiList] = useState([]);
    const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const toast = useToast();

    useEffect(() => {
        loadKanji();
    }, [session]); // Dependency on session to reload kanji when the session is available or changes

    const loadKanji = async () => {
        if (session?.user?.email) {
            try {
                const data = await fetchKanji(session.user.email);
                if (data.kanjiToStudy.length > 0) {
                    setKanjiList(data.kanjiToStudy);
                    setIsFinished(false);
                } else {
                    setIsFinished(true);
                }
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
    };

    const handleReview = async (kanjiLiteral, confidence) => {
        if (session?.user?.email) {
            try {
                await saveProgress(session.user.email, kanjiLiteral, confidence);
                if (currentKanjiIndex + 1 < kanjiList.length) {
                    setCurrentKanjiIndex(currentKanjiIndex + 1);
                } else {
                    setIsFinished(true);
                }
            } catch (error) {
                toast({
                    title: 'Error saving progress.',
                    description: error.toString(),
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <>
            <AccountNavbar/>
            <Container centerContent>
                <VStack mt={25} spacing={8}>
                    {!isFinished ? (
                        kanjiList.length > 0 ? (
                            <KanjiCard
                                kanji={kanjiList[currentKanjiIndex]}
                                onReview={handleReview}
                            />
                        ) : (
                            <Button isLoading>Loading Kanji...</Button>
                        )
                    ) : (
                        <Box textAlign="center">
                            <Text fontSize="2xl" mb={4}>Congratulations! You've reviewed all your Kanji for today.</Text>
                            <Text mb={4}>Refresh the page for a new set or come back tomorrow for more practice!</Text>
                            <Button colorScheme="teal" onClick={() => window.location.reload()}>Refresh Page</Button>
                        </Box>
                    )}
                </VStack>
            </Container>
        </>
    );
}