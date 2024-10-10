import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import WarehouseDetailsPage from './pages/WarehouseDetailsPage';
import UserDashboardPage from './pages/UserDashboardPage';
import VendorDashboardPage from './pages/VendorDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <AuthProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/warehouse/:id" element={<WarehouseDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/user-dashboard"
                      element={
                        <PrivateRoute>
                          <UserDashboardPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/vendor-dashboard"
                      element={
                        <PrivateRoute>
                          <VendorDashboardPage />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
                <Chatbot />
              </div>
            </Router>
            <ToastContainer position="top-right" autoClose={5000} />
          </AuthProvider>
        </Elements>
      </PersistGate>
    </Provider>
  );
}

export default App;