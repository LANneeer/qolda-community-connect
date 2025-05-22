import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
	const { toast } = useToast();
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);

				const ref = doc(db, "users", user.uid);
				const snap = await getDoc(ref);

				if (snap.exists()) {
					setProfile(snap.data());
				} else {
					const newProfile = {
						name: user.displayName || "Unnamed",
						email: user.email || "",
						createdAt: new Date().toISOString(),
					};

					await setDoc(ref, newProfile);
					setProfile(newProfile);

					toast({
						title: "Profile created",
						description: "A new profile document was created in Firestore"
					});
				}
			} else {
				setUser(null);
				setProfile(null);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		toast({ title: "Logged out" });
		navigate('/login');
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-muted-foreground">
				Loading profile...
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
		<div className="min-h-screen flex items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="flex flex-col items-center">
					<Avatar className="w-24 h-24 mb-4">
						<AvatarImage src={profile.avatar || ""} />
						<AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
					</Avatar>
					<CardTitle className="text-center">{profile.name || "Unknown"}</CardTitle>
					<p className="text-sm text-muted-foreground">{user.email}</p>
				</CardHeader>
				<CardContent className="space-y-4 text-center">
					<p className="text-sm text-muted-foreground">
						Member since: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
					</p>
					<Button variant="outline" onClick={handleLogout}>
						Logout
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
