
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/services/ServiceCard";
import CategoryCard from "@/components/services/CategoryCard";
import { categories } from "@/data/mockData";
import { Search, MapPin, ArrowRight, Users } from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { fetchServices } from "@/store/slices/servicesSlice";
import { fetchCommunityStats } from "@/store/slices/communityStatsSlice";

export default function Index() {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();
	const { items: services } = useSelector((state: RootState) => state.services);
	
	useEffect(() => {
		dispatch(fetchServices());
		dispatch(fetchCommunityStats());
	}, [dispatch]);

	const featuredServices = services.slice(0, 4);
	const displayedCategories = categories.slice(0, 8);

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-16 md:py-24">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
							<div className="space-y-6">
								<h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
									{t('home.title')}
								</h1>
								<p className="text-lg md:text-xl opacity-90 max-w-md">
									{t('home.subtitle')}
								</p>
								<div className="flex flex-wrap gap-4">
									<Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
										<Link to="/services">{t('home.findServices')}</Link>
									</Button>
									<Button size="lg" variant="outline" asChild className="border-white text-primary hover:bg-white/90">
										<Link to="/services/new">{t('home.offerService')}</Link>
									</Button>
								</div>
							</div>
							<div className="relative hidden md:block">
								<img
									src="/images/pic.jpg"
									alt="Community members exchanging services"
									className="rounded-lg shadow-xl max-w-full h-auto"
								/>
							</div>
						</div>
					</div>
					<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
				</section>

				{/* Categories Section */}
				<section className="py-12 bg-muted/50">
					<div className="container px-4 md:px-6">
						<div className="flex justify-between items-end mb-8">
							<div>
								<h2 className="font-heading text-3xl font-semibold">{t('home.serviceCategories')}</h2>
								<p className="text-muted-foreground mt-2">{t('home.exploreCategoriesSubtitle')}</p>
							</div>
							<Link to="/services" className="flex items-center text-primary hover:underline">
								{t('home.viewAll')}
								<ArrowRight className="ml-1 h-4 w-4" />
							</Link>
						</div>

						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
							{displayedCategories.map((category) => (
								<CategoryCard key={category.id} category={category} />
							))}
						</div>
					</div>
				</section>

				{/* Featured Services Section */}
				<section className="py-12">
					<div className="container px-4 md:px-6">
						<div className="flex justify-between items-end mb-8">
							<div>
								<h2 className="font-heading text-3xl font-semibold">{t('home.featuredServices')}</h2>
								<p className="text-muted-foreground mt-2">{t('home.recentlyAddedSubtitle')}</p>
							</div>
							<Link to="/services" className="flex items-center text-primary hover:underline">
								{t('home.viewAll')}
								<ArrowRight className="ml-1 h-4 w-4" />
							</Link>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredServices.map((service) => (
								<ServiceCard key={service.id} service={service} />
							))}
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-16 bg-primary text-white">
					<div className="container px-4 md:px-6 text-center">
						<h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
							{t('home.readyToConnect')}
						</h2>
						<p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
							{t('home.joinToday')}
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
								<Link to="/login">{t('home.signUpNow')}</Link>
							</Button>
							<Button size="lg" variant="outline" asChild className="bg-white text-primary hover:bg-white/90">
								<Link to="/services">{t('home.browseServices')}</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
