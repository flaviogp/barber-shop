import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"

export const metadata: Metadata = {
  title: "Barber Shop",
  description: "Barber shop project",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
