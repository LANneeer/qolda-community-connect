import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "@/lib/firebase";
import {
	collection,
	doc,
	addDoc,
	getDoc,
	getDocs,
	deleteDoc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	where
} from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatPage() {
	const { chatId } = useParams();
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [participants, setParticipants] = useState([]);
	const [userMap, setUserMap] = useState({});
	const bottomRef = useRef(null);
	const currentUser = auth.currentUser;

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser, navigate]);

	useEffect(() => {
		const loadParticipants = async () => {
			if (!chatId || !currentUser) return;

			const chatRef = doc(db, "chats", chatId);
			const chatSnap = await getDoc(chatRef);

			if (!chatSnap.exists()) {
				navigate("/not-found");
				return;
			}

			const chatData = chatSnap.data();

			if (!Array.isArray(chatData.participants) || chatData.participants.length !== 2) {
				navigate("/unauthorized");
				return;
			}

			if (!chatData.participants.includes(currentUser.uid)) {
				navigate("/unauthorized");
				return;
			}

			const userDetails = {};
			for (const uid of chatData.participants) {
				const userSnap = await getDoc(doc(db, "users", uid));
				if (userSnap.exists()) {
					userDetails[uid] = userSnap.data();
				}
			}

			setParticipants(chatData.participants);
			setUserMap(userDetails);
		};

		loadParticipants();
	}, [chatId, currentUser, navigate]);

	useEffect(() => {
		if (!chatId) return;
		const messagesRef = collection(db, "chats", chatId, "messages");
		const q = query(messagesRef, orderBy("timestamp"));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
			setMessages(msgs);
		});

		return () => unsubscribe();
	}, [chatId]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = async () => {
		if (!newMessage.trim() || !currentUser || !chatId) return;

		const messagesRef = collection(db, "chats", chatId, "messages");
		await addDoc(messagesRef, {
			text: newMessage,
			senderId: currentUser.uid,
			timestamp: serverTimestamp(),
		});

		setNewMessage("");
		setIsTyping(false);
	};

	const handleDeleteChat = async () => {
		if (chatId) {
			await deleteDoc(doc(db, "chats", chatId));
			navigate("/services");
		}
	};

	let typingTimer;
	const handleTyping = (e) => {
		setNewMessage(e.target.value);
		clearTimeout(typingTimer);
		setIsTyping(true);
		typingTimer = setTimeout(() => setIsTyping(false), 2000);
	};

	return (
		<div className="flex flex-col h-screen max-w-2xl mx-auto border rounded-lg">
			<div className="flex items-center justify-between px-4 py-2 border-b">
				<Button variant="ghost" onClick={() => navigate(-1)}>← Назад</Button>
				<span className="font-medium">Личный чат</span>
				<Button variant="destructive" onClick={handleDeleteChat}>Удалить чат</Button>
			</div>

			<ScrollArea className="flex-1 overflow-y-auto p-4 space-y-2">
				{messages.map((msg) => {
					const user = userMap[msg.senderId];
					return (
						<div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === currentUser.uid ? "justify-end" : "justify-start"}`}>
							{msg.senderId !== currentUser.uid && user && (
								<Avatar className="w-8 h-8">
									<AvatarImage src={user.avatar || "/placeholder.svg"} />
									<AvatarFallback>{user.name?.[0]}</AvatarFallback>
								</Avatar>
							)}
							<div
								className={`p-2 rounded-lg max-w-xs text-sm ${msg.senderId === currentUser.uid ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
									}`}
							>
								{msg.text}
							</div>
						</div>
					);
				})}
				<div ref={bottomRef} />
			</ScrollArea>

			{isTyping && <p className="text-xs text-muted-foreground px-4">Печатает...</p>}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSend();
				}}
				className="p-4 border-t flex gap-2"
			>
				<Input
					value={newMessage}
					onChange={handleTyping}
					placeholder="Напишите сообщение..."
					className="flex-1"
				/>
				<Button type="submit">Отправить</Button>
			</form>
		</div>
	);
}
