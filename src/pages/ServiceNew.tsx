import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Check, Info, X } from "lucide-react";
import { db, storage, auth } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";


export default function ServiceNew() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		title: "",
		category: "",
		description: "",
		pricingType: "free",
		pricingDetails: "",
		location: "",
		availability: "",
		images: [] as File[],
		terms: false
	});

	const categories = [
		{ id: "home-garden", name: "Home & Garden" },
		{ id: "education", name: "Education & Tutoring" },
		{ id: "tech", name: "Technology" },
		{ id: "wellness", name: "Health & Wellness" },
		{ id: "arts", name: "Arts & Crafts" },
		{ id: "professional", name: "Professional Services" },
		{ id: "events", name: "Events & Entertainment" },
		{ id: "transportation", name: "Transportation" },
		{ id: "community", name: "Community Support" }
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
		}));
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const newFiles = Array.from(e.target.files);
			setFormData(prev => ({
				...prev,
				images: [...prev.images, ...newFiles].slice(0, 5) // Limit to 5 images
			}));
		}
	};

	const removeImage = (index: number) => {
		setFormData(prev => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index)
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.terms) {
			toast({
				title: "Terms Required",
				description: "You must agree to the terms and conditions to create a service.",
				variant: "destructive"
			});
			return;
		}

		setIsSubmitting(true);

		try {
			const user = auth.currentUser;
			if (!user) throw new Error("User not authenticated");

			// 1. Upload images to Firebase Storage
			const imageUrls = await Promise.all(
				formData.images.map(async (file) => {
					const imageRef = ref(storage, `services/${user.uid}/${uuidv4()}_${file.name}`);
					await uploadBytes(imageRef, file);
					return await getDownloadURL(imageRef);
				})
			);

			// 2. Save service to Firestore
			await addDoc(collection(db, "services"), {
				title: formData.title,
				category: formData.category,
				description: formData.description,
				pricingType: formData.pricingType,
				pricingDetails: formData.pricingType !== "free" ? formData.pricingDetails : "",
				location: formData.location,
				availability: formData.availability,
				images: imageUrls,
				terms: formData.terms,
				createdAt: Timestamp.now(),
				createdBy: {
					uid: user.uid,
					email: user.email
				}
			});

			toast({
				title: "Service Created!",
				description: "Your new service has been published successfully.",
			});
			navigate("/services");
		} catch (error) {
			console.error("Error creating service:", error);
			toast({
				title: "Error",
				description: "There was a problem creating your service. Please try again.",
				variant: "destructive"
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col">

			<main className="flex-1 py-12">
				<div className="container px-4 md:px-6">
					<div className="max-w-3xl mx-auto">
						<h1 className="text-3xl font-heading font-bold mb-6">Create a New Service</h1>
						<p className="text-muted-foreground mb-8">
							Share your skills and talents with your community. Fill out the form below to create a new service listing.
						</p>

						<form onSubmit={handleSubmit}>
							<div className="space-y-8">
								{/* Basic Information */}
								<Card>
									<CardHeader>
										<CardTitle>Basic Information</CardTitle>
										<CardDescription>
											Provide the core details about your service
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="title">Service Title</Label>
											<Input
												id="title"
												name="title"
												placeholder="e.g., Professional Garden Maintenance"
												value={formData.title}
												onChange={handleChange}
												required
											/>
											<p className="text-xs text-muted-foreground">
												A clear, descriptive title that explains what you're offering
											</p>
										</div>

										<div className="space-y-2">
											<Label htmlFor="category">Category</Label>
											<Select
												value={formData.category}
												onValueChange={(value) => handleSelectChange("category", value)}
												required
											>
												<SelectTrigger id="category">
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
												<SelectContent>
													{categories.map((category) => (
														<SelectItem key={category.id} value={category.id}>
															{category.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label htmlFor="description">Description</Label>
											<Textarea
												id="description"
												name="description"
												placeholder="Describe your service in detail..."
												value={formData.description}
												onChange={handleChange}
												rows={5}
												required
											/>
											<p className="text-xs text-muted-foreground">
												Include what you offer, your experience level, and any requirements
											</p>
										</div>
									</CardContent>
								</Card>

								{/* Pricing */}
								<Card>
									<CardHeader>
										<CardTitle>Pricing</CardTitle>
										<CardDescription>
											Define how you'd like to offer your service
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<RadioGroup
											value={formData.pricingType}
											onValueChange={(value) => handleSelectChange("pricingType", value)}
											className="space-y-3"
										>
											<div className="flex items-start space-x-2">
												<RadioGroupItem value="free" id="free" className="mt-1" />
												<div className="grid gap-1.5">
													<Label htmlFor="free" className="font-medium">Free</Label>
													<p className="text-sm text-muted-foreground">
														Offer your service at no cost to build community goodwill
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-2">
												<RadioGroupItem value="exchange" id="exchange" className="mt-1" />
												<div className="grid gap-1.5">
													<Label htmlFor="exchange" className="font-medium">Exchange</Label>
													<p className="text-sm text-muted-foreground">
														Barter your service in exchange for other services or items
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-2">
												<RadioGroupItem value="fee" id="fee" className="mt-1" />
												<div className="grid gap-1.5">
													<Label htmlFor="fee" className="font-medium">Fee-Based</Label>
													<p className="text-sm text-muted-foreground">
														Charge a fee for your professional services
													</p>
												</div>
											</div>
										</RadioGroup>

										{formData.pricingType !== "free" && (
											<div className="space-y-2 pt-2">
												<Label htmlFor="pricingDetails">
													{formData.pricingType === "fee"
														? "Price Details"
														: "Exchange Details"
													}
												</Label>
												<Textarea
													id="pricingDetails"
													name="pricingDetails"
													placeholder={
														formData.pricingType === "fee"
															? "e.g., $25/hour, $50 flat rate, etc."
															: "e.g., Willing to exchange for home-cooked meals, tech help, etc."
													}
													value={formData.pricingDetails}
													onChange={handleChange}
													required={formData.pricingType !== "free"}
												/>
											</div>
										)}
									</CardContent>
								</Card>

								{/* Location & Availability */}
								<Card>
									<CardHeader>
										<CardTitle>Location & Availability</CardTitle>
										<CardDescription>
											Let people know where and when your service is available
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="location">Service Location</Label>
											<Input
												id="location"
												name="location"
												placeholder="e.g., Mission District, San Francisco"
												value={formData.location}
												onChange={handleChange}
												required
											/>
											<p className="text-xs text-muted-foreground">
												Neighborhood or area where you offer this service
											</p>
										</div>

										<div className="space-y-2">
											<Label htmlFor="availability">Availability</Label>
											<Textarea
												id="availability"
												name="availability"
												placeholder="e.g., Weekends only, Monday-Friday evenings, etc."
												value={formData.availability}
												onChange={handleChange}
												required
											/>
										</div>
									</CardContent>
								</Card>

								{/* Images */}
								<Card>
									<CardHeader>
										<CardTitle>Service Images</CardTitle>
										<CardDescription>
											Upload photos that showcase your service (optional but recommended)
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
												{formData.images.map((file, index) => (
													<div key={index} className="relative aspect-square rounded-md overflow-hidden border">
														<img
															src={URL.createObjectURL(file)}
															alt={`Upload preview ${index}`}
															className="w-full h-full object-cover"
														/>
														<button
															type="button"
															className="absolute top-2 right-2 bg-background/80 text-foreground p-1 rounded-full hover:bg-background"
															onClick={() => removeImage(index)}
														>
															<X className="size-4" />
															<span className="sr-only">Remove</span>
														</button>
													</div>
												))}

												{formData.images.length < 5 && (
													<div className="aspect-square flex items-center justify-center border border-dashed rounded-md bg-muted/50">
														<Label
															htmlFor="image-upload"
															className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
														>
															<Upload className="size-8 mb-2 text-muted-foreground" />
															<span className="text-sm text-muted-foreground">Upload</span>
															<Input
																id="image-upload"
																type="file"
																accept="image/*"
																className="hidden"
																onChange={handleFileChange}
																multiple
															/>
														</Label>
													</div>
												)}
											</div>
											<p className="text-xs text-muted-foreground">
												Upload up to 5 high-quality images that represent your service
											</p>
										</div>
									</CardContent>
								</Card>

								{/* Terms and Submit */}
								<Card>
									<CardContent className="pt-6">
										<div className="flex items-start space-x-2 mb-6">
											<Switch
												id="terms"
												checked={formData.terms}
												onCheckedChange={(checked) =>
													setFormData(prev => ({ ...prev, terms: checked }))
												}
											/>
											<div className="grid gap-1.5">
												<Label htmlFor="terms" className="font-medium">Terms & Conditions</Label>
												<p className="text-sm text-muted-foreground">
													I agree to Qolda's <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/community-guidelines" className="text-primary hover:underline">Community Guidelines</a>
												</p>
											</div>
										</div>

										<div className="bg-muted/30 border rounded-lg p-4 mb-6 flex items-start gap-3">
											<Info className="size-5 text-muted-foreground shrink-0 mt-0.5" />
											<div>
												<h4 className="font-medium text-sm">Important Note</h4>
												<p className="text-sm text-muted-foreground">
													Your service will be visible to community members in your area once approved.
													We review all services to ensure they meet our community guidelines.
												</p>
											</div>
										</div>

										<div className="flex flex-col sm:flex-row gap-4">
											<Button
												type="button"
												variant="outline"
												className="flex-1"
												onClick={() => navigate(-1)}
												disabled={isSubmitting}
											>
												Cancel
											</Button>
											<Button
												type="submit"
												className="flex-1"
												disabled={isSubmitting}
											>
												{isSubmitting ? (
													<>
														<Loader2 className="size-4 mr-2 animate-spin" />
														Creating Service...
													</>
												) : (
													<>
														<Check className="size-4 mr-2" />
														Create Service
													</>
												)}
											</Button>
										</div>
									</CardContent>
								</Card>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}
