import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NewsDetail from './components/NewsDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ModifyUserForm from './pages/ModifyUserForm';
import PaymentStripe from './pages/PaymentStripe';
import SubscriptionCards from './pages/SubscriptionCards';
import Reward from './pages/Reward';
import GamesContainer from './pages/GamesContainer';
import Forum from './pages/Forum';
import FormForum from './pages/FormForum';
import ForumDetail from './pages/ForumDetail';
import GamesDetails from './pages/GamesDetails';
import Chat from './pages/Chat';
import Community from './pages/Community';
import AdminDashboard from './pages/AdminDashboard';
import Quests from './pages/Quests';

function App() {
	return (
		<div>
			<Routes>
				<Route index element={<LandingPage />} />
				<Route path="/home" element={<Home />} />
				<Route path="/profile/:id" element={<Profile />} />
				<Route path="/profile/:id/edit" element={<ModifyUserForm />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/news/:id" element={<NewsDetail />} />
				<Route path="/subscription" element={<SubscriptionCards />} />
				<Route path="/games" element={<GamesContainer />} />
				<Route path="/payment" element={<PaymentStripe />} />
				<Route path="/rewards" element={<Reward />} />
				<Route path="/forum" element={<Forum />} />
				<Route path="/post" element={<FormForum />} />
				<Route path="/post/:id" element={<FormForum />} />
				<Route path="/postDetails/:id" element={<ForumDetail />} />
				<Route path="/games/:id" element={<GamesDetails />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/play" element={<Community />} />
				<Route path="/admin" element={<AdminDashboard />} />
        <Route path="/quests" element={<Quests />} />
			</Routes>
		</div>
	);
}

export default App;
