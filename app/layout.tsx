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
	openGraph: {
		title: "FitHeroes",
		description: "FitHeroes is a fitness app",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<ClerkProvider>
				<body className={`${roboto.className}`}>
					<Navbar />
					<ToastProvider />
					{children}
				</body>
			</ClerkProvider>
		</html>
	);
}
