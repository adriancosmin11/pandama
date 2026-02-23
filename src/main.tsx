import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AccessoriesPage from './pages/AccessoriesPage';
import GuidesPage from './pages/GuidesPage';
import CommunityPage from './pages/CommunityPage';
import ShippingPage from './pages/ShippingPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
        <CookieConsent />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);

