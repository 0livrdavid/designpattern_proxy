import { ReactNode } from "react"
import './globals.css'

export const metadata = {
     title: 'Design Pattern Proxy',
     description: 'Design Pattern Proxy',
}

export default function RootLayout({
     children,
}: {
     children: ReactNode
}) {
     return (
          <html lang="pt-br" className="h-full bg-white">
               <body className="h-full">
                    {children}
               </body>
          </html>
     )
}
