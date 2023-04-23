import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="bg-blue-900 text-white py-6 px-6 flex justify-between items-center fixed w-full top-0 left-0 z-50">
			<header className="flex items-center gap-4">
				<Link className="hover:underline font-medium" href="/dashboard">
					<Image
						className="rounded-sm cursor-pointer"
						src="/assets/logo.png"
						alt="FitHeroes Logo"
						width={160}
						height={100}
					/>
				</Link>
			</header>

			<ul className="flex gap-4">
				<Link className="hover:underline font-medium" href="/dashboard">
					Dashboard
				</Link>
				<Link
					className="hover:underline font-medium"
					href="/calculator"
				>
					Calculator
				</Link>
				<Link
					className="hover:underline font-medium"
					href="/tracker/overview"
				>
					Tracker
				</Link>
				<Link className="hover:underline font-medium" href="/profile">
					Profile
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
