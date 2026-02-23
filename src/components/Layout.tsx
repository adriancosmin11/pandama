import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, User, Menu, X, Instagram } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import mistBg from '@/src/assets/mist-bg.png';

export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { totalItems, toggleCart } = useCart();

    const navItems = [
        { label: 'Acasă', path: '/' },
        { label: 'Kendame', path: '/shop' },
        { label: 'Accesorii', path: '/accessories' },
        { label: 'Ghiduri & Tricks', path: '/guides' },
        { label: 'Comunitate', path: '/community' },
    ];

    return (
        <div className="min-h-screen relative bg-black selection:bg-primary selection:text-white">
            {/* Background Mist Effect */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <img
                    src={mistBg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen scale-110"
                />
                <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-15"
                    style={{
                        background: 'radial-gradient(circle at 50% 30%, #2F5233 0%, transparent 60%)',
                        filter: 'blur(100px)'
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-3 md:gap-4 shrink-0 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-primary/50 transition-all duration-300">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white group-hover:text-primary transition-colors">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="currentColor" opacity="0.2" />
                                    <path d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" fill="currentColor" />
                                    <path d="M8 10a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2zm-4 3c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-lg md:text-2xl font-black tracking-tighter text-white uppercase italic group-hover:text-primary transition-colors">PANDAMA</span>
                            <span className="hidden sm:block text-[8px] font-black tracking-[0.3em] text-white/40 uppercase mt-0.5">Premium Kendamas</span>
                        </div>
                    </Link>

                    {/* Centered Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                            >
                                {item.label}
                                {location.pathname === item.path && (
                                    <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-3 md:gap-5">
                        <button className="hidden xs:block text-white hover:text-primary transition-colors">
                            <Search className="w-6 h-6 stroke-[1.5]" />
                        </button>
                        <button className="text-white hover:text-primary transition-colors">
                            <User className="w-6 h-6 stroke-[1.5]" />
                        </button>
                        <button onClick={toggleCart} className="text-white hover:text-primary transition-colors relative">
                            <ShoppingCart className="w-6 h-6 stroke-[1.5]" />
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-white"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </button>
                        <button
                            className="lg:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

            </nav>

            <main className="relative z-10 min-h-[calc(100vh-80px-300px)]">
                <Outlet />
            </main>

            {/* Premium Minimalist Footer */}
            <footer className="relative z-10 bg-black pt-20 pb-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <Link to="/" className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                            <img src="https://lh3.googleusercontent.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Panda Logo" className="w-8 h-8 object-contain" />
                            <span className="font-extrabold tracking-tighter uppercase italic text-sm">PANDAMA</span>
                        </Link>

                        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                            {[
                                { label: 'Livrare', path: '/shipping' },
                                { label: 'Termeni', path: '/terms' },
                                { label: 'Confidențialitate', path: '/privacy' },
                                { label: 'Contact', path: '/contact' },
                            ].map(item => (
                                <Link key={item.label} to={item.path} className="hover:text-primary transition-colors">{item.label}</Link>
                            ))}
                        </div>

                        <p className="text-[10px] font-medium text-white/20 uppercase tracking-widest">
                            © 2026 PANDAMA. TOATE DREPTURILE REZERVATE.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Cart Drawer */}
            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-3xl overflow-y-auto"
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="min-h-full w-full flex flex-col justify-start items-center p-10 pt-32 relative bg-black/20"
                        >
                            <button
                                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X className="w-10 h-10 stroke-[1.2]" />
                            </button>

                            <div className="flex flex-col items-center gap-8">
                                {navItems.map((item, idx) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className="text-4xl font-black uppercase tracking-tighter italic hover:text-primary transition-colors text-white text-center"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-16 flex gap-8">
                                <Instagram className="w-6 h-6 text-white/40 hover:text-primary transition-colors" />
                                <Search className="w-6 h-6 text-white/40 hover:text-primary transition-colors" />
                                <User className="w-6 h-6 text-white/40 hover:text-primary transition-colors" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CartDrawer />
        </div>
    );
}
