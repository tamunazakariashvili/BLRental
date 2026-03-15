import './styles/global.css';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from "./contexts/AuthContext"; // დარწმუნდი რომ იმპორტი სწორია
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import Navbar from './components/Navbar';
import ScrollAnimations from './components/Scroll';
import AuthenticationPage from './pages/AuthenticationPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import PaymentSuccessPage from './pages/PaymentSuccess';
import AdminPanel from './pages/AdminPanel';
import Panel from './pages/Panel';
import { ToastContainer } from "react-toastify";
import Car from './pages/Car';
import ConactUs from './pages/ContactUs';
import ScrollToTop from './utils/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolice';
import TermsOfUse from './pages/TermsOfUse';
import Security from './pages/Security';
import RefundPolicy from './pages/RefundPolicy';
import PaymentFail from './pages/PaymentFailPage';
import BookingDetails from './pages/BookingDetails';


// დამცავი კომპონენტი როუტებისთვის
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/authentication" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/panel" />;

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();


  useEffect(() => {
    // 3 წამიანი ტაიმერი, როგორც ითხოვე
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // თუ loading არის true, გამოჩნდება მხოლოდ ეს ანიმაცია
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">

          {/* გარეთა მბრუნავი რგოლი (ანიმაციური) */}
          <div className="w-24 h-24 border-t-2 border-b-2 border-[rgb(184,147,87)] rounded-full animate-spin"></div>

          {/* შიდა სტატიკური რგოლი დეკორისთვის */}
          <div className="absolute w-20 h-20 border-2 border-gray-200 rounded-full"></div>

          {/* ლოგო ცენტრში */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/logoo.png"
              alt="Logo"
              className="w-12 h-12 object-contain animate-pulse"
            />
          </div>
        </div>

        {/* ტექსტის სექცია */}
        

        {/* დაამატე ეს სტილი შენს გლობალურ CSS-ში ან Tailwind config-ში */}
        <style dangerouslySetInnerHTML={{
          __html: `
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite linear;
        }
      `}} />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden  min-h-screen">


      <Navbar />
      <ScrollToTop /> {/* აქ ჩასვი */}
      <ScrollAnimations />
      <ToastContainer theme="dark" />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<ConactUs />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
        <Route path='/carspage' element={<CarsPage />} />
        <Route path='/car/:id' element={<Car />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path='/security' element={<Security />} />
        <Route path='/refundpolicy' element={<RefundPolicy />} />



        {/* User Dashboard */}
        <Route path="/panel" element={
          <ProtectedRoute>
            <Panel />
          </ProtectedRoute>
        } />

        {/* Admin Dashboard - მხოლოდ ადმინებისთვის */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPanel />
          </ProtectedRoute>
        } />

        <Route path="/admin/bookings/:id" element={
          <ProtectedRoute adminOnly={true}>
            <BookingDetails />
          </ProtectedRoute>
        } />

        {/* ძველი adminpanel-ის გადამისამართება ახალ /admin-ზე */}
        <Route path="/adminpanel" element={<Navigate to="/admin" />} />

        {/* Booking & Payment */}
        <Route path='/bookingpage/:id' element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path='/paymentsuccess' element={<PaymentSuccessPage />} />
        <Route path='/paymentfail' element={<PaymentFail />} />

        {/* 404 - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;