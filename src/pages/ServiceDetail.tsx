
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/mockData";
import { Service } from "@/types";
import { MapPin, Calendar, MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { RootState, AppDispatch } from "@/store";
import { fetchServices } from "@/store/slices/servicesSlice";

export default function ServiceDetail() {
	const { id } = useParams();
	const { t } = useTranslation();
	const { toast } = useToast();
	const navigate = useNavigate();
	const dispatch = useDispatch < AppDispatch > ();

	const { items: services, status } = useSelector((state: RootState) => state.services);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (services.length === 0) {
			dispatch(fetchServices());
		}
	}, [dispatch, services.length]);

	const service = services.find((s) => s.id === id);

	if (status === 'loading') {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-muted-foreground">{t('loading')}</p>
			</div>
		);
	}

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

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				{/* Header */}
				<section className="bg-muted py-8">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col md:items-start gap-4">
							<div className="flex flex-wrap gap-2 mb-2">
								<Badge>{category?.name || 'Technology'}</Badge>
								<Badge variant="outline">
									{service.pricingDetails || 'Contact for pricing'}
								</Badge>
							</div>
							<h1 className="font-heading text-3xl md:text-4xl font-bold">{service.title}</h1>
							<div className="flex items-center text-muted-foreground">
								<MapPin className="h-4 w-4 mr-1" />
								<span>{service.location.neighborhood}, {service.location.city}</span>
							</div>
						</div>
					</div>
				</section>

				{/* Content */}
				<section className="py-8">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

							{/* Main content */}
							<div className="lg:col-span-2">
								<div className="rounded-lg overflow-hidden mb-8">
									<img
										src={service.images && service.images.length > 0 ? service.images[0] : "/placeholder.svg"}
										alt={service.title}
										className="w-full h-auto aspect-video object-cover"
									/>
								</div>

								<div className="mb-8">
									<h2 className="font-heading text-2xl font-semibold mb-4">Description</h2>
									<p className="text-muted-foreground whitespace-pre-line">{service.description}</p>
								</div>

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
												<h3 className="font-medium">Service Area</h3>
											</div>
											<p className="text-muted-foreground">
												{service.location.neighborhood}, {service.location.city} and surrounding areas
											</p>
										</CardContent>
									</Card>
								</div>
							</div>

							{/* Sidebar */}
							<div>
								{/* Provider */}
								<Card className="mb-6">
									<CardContent className="p-6">
										<div className="text-center mb-4">
											<Avatar className="w-20 h-20 mx-auto mb-3">
												<AvatarImage
													src={service.provider.avatar || "/placeholder.svg"}
													alt={service.provider.name}
												/>
												<AvatarFallback>
													{service.provider.name.split(' ').map(n => n[0]).join('')}
												</AvatarFallback>
											</Avatar>
											<h3 className="font-heading font-medium text-lg mb-1">
												{service.provider.name}
											</h3>
											<div className="flex items-center justify-center gap-1 mb-2">
												{Array(5).fill(0).map((_, i) => (
													<Star
														key={i}
														className={`h-4 w-4 ${i < (service.provider.averageRating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
													/>
												))}
												<span className="ml-1 text-sm text-muted-foreground">
													{service.provider.averageRating || 0}
												</span>
											</div>
										</div>

										<div className="mt-6 space-y-2">
											<Button
												className="w-full gap-2"
												onClick={() => {
													toast({
														title: "Contact Feature",
														description: "Contact functionality will be available soon!",
													});
												}}
											>
												<MessageSquare className="h-4 w-4" />
												Contact {service.provider.name.split(" ")[0]}
											</Button>
											<Button variant="outline" className="w-full">
												View Profile
											</Button>
										</div>
									</CardContent>
								</Card>

								{/* Pricing */}
								{service.pricingDetails && (
									<Card className="mb-6">
										<CardContent className="p-6">
											<h3 className="font-heading font-medium text-lg mb-4">Pricing</h3>
											<p className="text-2xl font-bold text-primary mb-2">{service.pricingDetails}</p>
											<p className="text-sm text-muted-foreground">
												Contact provider for detailed pricing information
											</p>
										</CardContent>
									</Card>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
