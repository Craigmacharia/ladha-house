import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Contact from './pages/Contact';
import Team from './pages/Team';
import AdminRooms from './pages/AdminRooms';
import Register from './pages/Register';
import Login from './pages/Login';
import BookingSummary from './pages/BookingSummary';
import BookRoom from './pages/BookRoom';
import Services from './pages/Services';
import BookService from './pages/BookService';
import Menu from './pages/Menu';
import ServiceSummary from "./pages/ServiceSummary";
import MyServiceBookings from "./pages/MyServiceBookings";
import { HealthyRecipesHome, ConditionRecipes } from './pages/HealthyRecipes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin-rooms" element={<AdminRooms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
        <Route path="/book" element={<Navigate to="/rooms" />} />
        <Route path="/book/:roomId" element={<BookRoom />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book-service/:serviceId" element={<BookService />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/recipes" element={<HealthyRecipesHome />} />
        <Route path="/recipes/:condition" element={<ConditionRecipes />} />
        <Route path="/my-service-bookings" element={<MyServiceBookings />} />
        <Route path="/service-summary" element={<ServiceSummary />} />
      </Routes>
    </Router>
  );
}

export default App;


