import { AuthProvider } from '@/authProviders';
import { Providers } from './providers'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme';

export const metadata = {
  title: "Japanese Learning",
  description: "A full-stack web application targeting Japanese language learning using AI & SRS systems",
};

export default function RootLayout({ children }) {
    return (
      <html lang='en'>
          <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AuthProvider><Providers>{children}</Providers></AuthProvider></body>
      </html>
    )
  }
