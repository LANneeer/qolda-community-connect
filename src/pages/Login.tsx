import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/lib/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const [loginData, setLoginData] = useState({
		email: "",
		password: ""
	});

	const [signupData, setSignupData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData(prev => ({ ...prev, [name]: value }));
	};

	const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignupData(prev => ({ ...prev, [name]: value }));
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
			navigate("/profile");
			toast({ title: "Вход выполнен", description: "Добро пожаловать!" });
		} catch (err: any) {
			toast({ title: "Ошибка входа", description: err.message, variant: "destructive" });
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		if (signupData.password !== signupData.confirmPassword) {
			toast({
				title: "Пароли не совпадают",
				description: "Пожалуйста, убедитесь, что пароли совпадают.",
				variant: "destructive"
			});
			return;
		}
		setIsLoading(true);
		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				signupData.email,
				signupData.password
			);
			await setDoc(doc(db, "users", userCred.user.uid), {
				name: signupData.name,
				email: signupData.email,
				createdAt: new Date().toISOString()
			});
			navigate("/profile");
			toast({ title: "Аккаунт создан", description: "Вы успешно зарегистрировались!" });
		} catch (err: any) {
			toast({ title: "Ошибка регистрации", description: err.message, variant: "destructive" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 flex items-center justify-center py-12 px-4">
				<div className="w-full max-w-md">
					<Tabs defaultValue="login" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="login">Вход</TabsTrigger>
							<TabsTrigger value="signup">Регистрация</TabsTrigger>
						</TabsList>
						<TabsContent value="login">
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Вход</CardTitle>
									<CardDescription>Введите данные для входа</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleLogin} className="space-y-4">
										<Input
											name="email"
											placeholder="Email"
											type="email"
											value={loginData.email}
											onChange={handleLoginChange}
											required
										/>
										<Input
											name="password"
											placeholder="Пароль"
											type={showPassword ? "text" : "password"}
											value={loginData.password}
											onChange={handleLoginChange}
											required
										/>
										<div className="flex items-center space-x-2">
											<input
												type="checkbox"
												checked={showPassword}
												onChange={() => setShowPassword(!showPassword)}
												id="show-password"
											/>
											<Label htmlFor="show-password">Показать пароль</Label>
										</div>
										<Button type="submit" className="w-full" disabled={isLoading}>
											{isLoading ? "Вход..." : "Войти"}
										</Button>
									</form>
								</CardContent>
							</Card>
						</TabsContent>
						<TabsContent value="signup">
							<Card>
								<CardHeader>
									<CardTitle className="text-2xl">Регистрация</CardTitle>
									<CardDescription>Создайте новый аккаунт</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleSignup} className="space-y-4">
										<Input
											name="name"
											placeholder="Ваше имя"
											value={signupData.name}
											onChange={handleSignupChange}
											required
										/>
										<Input
											name="email"
											placeholder="Email"
											type="email"
											value={signupData.email}
											onChange={handleSignupChange}
											required
										/>
										<Input
											name="password"
											placeholder="Пароль"
											type="password"
											value={signupData.password}
											onChange={handleSignupChange}
											required
										/>
										<Input
											name="confirmPassword"
											placeholder="Подтвердите пароль"
											type="password"
											value={signupData.confirmPassword}
											onChange={handleSignupChange}
											required
										/>
										<Button type="submit" className="w-full" disabled={isLoading}>
											{isLoading ? "Создание..." : "Зарегистрироваться"}
										</Button>
									</form>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</div>
	);
}
