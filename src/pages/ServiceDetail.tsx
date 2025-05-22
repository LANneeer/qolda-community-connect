import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { services, categories } from "@/data/mockData";
import { Service } from "@/types";
import { MapPin, Calendar, MessageSquare, Star, Share2, Flag, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function ServiceDetail() {
	const { id } = useParams();
	const service = services.find((s) => s.id === id);

	if (!service) {
		return (
			<div className="min-h-screen flex flex-col">

				<main className="flex-1 flex items-center justify-center">
					<div className="text-center">
						<h1 className="font-heading text-2xl mb-4">Service Not Found</h1>
						<p className="text-muted-foreground mb-6">
							The service you're looking for doesn't exist or has been removed.
						</p>
						<Button asChild>
							<Link to="/services">Back to Services</Link>
						</Button>
					</div>
				</main>
			</div>
		);
	}

	const category = categories.find((c) => c.id === service.categoryId);

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(new Date(date));
	};

	const calculateAverageRating = (service: Service) => {
		if (!service.provider.ratings || service.provider.ratings.length === 0) {
			return 0;
		}

		const sum = service.provider.ratings.reduce((acc, rating) => acc + rating.rating, 0);
		return sum / service.provider.ratings.length;
	};

	const renderStars = (rating: number) => {
		return Array(5).fill(0).map((_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
			/>
		));
	};

	const averageRating = calculateAverageRating(service);

	return (
		<div className="min-h-screen flex flex-col">

			<main className="flex-1">
				{/* Service Header */}
				<section className="bg-muted py-8">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col md:items-start gap-4">
							<div className="flex flex-wrap gap-2 mb-2">
								<Badge>
									{category?.name || 'Uncategorized'}
								</Badge>
								<Badge variant={service.pricingType === 'free' ? 'default' : service.pricingType === 'exchange' ? 'secondary' : 'outline'}>
									{service.pricingType === 'free' ? 'Free' :
										service.pricingType === 'exchange' ? 'Skill Exchange' : 'Paid Service'}
								</Badge>
							</div>

							<h1 className="font-heading text-3xl md:text-4xl font-bold">{service.title}</h1>

							<div className="flex items-center text-muted-foreground">
								<MapPin className="h-4 w-4 mr-1" />
								<span>
									{service.location.neighborhood}, {service.location.city}, {service.location.state}
								</span>
							</div>

							<div className="flex gap-4 mt-2">
								<Button>Contact Provider</Button>
								<Button variant="outline" className="gap-2">
									<Heart className="h-4 w-4" />
									Save
								</Button>
								<Button variant="ghost" size="icon">
									<Share2 className="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Service Content */}
				<section className="py-8">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Main Content */}
							<div className="lg:col-span-2">
								{/* Image */}
								<div className="rounded-lg overflow-hidden mb-8">
									<img
										src={service.images?.[0] || "/placeholder.svg"}
										alt={service.title}
										className="w-full h-auto aspect-video object-cover"
									/>
								</div>

								{/* Description */}
								<div className="mb-8">
									<h2 className="font-heading text-2xl font-semibold mb-4">Description</h2>
									<p className="text-muted-foreground whitespace-pre-line">
										{service.description}
									</p>
								</div>

								{/* Details */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
									<Card>
										<CardContent className="p-4">
											<div className="flex items-center gap-2 mb-2">
												<Calendar className="h-5 w-5 text-muted-foreground" />
												<h3 className="font-medium">Availability</h3>
											</div>
											<p className="text-muted-foreground">{service.availability}</p>
										</CardContent>
									</Card>

									<Card>
										<CardContent className="p-4">
											<div className="flex items-center gap-2 mb-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<circle cx="12" cy="12" r="10" />
													<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
													<path d="M2 12h20" />
												</svg>
												<h3 className="font-medium">Service Area</h3>
											</div>
											<p className="text-muted-foreground">
												{service.location.neighborhood} and surrounding areas in {service.location.city}
											</p>
										</CardContent>
									</Card>
								</div>

								{/* Tags */}
								<div className="mb-8">
									<h3 className="font-medium mb-2">Tags</h3>
									<div className="flex flex-wrap gap-2">
										{service.tags.map((tag) => (
											<Badge key={tag} variant="outline">
												{tag}
											</Badge>
										))}
									</div>
								</div>

								{/* Reviews */}
								<div>
									<h2 className="font-heading text-2xl font-semibold mb-4">Reviews</h2>
									{service.provider.ratings && service.provider.ratings.length > 0 ? (
										<div className="space-y-6">
											{service.provider.ratings.map((rating, index) => (
												<div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
													<div className="flex justify-between">
														<div className="flex items-center gap-2 mb-2">
															<div className="flex">
																{renderStars(rating.rating)}
															</div>
															<span className="text-sm text-muted-foreground">
																{formatDate(rating.createdAt)}
															</span>
														</div>
													</div>
													<p className="text-muted-foreground">{rating.comment}</p>
												</div>
											))}
										</div>
									) : (
										<p className="text-muted-foreground">No reviews yet.</p>
									)}
								</div>
							</div>

							{/* Sidebar */}
							<div>
								{/* Provider Card */}
								<Card className="mb-6">
									<CardContent className="p-6">
										<div className="text-center mb-4">
											<Avatar className="w-20 h-20 mx-auto mb-3">
												<AvatarImage src={service.provider.avatar || "/placeholder.svg"} alt={service.provider.name} />
												<AvatarFallback>
													{service.provider.name.split(' ').map(n => n[0]).join('')}
												</AvatarFallback>
											</Avatar>
											<h3 className="font-heading font-medium text-lg mb-1">
												{service.provider.name}
												{service.provider.verificationBadge && (
													<span className="inline-block ml-1 bg-blue-500 text-white rounded-full size-4 text-xs flex items-center justify-center">✓</span>
												)}
											</h3>
											<div className="flex justify-center items-center gap-1 mb-1">
												{renderStars(averageRating)}
												<span className="text-sm text-muted-foreground ml-1">
													({service.provider.ratings.length})
												</span>
											</div>
											<p className="text-sm text-muted-foreground">
												Member since {formatDate(service.provider.memberSince)}
											</p>
										</div>

										<Separator className="my-4" />

										<div className="space-y-4">
											<div>
												<h4 className="font-medium mb-2">Bio</h4>
												<p className="text-sm text-muted-foreground">
													{service.provider.bio}
												</p>
											</div>

											<div>
												<h4 className="font-medium mb-2">Skills</h4>
												<div className="flex flex-wrap gap-1.5">
													{service.provider.skills.map((skill) => (
														<Badge key={skill} variant="secondary" className="text-xs">
															{skill}
														</Badge>
													))}
												</div>
											</div>
										</div>

										<div className="mt-6 space-y-2">
											<Button className="w-full gap-2">
												<MessageSquare className="h-4 w-4" />
												Contact {service.provider.name.split(' ')[0]}
											</Button>
											<Button variant="outline" className="w-full" asChild>
												<Link to={`/profile/${service.provider.id}`}>
													View Profile
												</Link>
											</Button>
										</div>
									</CardContent>
								</Card>

								{/* Pricing Card */}
								{service.pricingType !== 'free' && (
									<Card className="mb-6">
										<CardContent className="p-6">
											<h3 className="font-heading font-medium text-lg mb-4">Pricing Details</h3>
											<p className="text-muted-foreground mb-4">
												{service.pricingDetails}
											</p>

											{service.pricingType === 'exchange' && (
												<div className="bg-secondary/10 p-4 rounded-md text-sm">
													<p className="font-medium mb-1">What is skill exchange?</p>
													<p className="text-muted-foreground">
														This provider is willing to exchange their services for other skills or services you may offer.
													</p>
												</div>
											)}
										</CardContent>
									</Card>
								)}

								{/* Safety Tips */}
								<Card>
									<CardContent className="p-6">
										<h3 className="font-heading font-medium text-lg mb-4">Safety Tips</h3>
										<ul className="text-sm text-muted-foreground space-y-2">
											<li className="flex gap-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="m8 12 3 3 6-6" />
												</svg>
												<span>Meet in public places for initial discussions</span>
											</li>
											<li className="flex gap-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="m8 12 3 3 6-6" />
												</svg>
												<span>Discuss expectations clearly before exchanging services</span>
											</li>
											<li className="flex gap-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="m8 12 3 3 6-6" />
												</svg>
												<span>Use our messaging system to keep communication records</span>
											</li>
											<li className="flex gap-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
													<path d="m8 12 3 3 6-6" />
												</svg>
												<span>Report any concerns immediately</span>
											</li>
										</ul>

										<Button variant="outline" className="w-full mt-4 gap-2" size="sm">
											<Flag className="h-4 w-4" />
											Report This Service
										</Button>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</section>

			</main>

		</div>
	);
}
