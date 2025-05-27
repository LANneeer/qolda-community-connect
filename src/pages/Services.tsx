
import { useState, useEffect } from "react";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceFilter from "@/components/services/ServiceFilter";
import { Button } from "@/components/ui/button";
import { Service } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";

import { mockServices } from "@/data/mockData";

export default function Services() {
	const [searchParams] = useSearchParams();
	const [allServices, setAllServices] = useState<Service[]>([]);
	const [filteredServices, setFilteredServices] = useState<Service[]>([]);
	const [filters, setFilters] = useState({
		searchTerm: "",
		categories: [] as string[],
		pricingType: [] as string[],
	});

	const [currentPage, setCurrentPage] = useState(1);
	const servicesPerPage = 3;

	const indexOfLast = currentPage * servicesPerPage;
	const indexOfFirst = indexOfLast - servicesPerPage;
	const paginatedServices = filteredServices.slice(indexOfFirst, indexOfLast);

	const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	useEffect(() => {
		const loadServices = async () => {
			// Use mock services for now
			setAllServices(mockServices as any);
			setFilteredServices(mockServices as any);
		};
		loadServices();
	}, []);

	useEffect(() => {
		const categoryParam = searchParams.get("category");

		if (categoryParam && allServices.length > 0) {
			setFilters((prev) => ({
				...prev,
				categories: [categoryParam],
			}));

			const filtered = allServices.filter((service: any) => service.category === categoryParam);
			setFilteredServices(filtered);
			setCurrentPage(1);
		}
	}, [searchParams, allServices]);

	const handleFilterChange = (newFilters: any) => {
		setFilters(newFilters);

		let results = [...allServices];

		if (newFilters.searchTerm) {
			const searchLower = newFilters.searchTerm.toLowerCase();
			results = results.filter(
				(service: any) =>
					service.title.toLowerCase().includes(searchLower) ||
					service.description.toLowerCase().includes(searchLower)
			);
		}

		if (newFilters.categories?.length > 0) {
			results = results.filter((service: any) => newFilters.categories.includes(service.category));
		}

		setFilteredServices(results);
		setCurrentPage(1); // Reset to first page
	};

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				<section className="bg-muted py-8">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between">
							<div>
								<h1 className="font-heading text-3xl font-bold mb-2">Browse Services</h1>
								<p className="text-muted-foreground">
									Discover services available in your community
								</p>
							</div>
							<Button asChild className="mt-4 md:mt-0 gap-2">
								<Link to="/services/new">
									<Plus className="h-4 w-4" />
									Offer a Service
								</Link>
							</Button>
						</div>
					</div>
				</section>

				<section className="py-8">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
							<div className="lg:col-span-1">
								<ServiceFilter onFilterChange={handleFilterChange} />
							</div>

							<div className="lg:col-span-3">
								{filteredServices.length > 0 ? (
									<>
										<p className="text-muted-foreground mb-4">
											Showing {filteredServices.length} services
										</p>
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
											{paginatedServices.map((service) => (
												<ServiceCard key={service.id} service={service} />
											))}
										</div>

										{/* Pagination Controls */}
										<div className="flex justify-center mt-6 space-x-4">
											<Button
												variant="outline"
												onClick={() => handlePageChange(currentPage - 1)}
												disabled={currentPage === 1}
											>
												← Previous
											</Button>
											<span className="self-center">
												Page {currentPage} of {totalPages}
											</span>
											<Button
												variant="outline"
												onClick={() => handlePageChange(currentPage + 1)}
												disabled={currentPage === totalPages}
											>
												Next →
											</Button>
										</div>
									</>
								) : (
									<div className="text-center py-12">
										<h3 className="font-heading text-xl mb-2">No services found</h3>
										<p className="text-muted-foreground mb-6">
											Try adjusting your filters or search criteria
										</p>
										<Button onClick={() => handleFilterChange({})}>
											Clear All Filters
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
