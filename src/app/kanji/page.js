"use client"
import React, { useState, useEffect } from 'react';
import { Box, Container, VStack, Button, useToast, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalOpened, setModalOpened] = useState(false);

    useEffect(() => {
        loadKanji();
        checkModalStatus();
    }, [session]); // Dependency on session to reload kanji when the session is available or changes

    const checkModalStatus = () => {
        // Check if the user has already seen the modal
        const modalStatus = localStorage.getItem(`modalShown-kanji-languageleap`);
        if (!modalStatus) {
            onOpen();
        }
    };

    const handleCloseModal = () => {
        localStorage.setItem(`modalShown-kanji-languageleap`, 'true');
        onClose();
    };

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

    const handleReview = async (kanji, confidence) => {
        if (session?.user?.email) {
            try {
                await saveProgress(session.user.email, kanji.literal, confidence);
                let newKanjiList = [...kanjiList];
                if (confidence === 'unhappy') {
                    // Remove the kanji and add it to the end of the list
                    newKanjiList.splice(currentKanjiIndex, 1);  // Remove the current kanji
                    newKanjiList.push(kanji);  // Add it to the end
                }
                setKanjiList(newKanjiList);
                // Move to the next kanji, adjusting index to loop around if necessary
                setCurrentKanjiIndex(prevIndex => (prevIndex + 1) % newKanjiList.length);
                if (newKanjiList.length === 0 || (newKanjiList.length - 1 === currentKanjiIndex && confidence !== 'unhappy')) {
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
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Welcome to Kanji Study</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>This is your first time here! Let's explain how to use the kanji cards:</Text>
                        <Text mt={4}>You will see a series of Kanji cards. For each card, you can indicate if you felt "happy" (😊), "neutral" (😐), or "unhappy" (😟) about recalling the kanji. If you choose 😟, the card will appear again later for further review. 😐 will keep your current card review interval and 😊 will push the review interval out.</Text>
                        <Text mt={4}>Additionally, the kanji are shown by most frequently used, so you'll be learning the most relevant kanji first.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleCloseModal}>
                            Got it!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Container centerContent>
                <VStack mt={25} spacing={8} w="100%">
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