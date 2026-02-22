import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, ShoppingCart, Hexagon, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

export default function Layout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { totalItems, toggleCart } = useCart();

    const navItems = [
        { label: 'Shop', path: '/shop' },
        { label: 'Echipa Pro', path: '/pro-team' },
        { label: 'Lansări', path: '/drops' },
        { label: 'Arhivă', path: '/archive' },
    ];

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Background Pattern */}
            <div className="fixed inset-0 panda-watermark pointer-events-none z-0" />

            {/* Background Glows */}
            <div className="fixed top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full z-0 pointer-events-none" />
            <div className="fixed bottom-1/4 -left-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full z-0 pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-4">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-8 py-3"
                >
                    <Link to="/" className="flex items-center gap-2">
                        <Hexagon className="text-primary w-8 h-8 fill-primary/20" />
                        <span className="text-2xl font-bold tracking-tighter text-white uppercase">PANDAMA</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`text-sm font-medium transition-colors uppercase tracking-wider ${location.pathname === item.path
                                    ? 'text-primary'
                                    : 'hover:text-primary text-white/70'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-all">
                            <Search className="w-5 h-5" />
                        </button>
                        <div className="relative">
                            <button
                                onClick={toggleCart}
                                className="p-2 bg-primary text-black rounded-full flex items-center justify-center neon-glow-primary"
                            >
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-secondary text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </div>


                        <button
                            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-all"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-2 glass rounded-2xl p-6 max-w-7xl mx-auto"
                    >
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-lg font-medium transition-colors uppercase tracking-wider py-2 ${location.pathname === item.path
                                        ? 'text-primary'
                                        : 'hover:text-primary text-white/70'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-6 pb-10">
                <div className="max-w-7xl mx-auto pt-20 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-50">
                    <Link to="/" className="flex items-center gap-2">
                        <Hexagon className="text-primary w-5 h-5" />
                        <span className="font-bold tracking-tighter uppercase">PANDAMA</span>
                    </Link>
                    <div className="flex gap-8 text-xs font-medium uppercase tracking-widest">
                        {['Livrare', 'Termeni', 'Confidențialitate', 'Contact'].map(item => (
                            <a key={item} className="hover:text-primary transition-colors" href="#">{item}</a>
                        ))}
                    </div>
                    <p className="text-xs font-mono">© 2026 PANDAADS. TOATE DREPTURILE REZERVATE.</p>
                </div>
            </footer>

            {/* Cart Drawer */}
            <CartDrawer />
        </div>
    );
}
