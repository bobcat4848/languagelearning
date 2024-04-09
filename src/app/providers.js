'use client'

// theme.js or wherever you define your theme
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}