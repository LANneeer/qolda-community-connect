import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "@/lib/firebase";
import {
	collection,
	query,
	where,
	onSnapshot,
	getDoc,
	doc
} from "firebase/firestore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ChatListPage() {
	const navigate = useNavigate();
	const [chats, setChats] = useState([]);
	const [userMap, setUserMap] = useState({});
	const currentUser = auth.currentUser;

	useEffect(() => {
		if (!currentUser) return;

		const q = query(collection(db, "chats"), where("participants", "array-contains", currentUser.uid));
		const unsubscribe = onSnapshot(q, async (snapshot) => {
			const fetchedChats = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setChats(fetchedChats);

			// Collect all other participants
			const otherIds = new Set();
			fetchedChats.forEach(chat => {
				chat.participants.forEach(uid => {
					if (uid !== currentUser.uid) otherIds.add(uid);
				});
			});

			const userData = {};
			for (const uid of otherIds) {
				const userSnap = await getDoc(doc(db, "users", uid));
				if (userSnap.exists()) {
					userData[uid] = userSnap.data();
				}
			}
			setUserMap(userData);
		});

		return () => unsubscribe();
	}, [currentUser]);

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-4">
			<h2 className="text-xl font-semibold mb-4">Мои чаты</h2>
			{chats.map(chat => {
				const otherUserId = chat.participants.find(id => id !== currentUser.uid);
				const user = userMap[otherUserId];
				return (
					<Button
						key={chat.id}
						variant="outline"
						className="w-full justify-start gap-4 p-4"
						onClick={() => navigate(`/chat/${chat.id}`)}
					>
						<Avatar className="w-10 h-10">
							<AvatarImage src={user?.avatar || "/placeholder.svg"} />
							<AvatarFallback>{user?.name?.[0]}</AvatarFallback>
						</Avatar>
						<div className="text-left">
							<p className="font-medium">{user?.name || "Неизвестный пользователь"}</p>
							<p className="text-sm text-muted-foreground truncate">{chat.lastMessage || "Нет сообщений"}</p>
						</div>
					</Button>
				);
			})}
		</div>
	);
}
