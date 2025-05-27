
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth, db, storage } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
	User, 
	Mail, 
	Phone, 
	Calendar, 
	Edit3, 
	Save, 
	LogOut, 
	Camera,
	MapPin
} from "lucide-react";

export default function Profile() {
	const { t } = useTranslation();
	const { toast } = useToast();
	const [user, setUser] = useState<any>(null);
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [phone, setPhone] = useState("");
	const [bio, setBio] = useState("");
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
				const ref = doc(db, "users", user.uid);
				const snap = await getDoc(ref);

				if (snap.exists()) {
					const data = snap.data();
					setProfile(data);
					setPhone(data.phone || "");
					setBio(data.bio || "");
				} else {
					const newProfile = {
						name: user.displayName || "Unnamed",
						email: user.email || "",
						createdAt: new Date().toISOString(),
						phone: "",
						bio: "",
						avatar: ""
					};
					await setDoc(ref, newProfile);
					setProfile(newProfile);
					toast({
						title: t('profile.profileCreated'),
						description: t('profile.profileCreatedDesc')
					});
				}
			} else {
				setUser(null);
				setProfile(null);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, [t]);

	const handleLogout = async () => {
		await signOut(auth);
		toast({ title: t('profile.loggedOut') });
		navigate("/login");
	};

	const handleSave = async () => {
		if (!user) return;
		setSaving(true);
		
		try {
			const ref = doc(db, "users", user.uid);
			let avatarUrl = profile.avatar || "";

			if (avatarFile) {
				const storagePath = `avatars/${user.uid}/${avatarFile.name}`;
				const imageRef = storageRef(storage, storagePath);
				await uploadBytes(imageRef, avatarFile);
				avatarUrl = await getDownloadURL(imageRef);
			}

			await updateDoc(ref, {
				phone,
				bio,
				avatar: avatarUrl
			});

			setProfile((prev: any) => ({ ...prev, phone, bio, avatar: avatarUrl }));
			setAvatarFile(null);
			toast({ title: t('profile.profileUpdated') });
			setEditMode(false);
		} catch (error) {
			toast({ 
				title: "Error", 
				description: "Failed to update profile",
				variant: "destructive"
			});
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-red-500 text-center">
				<p>Error: {error}</p>
			</div>
		);
	}

	if (!user || !profile) {
		return (
			<div className="min-h-screen flex items-center justify-center text-muted-foreground">
				No profile data found.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
			<div className="container max-w-4xl mx-auto px-4">
				
				{/* Header Card */}
				<Card className="mb-8 overflow-hidden">
					<div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10"></div>
					<CardContent className="relative pb-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16">
							<div className="relative">
								<Avatar className="w-32 h-32 border-4 border-background shadow-lg">
									<AvatarImage src={profile.avatar || ""} />
									<AvatarFallback className="text-2xl bg-primary/10">
										{profile.name?.[0] || "U"}
									</AvatarFallback>
								</Avatar>
								{editMode && (
									<label className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
										<Camera className="h-4 w-4" />
										<input
											type="file"
											accept="image/*"
											className="hidden"
											onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
										/>
									</label>
								)}
							</div>
							
							<div className="flex-1 space-y-2">
								<h1 className="text-3xl font-bold">{profile.name || "Unknown User"}</h1>
								<p className="text-muted-foreground flex items-center gap-2">
									<Mail className="h-4 w-4" />
									{user.email}
								</p>
								<div className="flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									{t('profile.memberSince')} {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
								</div>
								<Badge variant="secondary" className="mt-2">
									Verified Member
								</Badge>
							</div>

							<div className="flex gap-2">
								{editMode ? (
									<>
										<Button
											variant="outline"
											onClick={() => {
												setEditMode(false);
												setPhone(profile.phone || "");
												setBio(profile.bio || "");
												setAvatarFile(null);
											}}
											disabled={saving}
										>
											Cancel
										</Button>
										<Button 
											onClick={handleSave} 
											disabled={saving}
											className="gap-2"
										>
											{saving ? (
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
											) : (
												<Save className="h-4 w-4" />
											)}
											{t('profile.save')}
										</Button>
									</>
								) : (
									<>
										<Button
											variant="outline"
											onClick={handleLogout}
											className="gap-2"
										>
											<LogOut className="h-4 w-4" />
											{t('profile.logout')}
										</Button>
										<Button onClick={() => setEditMode(true)} className="gap-2">
											<Edit3 className="h-4 w-4" />
											{t('profile.edit')}
										</Button>
									</>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					
					{/* Contact Information */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Phone className="h-5 w-5" />
								Contact Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="text-sm font-medium text-muted-foreground mb-2 block">
									{t('profile.phoneNumber')}
								</label>
								{editMode ? (
									<Input 
										value={phone} 
										onChange={(e) => setPhone(e.target.value)} 
										placeholder={t('profile.enterPhone')}
									/>
								) : (
									<div className="p-3 bg-muted rounded-md">
										{phone || t('profile.notProvided')}
									</div>
								)}
							</div>
						</CardContent>
					</Card>

					{/* Bio Section */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<User className="h-5 w-5" />
								{t('profile.bio')}
							</CardTitle>
						</CardHeader>
						<CardContent>
							{editMode ? (
								<Textarea 
									value={bio} 
									onChange={(e) => setBio(e.target.value)} 
									placeholder={t('profile.tellAboutYourself')}
									rows={4}
									className="resize-none"
								/>
							) : (
								<div className="p-3 bg-muted rounded-md min-h-[100px] whitespace-pre-wrap">
									{bio || t('profile.noBioAdded')}
								</div>
							)}
						</CardContent>
					</Card>

					{/* Stats Card */}
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle>Activity Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary">0</div>
									<div className="text-sm text-muted-foreground">Services Offered</div>
								</div>
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary">0</div>
									<div className="text-sm text-muted-foreground">Services Used</div>
								</div>
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary">5.0</div>
									<div className="text-sm text-muted-foreground">Average Rating</div>
								</div>
								<div className="text-center p-4 bg-muted/50 rounded-lg">
									<div className="text-2xl font-bold text-primary">100%</div>
									<div className="text-sm text-muted-foreground">Response Rate</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
