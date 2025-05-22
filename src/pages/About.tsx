import { CalendarCheck, HandshakeIcon, Globe, HeartHandshake, Trophy, UsersRound } from "lucide-react";

export default function About() {
	const values = [
		{
			title: "Community First",
			icon: <UsersRound className="size-8 text-primary" />,
			description: "We believe in the power of local connections to transform neighborhoods and improve lives."
		},
		{
			title: "Inclusivity",
			icon: <Globe className="size-8 text-primary" />,
			description: "Our platform is designed to be accessible and welcoming to people from all backgrounds."
		},
		{
			title: "Mutual Benefit",
			icon: <HeartHandshake className="size-8 text-primary" />,
			description: "We create space for equitable exchanges where everyone's skills are valued."
		},
		{
			title: "Trust & Safety",
			icon: <Trophy className="size-8 text-primary" />,
			description: "We prioritize building a secure environment where community members can connect with confidence."
		}
	];

	return (
		<div className="min-h-screen flex flex-col">

			<main className="flex-1">
				{/* Hero Section */}
				<section className="bg-muted/30 py-16 md:py-24">
					<div className="container px-4 md:px-6">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Qolda</h1>
							<p className="text-lg md:text-xl text-muted-foreground mb-8">
								Connecting communities through service exchange and skill sharing since 2023.
							</p>
						</div>
					</div>
				</section>

				<section className="py-16">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
							<div>
								<h2 className="text-3xl font-heading font-semibold mb-6">Our Mission</h2>
								<p className="text-lg text-muted-foreground mb-6">
									Qolda was founded with a simple yet powerful mission: to strengthen local communities
									by facilitating the exchange of services and skills between neighbors.
								</p>
								<p className="text-lg text-muted-foreground mb-6">
									We believe that everyone has valuable skills to offer, and that by creating a platform
									for neighbors to connect and help one another, we can build more resilient, connected,
									and vibrant communities.
								</p>
								<p className="text-lg text-muted-foreground">
									Whether it's teaching a skill, offering a helping hand, or sharing expertise,
									Qolda makes it easy for community members to connect and contribute to their local area.
								</p>
							</div>
							<div className="bg-muted/20 p-8 rounded-2xl">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div className="flex flex-col items-center text-center p-4">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
											<CalendarCheck className="size-8 text-primary" />
										</div>
										<h3 className="font-medium text-lg mb-2">Founded</h3>
										<p>2023</p>
									</div>
									<div className="flex flex-col items-center text-center p-4">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
											<UsersRound className="size-8 text-primary" />
										</div>
										<h3 className="font-medium text-lg mb-2">Communities</h3>
										<p>50+</p>
									</div>
									<div className="flex flex-col items-center text-center p-4">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
											<HandshakeIcon className="size-8 text-primary" />
										</div>
										<h3 className="font-medium text-lg mb-2">Exchanges</h3>
										<p>10,000+</p>
									</div>
									<div className="flex flex-col items-center text-center p-4">
										<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
											<Trophy className="size-8 text-primary" />
										</div>
										<h3 className="font-medium text-lg mb-2">Satisfaction</h3>
										<p>98%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

			</main>

		</div>
	);
}
