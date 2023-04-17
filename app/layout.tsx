import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Roboto } from "next/font/google";
import Navbar from "../components/Navbar";
import Head from "./head";
import "./globals.css";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	variable: "--font-roboto",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head/>
			<ClerkProvider>
				<body className={`${roboto.className}`}>
					<Navbar />
					{children}
				</body>
			</ClerkProvider>
		</html>
	);
}
