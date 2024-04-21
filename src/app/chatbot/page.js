'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Flex, Input, Button, VStack, Text, Container, Box } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import AccountNavbar from '@/components/AccountNavbar';
import axios from 'axios';

const ChatPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chat history changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
  
    const updatedChatHistory = [
      ...chatHistory,
      { sender: 'user', message: inputText }
    ];
    setChatHistory(updatedChatHistory);
  
    setInputText('');
  
    try {
      const lastUserMessages = updatedChatHistory
        .filter(chat => chat.sender === 'user')
        .slice(-10); // Get last 10 user messages to prevent too many tokens being used
  
      const lastBotMessages = updatedChatHistory
        .filter(chat => chat.sender === 'assistant')
        .slice(-10); // Get last 10 assistant messages to prevent too many tokens being used
  
      const messagesToSend = [...lastUserMessages, ...lastBotMessages];
  
      let promptText = "You are assisting a user with learning or working on their japanese skills. Provide as much information that you can. Provide some cultural information as well if relevant\n";
      messagesToSend.forEach(chat => {
        promptText += `${chat.sender}: ${chat.message}\n`;
      });
      promptText += `User: ${inputText}\n`;
      promptText += `Assistant: `;
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-0125-preview',
          messages: [{ role: 'user', content: promptText }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );
  
      const botResponse = response.data.choices[0].message.content;
  
      setTimeout(() => {
        setChatHistory(prevChatHistory => [
          ...prevChatHistory,
          { sender: 'assistant', message: botResponse }
        ]);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  if (status === 'loading') {
    return null;
  }

  // If user is not authenticated, redirect to login page
  if (!session) {
    router.push('/login');
    return null; // Prevent further rendering
  }

  return (
    <>
      <AccountNavbar />
      <Container maxW="6xl" p={5}>
        <Flex direction="column" h="90vh">
          <Flex flex="1" p="4" direction="column" justify="flex-end" overflowY="scroll" sx={{
            // Hide scrollbar
            '&::-webkit-scrollbar': {
              width: '0px',
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          }}>
            <Box
              ref={chatContainerRef}
              flex="1"
              overflowY="scroll"
              sx={{
                // Hide scrollbar
                '&::-webkit-scrollbar': {
                  width: '0px',
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
              }}
            >
              <VStack spacing="4" align="stretch">
                {chatHistory.map((chat, index) => (
                  <Flex key={index} justify={chat.sender === 'user' ? 'flex-end' : 'flex-start'}>
                    <Text p="2" maxW="80%" bg={chat.sender === 'user' ? 'green.200' : 'blue.200'} borderRadius="md">
                      {chat.message}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </Flex>
          <Flex p="4">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              variant="filled"
              mr="2"
            />
            <Button onClick={sendMessage} leftIcon={<ChatIcon />} colorScheme="blue">
              Send
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default ChatPage;
