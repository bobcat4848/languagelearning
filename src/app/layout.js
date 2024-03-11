import { Providers } from './providers'
import {UserProvider} from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Japanese Learning",
  description: "A full-stack web application targeting Japanese language learning using AI & SRS systems",
};

export default function RootLayout({ children }) {
    return (
      <html lang='en'>
        <UserProvider>
          <body><Providers>{children}</Providers></body>
        </UserProvider>
      </html>
    )
  }
