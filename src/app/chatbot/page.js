"use client"
import React, { useState } from 'react';
import { Flex, Input, Button, VStack, Text, Container } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import AccountNavbar from '@/components/AccountNavbar';
import axios from 'axios';

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

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

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4-0125-preview',
          messages: messagesToSend.map(chat => ({ role: chat.sender, content: chat.message })),
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

  return (
    <>
    <AccountNavbar />
    <Container maxW="6xl" p={5}>
    <Flex direction="column" h="90vh">
        <Flex flex="1" p="4" direction="column" justify="flex-end">
            <VStack spacing="4" align="stretch" overflowY="auto">
            {chatHistory.map((chat, index) => (
                <Flex key={index} justify={chat.sender === 'user' ? 'flex-end' : 'flex-start'}>
                <Text p="2" maxW="80%" bg={chat.sender === 'user' ? 'green.200' : 'blue.200'} borderRadius="md">
                    {chat.message}
                </Text>
                </Flex>
            ))}
            </VStack>
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

