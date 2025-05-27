
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, Bell } from "lucide-react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navItems = [
		{ name: "Browse Services", href: "/services" },
		{ name: "Offer a Service", href: "/services/new" },
		{ name: "How It Works", href: "/how-it-works" },
		{ name: "My chats", href: "/chats" },
	];

	return (
		<header className="border-b bg-background sticky top-0 z-50">
			<div className="container flex items-center justify-between h-16 px-4 md:px-6">
				<Link to="/" className="flex items-center gap-2">
					<img
						src="/images/logo.png"
						alt="Project Logo"
						className="h-14 w-auto"
					/>

					<span className="font-heading font-semibold text-xl hidden sm:inline-block">
						Qolda
					</span>
				</Link>

				<nav className="hidden md:flex gap-6">
					{navItems.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							className="text-foreground/70 hover:text-foreground transition-colors font-medium"
						>
							{item.name}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<Link to="/profile" className="p-2 text-foreground/70 hover:text-foreground rounded-full">
						<User className="size-5" />
					</Link>
					<Button asChild className="hidden md:flex">
						<Link to="/login">Sign In</Link>
					</Button>

					{/* Mobile menu button */}
					<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="size-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[80%] sm:w-[350px]">
							<div className="flex flex-col h-full">
								<div className="flex items-center justify-between pb-4 border-b">
									<Link
										to="/"
										className="flex items-center gap-2"
										onClick={() => setIsMenuOpen(false)}
									>
										<img
											src="/images/logo.png"
											alt="Project Logo"
											className="h-14 w-auto"
										/>

										<span className="font-heading font-semibold text-lg">Qolda</span>
									</Link>
								</div>
								<nav className="flex flex-col gap-0.5 mt-4">
									{navItems.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className="py-2 px-4 hover:bg-muted rounded-md transition-colors"
											onClick={() => setIsMenuOpen(false)}
										>
											{item.name}
										</Link>
									))}
								</nav>
								<div className="mt-auto pt-4 border-t">
									<Button asChild className="w-full">
										<Link
											to="/login"
											onClick={() => setIsMenuOpen(false)}
										>
											Sign In
										</Link>
									</Button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
