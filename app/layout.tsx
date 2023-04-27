import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Roboto } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";
import ToastProvider from "../components/ToastProvider";

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-roboto",
});

export const metadata = {
    title: "FitHeroes",
    description: "Created by Philip Nguyen",
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
                    className={`${roboto.className} bg-gradient-to-b from-[#172554] to-blue-900 h-[calc(100vh-100px)]`}
                >
                    <Navbar />
                    <ToastProvider />
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
