import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { services, categories, fetchServicesFromFirebase } from "@/data/mockData";
import { Service } from "@/types";
import { MapPin, Calendar, MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export default function ServiceDetail() {
	const { id } = useParams();
	const { toast } = useToast();

	const [allServices, setAllServices] = useState<Service[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [providerDetails, setProviderDetails] = useState<{
		phone?: string;
		avatar?: string;
	} | null>(null);
	const navigate = useNavigate();

	async function getOrCreateChatWithUser(providerId: string) {
		const currentUser = auth.currentUser;
		if (!currentUser) throw new Error("User not authenticated");

		const participants = [currentUser.uid, providerId].sort();
		const chatId = participants.join("_");

		const chatRef = collection(db, "chats");
		const q = query(chatRef, where("participants", "==", participants));

		const snapshot = await getDocs(q);

		if (!snapshot.empty) {
			return snapshot.docs[0].id;
		}

		const docRef = await addDoc(chatRef, {
			participants,
			createdAt: serverTimestamp(),
			lastMessage: "",
		});

		return docRef.id;
	}
	useEffect(() => {
		const loadServices = async () => {
			setIsLoading(true);
			try {
				const fetched = await fetchServicesFromFirebase();
				setAllServices(fetched);
			} finally {
				setIsLoading(false);
			}
		};
		loadServices();
	}, []);

	const service = allServices.find((s) => s.id === id);

	useEffect(() => {
		const fetchProviderDetails = async () => {
			if (service?.provider.id) {
				try {
					const docRef = doc(db, "users", service.provider.id);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const data = docSnap.data();
						setProviderDetails({
							phone: data.phone || "",
							avatar: data.avatar || ""
						});
					}
				} catch (err) {
					console.error("Failed to fetch provider details:", err);
				}
			}
		};
		fetchProviderDetails();
	}, [service?.provider.id]);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500 mx-auto mb-4" />
					<p className="text-muted-foreground">Загрузка данных...</p>
				</div>
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
				{/* Header */}
				<section className="bg-muted py-8">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col md:items-start gap-4">
							<div className="flex flex-wrap gap-2 mb-2">
								<Badge>{category?.name || 'Uncategorized'}</Badge>
								<Badge variant={
									service.pricingType === 'free'
										? 'default'
										: service.pricingType === 'exchange'
											? 'secondary'
											: 'outline'
								}>
									{service.pricingType === 'free' ? 'Free' :
										service.pricingType === 'exchange' ? 'Skill Exchange' : 'Paid Service'}
								</Badge>
							</div>
							<h1 className="font-heading text-3xl md:text-4xl font-bold">{service.title}</h1>
							<div className="flex items-center text-muted-foreground">
								<MapPin className="h-4 w-4 mr-1" />
								<span>{service.location.neighborhood}, {service.location.city}, {service.location.state}</span>
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
										src={service.images?.[0] || "/placeholder.svg"}
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
												{service.location.neighborhood} and surrounding areas in {service.location.city}
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
													src={providerDetails?.avatar || service.provider.avatar || "/placeholder.svg"}
													alt={service.provider.name}
												/>
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
											<p className="text-sm text-muted-foreground">
												Member since {formatDate(service.provider.memberSince)}
											</p>
											{providerDetails?.phone && (
												<p className="text-sm text-muted-foreground mt-2">📞 {providerDetails.phone}</p>
											)}
										</div>

										<Separator className="my-4" />

										<div className="space-y-4">
											<div>
												<h4 className="font-medium mb-2">Bio</h4>
												<p className="text-sm text-muted-foreground">{service.provider.bio}</p>
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
											<Button
												className="w-full gap-2"
												onClick={async () => {
													try {
														const chatId = await getOrCreateChatWithUser(service.provider.id);
														navigate(`/chat/${chatId}`);
													} catch (err) {
														toast({
															title: "Ошибка запуска чата",
															description: String(err),
															variant: "destructive"
														});
													}
												}}
											>
												<MessageSquare className="h-4 w-4" />
												Contact {service.provider.name.split(" ")[0]}
											</Button>
											<Button variant="outline" className="w-full" asChild>
												<Link to={`/profile/${service.provider.id}`}>
													View Profile
												</Link>
											</Button>
										</div>
									</CardContent>
								</Card>

								{/* Pricing */}
								{service.pricingType !== 'free' && (
									<Card className="mb-6">
										<CardContent className="p-6">
											<h3 className="font-heading font-medium text-lg mb-4">Pricing Details</h3>
											<p className="text-muted-foreground mb-4">{service.pricingDetails}</p>
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
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
