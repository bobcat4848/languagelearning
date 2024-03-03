'use client'

const config = {
    initialColorMode: 'dark', // 'dark' | 'light'
    useSystemColorMode: true,
}

import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }) {
  return <ChakraProvider config={config}>{children}</ChakraProvider>
}