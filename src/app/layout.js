import { AuthProvider } from '@/authProviders';
import { Providers } from './providers'

export const metadata = {
  title: "Japanese Learning",
  description: "A full-stack web application targeting Japanese language learning using AI & SRS systems",
};

export default function RootLayout({ children }) {
    return (
      <html lang='en'>
          <body><AuthProvider><Providers>{children}</Providers></AuthProvider></body>
      </html>
    )
  }
