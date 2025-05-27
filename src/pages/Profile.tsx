import { useEffect, useState } from "react";
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


export default function Profile() {
	const { toast } = useToast();
	const [user, setUser] = useState<any>(null);
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [phone, setPhone] = useState("");
	const [bio, setBio] = useState("");
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [editMode, setEditMode] = useState(false);

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

	const handleLogout = async () => {
		await signOut(auth);
		toast({ title: "Logged out" });
		navigate("/login");
	};

	const handleSave = async () => {
		if (!user) return;
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

		setProfile((prev: any) => ({ ...prev, avatar: avatarUrl }));
		setAvatarFile(null);
		toast({ title: "Profile updated" });
		setEditMode(false);
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

				<CardContent className="space-y-4">
					<p className="text-center text-sm text-muted-foreground">
						Member since: {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
					</p>

					{editMode ? (
						<>
							<div className="space-y-2">
								<label className="text-sm font-medium">Phone Number</label>
								<Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone" />
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Bio</label>
								<Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell something about yourself" />
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Profile Image</label>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
								/>
							</div>
							<div className="flex justify-between mt-4">
								<Button variant="outline" onClick={handleLogout}>Logout</Button>
								<Button onClick={handleSave}>Save</Button>
							</div>
						</>
					) : (
						<>
							<div className="space-y-2">
								<p className="text-sm font-medium text-left">Phone Number</p>
								<p className="border rounded px-3 py-2 bg-muted">{phone || "Not provided"}</p>
							</div>
							<div className="space-y-2">
								<p className="text-sm font-medium text-left">Bio</p>
								<p className="border rounded px-3 py-2 bg-muted whitespace-pre-wrap">{bio || "No bio added"}</p>
							</div>
							<div className="flex justify-between mt-4">
								<Button variant="outline" onClick={handleLogout}>Logout</Button>
								<Button onClick={() => setEditMode(true)}>Edit</Button>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
