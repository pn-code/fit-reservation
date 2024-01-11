import { Karla } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs/app-beta";
import Navbar from "@/components/navigation/Navbar";
import "@/app/globals.css";
import ToastProvider from "@/providers/ToastProvider";

const karla = Karla({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-karla",
});

export const metadata = {
  title: "FitHeroes",
  description: "For all your fitness related needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${karla.className}`}>
          <Navbar />
          <ToastProvider />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
