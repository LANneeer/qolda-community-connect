
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "./components/layout/Layout.tsx"
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import ChatListPage from "./pages/ChatList.tsx";
import Profile from "./pages/Profile";
import ServiceNew from "./pages/ServiceNew";
import Admin from "./pages/Admin";
import './i18n';

const queryClient = new QueryClient();

const App = () => (
	<Provider store={store}>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Index />} />
								<Route path="/services" element={<Services />} />
								<Route path="/services/new" element={<ServiceNew />} />
								<Route path="/services/:id" element={<ServiceDetail />} />
								<Route path="/how-it-works" element={<HowItWorks />} />
								<Route path="/chat/:chatId" element={<ChatPage />} />
								<Route path="/chats" element={<ChatListPage />} />
								<Route path="/about" element={<About />} />
								<Route path="/contact" element={<Contact />} />
								<Route path="/login" element={<SignIn />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/admin" element={<Admin />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</TooltipProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</Provider>
);

export default App;
