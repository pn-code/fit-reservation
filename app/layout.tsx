import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Karla } from "next/font/google";
import Navbar from "../components/navigation/Navbar";
import "./globals.css";
import ToastProvider from "../components/ToastProvider";

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
                <body
                    className={`${karla.className} bg-gray-900 h-full`}
                >
                    <Navbar />
                    <ToastProvider />
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
