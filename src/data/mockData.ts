import { Service, ServiceCategory, ServiceProvider } from "@/types";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export const services: Service[] = [];

export const fetchServicesFromFirebase = async (): Promise<Service[]> => {
	const snapshot = await getDocs(collection(db, "services"));
	const servicesData: Service[] = snapshot.docs.map((doc) => {
		const data = doc.data();

		return {
			id: doc.id,
			title: data.title,
			description: data.description,
			images: data.images || [],
			categoryId: data.category || "unknown",
			provider: {
				id: data.createdBy?.uid || "anonymous",
				name: data.createdBy?.email || "Anonymous",
				avatar: "/placeholder.svg",
				bio: data.providerBio || "No bio available",
				location: {
					neighborhood: data.location?.neighborhood || "Unknown",
					city: data.location?.city || "Unknown",
					state: data.location?.state || "Unknown",
					zipCode: data.location?.zipCode || "00000"
				},
				memberSince: data.createdAt?.toDate?.() || new Date(),
				skills: data.skills || [],
				ratings: data.ratings || []
			},
			location: data.location || "Unknown",
			availability: data.availability || "",
			pricingType: data.pricingType || "free",
			pricingDetails: data.pricingDetails || "",
			createdAt: data.createdAt?.toDate?.() || new Date(),
			tags: data.tags || [],
			status: "active",
			views: 0
		};
	});
	return servicesData;
};
export const categories: ServiceCategory[] = [
	{
		id: "home-garden",
		name: "Home & Garden",
		icon: "tools",
		description: "Repairs, gardening, cleaning, and other home services"
	},
	{
		id: "education",
		name: "Education & Tutoring",
		icon: "book",
		description: "Tutoring, lessons, workshops, and skill sharing"
	},
	{
		id: "tech",
		name: "Technology",
		icon: "laptop",
		description: "Tech support, device repair, and digital services"
	},
	{
		id: "wellness",
		name: "Health & Wellness",
		icon: "heart",
		description: "Personal care, fitness, mental health, and wellness services"
	},
	{
		id: "arts",
		name: "Arts & Crafts",
		icon: "palette",
		description: "Design, music, photography, and creative services"
	},
	{
		id: "professional",
		name: "Professional Services",
		icon: "briefcase",
		description: "Legal advice, consulting, and business services"
	},
	{
		id: "events",
		name: "Events & Entertainment",
		icon: "calendar",
		description: "Planning, hosting, and entertainment services"
	},
	{
		id: "transportation",
		name: "Transportation",
		icon: "car",
		description: "Rides, deliveries, and moving help"
	},
	{
		id: "community",
		name: "Community Support",
		icon: "users",
		description: "Volunteering, local initiatives, and community support"
	}
];
export const serviceProviders: ServiceProvider[] = [
];


export const communityStats = {
	totalMembers: 1205,
	activeServices: 348,
	completedExchanges: 2741,
	neighborhoodsServed: 17,
	topCategories: [
		{ name: "Home Maintenance", percentage: 28 },
		{ name: "Education", percentage: 22 },
		{ name: "Technology", percentage: 18 },
		{ name: "Creative", percentage: 15 },
		{ name: "Personal Care", percentage: 10 },
		{ name: "Other", percentage: 7 }
	],
	exchangesByMonth: [
		{ month: "Jan", exchanges: 178 },
		{ month: "Feb", exchanges: 190 },
		{ month: "Mar", exchanges: 221 },
		{ month: "Apr", exchanges: 243 },
		{ month: "May", exchanges: 257 },
		{ month: "Jun", exchanges: 289 },
		{ month: "Jul", exchanges: 305 },
		{ month: "Aug", exchanges: 278 },
		{ month: "Sep", exchanges: 260 },
		{ month: "Oct", exchanges: 267 },
		{ month: "Nov", exchanges: 240 },
		{ month: "Dec", exchanges: 213 }
	]
};
