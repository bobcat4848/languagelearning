"use client";
import React, { useState } from 'react';
import {
  Container, Box, Heading, Text, Button, Progress, useToast, VStack, LinkBox, LinkOverlay, Icon, 
  useColorModeValue, Flex, Stack, Badge, HStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, SimpleGrid
} from '@chakra-ui/react';
import { FaRobot, FaBookOpen, FaChessRook, FaPercent, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import { useSession } from "next-auth/react";
import AccountNavbar from '@/components/AccountNavbar';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (status === 'loading') {
    return null; 
  }

  if (!session) {
    router.push('/login');
    return null; 
  }

  // Example log data, replace with actual data once we get that working
  const userLogs = [
    { event: 'Studied 30 Kanji cards', timestamp: 'Today' },
    { event: 'Completed 5 chatbot sessions', timestamp: 'Yesterday' },
    { event: 'Achieved 60-day streak', timestamp: '2 days ago' },
    { event: 'Reviewed 20 Kanji cards', timestamp: '3 days ago' },
    { event: 'Engaged in 10 minutes of conversation', timestamp: 'Last week' },
    { event: 'Mastered 50 new words', timestamp: 'Last week' },
    { event: 'Explored advanced grammar concepts', timestamp: '2 weeks ago' },
    { event: 'Participated in a group study session', timestamp: '2 weeks ago' },
    { event: 'Completed a full language assessment', timestamp: '3 weeks ago' },
    { event: 'Attended a cultural immersion workshop', timestamp: '1 month ago' },
  ];

  const userActivities = {
    '2024-03-01': { studiedKanji: true, chattedWithBot: true },
    '2024-03-04': { studiedKanji: true, chattedWithBot: false },
    '2024-03-07': { studiedKanji: false, chattedWithBot: true },
    // More dates and activities...
  };

  const incrementMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const decrementMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month).getDay();

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<Box key={`empty-${i}`} p={2} opacity={0}></Box>); // Empty boxes for days of previous month
    }
    for (let day = 1; day <= numberOfDays; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayActivities = userActivities[dateKey];

      days.push(
        <Box key={day} p={2} textAlign="center" borderWidth="1px" borderRadius="md">
          <Text fontSize="sm">{day}</Text>
          {dayActivities && (
            <>
              {dayActivities.studiedKanji && <Badge colorScheme="green">Kanji</Badge>}
              {dayActivities.chattedWithBot && <Badge colorScheme="blue">Chatbot</Badge>}
            </>
          )}
        </Box>
      );
    }

    return <SimpleGrid columns={7} spacing={1}>{days}</SimpleGrid>;
  };

  return (
    <>
      <AccountNavbar/>

      <Container maxW="6xl" p={5}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
        <Box flex="1" p={5} borderWidth="1px" borderRadius="lg" shadow="md">
          <VStack spacing={5} align="stretch">
            <Heading as="h1" mb="4">Dashboard</Heading>
            <Text>Hello, {session?.user?.email}! Welcome to your dashboard!</Text>
            
            <Progress hasStripe value={64} w="100%" colorScheme="blue" />
            <Text>Your current learning streak: 5 days</Text>
            <Text>Next milestone: 100 Kanji</Text>
            
            <VStack spacing={4} mt={4} w="100%">
            <LinkBox
                as={Box}
                p="25"
                borderWidth="1px"
                borderRadius="lg"
                shadow="base"
                bg={bgColor}
                _hover={{ shadow: 'lg', bg: hoverBgColor, transform: 'translateY(-2px)', transition: 'all 0.3s' }}
                w="100%"
                textAlign="center"
            >
                <HStack alignItems="center">
                    <Icon as={FaChessRook} w={8} h={8} />
                    <Text fontSize="xl">Assessments</Text>
                </HStack>
                <LinkOverlay href="/assessments"/>
            </LinkBox>

            <LinkBox
                as={Box}
                p="25"
                borderWidth="1px"
                borderRadius="lg"
                shadow="base"
                bg={bgColor}
                _hover={{ shadow: 'lg', bg: hoverBgColor, transform: 'translateY(-2px)', transition: 'all 0.3s' }}
                w="100%"
                textAlign="center"
            >
                <HStack alignItems="center">
                    <Icon as={FaRobot} w={8} h={8} />
                    <Text fontSize="xl">Study with a Friend</Text>
                </HStack>

                <LinkOverlay href="/chatbot"/>
            </LinkBox>

            <LinkBox
                as={Box}
                p="25"
                borderWidth="1px"
                borderRadius="lg"
                shadow="base"
                bg={bgColor}
                _hover={{ shadow: 'lg', bg: hoverBgColor, transform: 'translateY(-2px)', transition: 'all 0.3s' }}
                w="100%"
                textAlign="center"
            >
                <HStack>
                    <Icon as={FaBookOpen} w={8} h={8} />
                    <Text fontSize="xl">Study Kanji</Text>
                </HStack>
                <LinkOverlay href="/kanji"/>
            </LinkBox>

            <LinkBox
                as={Box}
                p="25"
                borderWidth="1px"
                borderRadius="lg"
                shadow="base"
                bg={bgColor}
                _hover={{ shadow: 'lg', bg: hoverBgColor, transform: 'translateY(-2px)', transition: 'all 0.3s' }}
                w="100%"
                textAlign="center"
            >
                <HStack>
                    <Icon as={FaPercent} w={8} h={8} />
                    <Text fontSize="xl">Your Stats</Text>
                </HStack>
                <LinkOverlay href="/stats"/>
            </LinkBox>
            </VStack>
          </VStack>
        </Box>

        <Box w={{ base: "100%", md: "30%" }} p={5} borderWidth="1px" borderRadius="lg" shadow="md" bg={bgColor} overflowY="auto" maxH={800}>
          <Heading as="h3" size="md" mb={4}>Activity Log</Heading>
          <Stack spacing={3}>
            {userLogs.map((log, index) => (
              <Box key={index} p={3} bg={useColorModeValue( "gray.200", "gray.600")} borderRadius="md">
                <Text fontWeight="bold">{log.event}</Text>
                <Badge colorScheme="blue">{log.timestamp}</Badge>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>

      <Accordion defaultIndex={[0]} allowMultiple mt={5}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Study and Chat Calendar
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Button leftIcon={<FaChevronLeft />} onClick={decrementMonth}>Previous</Button>
                <Text>{currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</Text>
                <Button rightIcon={<FaChevronRight />} onClick={incrementMonth}>Next</Button>
              </Flex>
              {renderCalendarDays()}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
    </Container>

    <Box as="footer" py={10}>
    <Text align="center">&copy; {new Date().getFullYear()} Language Leap. All rights reserved.</Text>
    </Box>
    </>
  );
}