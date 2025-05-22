import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
	const { toast } = useToast();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		setTimeout(() => {
			setIsSubmitting(false);
			toast({
				title: "Message sent!",
				description: "We'll get back to you as soon as possible.",
			});
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: ""
			});
		}, 1500);
	};

	const contactInfo = [
		{
			icon: <Mail className="size-5" />,
			title: "Email",
			details: "hello@qolda.com",
			description: "For general inquiries and support"
		},
		{
			icon: <Phone className="size-5" />,
			title: "Phone",
			details: "+1 (555) 123-4567",
			description: "Monday-Friday, 9AM-5PM PST"
		},
		{
			icon: <MapPin className="size-5" />,
			title: "Office",
			details: "123 Community Lane, San Francisco, CA",
			description: "Open for appointments only"
		}
	];

	return (
		<div className="min-h-screen flex flex-col">

			<main className="flex-1">
				{/* Hero Section */}
				<section className="bg-muted/30 py-16">
					<div className="container px-4 md:px-6">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Contact Us</h1>
							<p className="text-lg md:text-xl text-muted-foreground">
								Have questions or feedback about Qolda? We're here to help.
							</p>
						</div>
					</div>
				</section>

				<section className="py-16">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
							{contactInfo.map((item, index) => (
								<Card key={index}>
									<CardContent className="p-6 flex flex-col items-center text-center">
										<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
											{item.icon}
										</div>
										<h3 className="font-heading text-lg font-medium mb-2">{item.title}</h3>
										<p className="font-medium mb-2">{item.details}</p>
										<p className="text-sm text-muted-foreground">{item.description}</p>
									</CardContent>
								</Card>
							))}
						</div>

						<div className="grid grid-cols lg:grid-cols gap-12">
							<div>
								<h2 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h2>
								<p className="text-muted-foreground mb-8">
									Fill out the form below and our team will get back to you as soon as possible.
								</p>

								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label htmlFor="name" className="block text-sm font-medium mb-2">
												Your Name
											</label>
											<Input
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												placeholder="John Doe"
												required
											/>
										</div>
										<div>
											<label htmlFor="email" className="block text-sm font-medium mb-2">
												Email Address
											</label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												placeholder="john@example.com"
												required
											/>
										</div>
									</div>

									<div>
										<label htmlFor="subject" className="block text-sm font-medium mb-2">
											Subject
										</label>
										<Input
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											placeholder="How can we help?"
											required
										/>
									</div>

									<div>
										<label htmlFor="message" className="block text-sm font-medium mb-2">
											Message
										</label>
										<Textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											placeholder="Tell us more about your inquiry..."
											rows={5}
											required
										/>
									</div>

									<Button type="submit" className="w-full" disabled={isSubmitting}>
										{isSubmitting ? "Sending..." : "Send Message"}
									</Button>
								</form>
							</div>

						</div>
					</div>
				</section>
			</main>

		</div>
	);
}
