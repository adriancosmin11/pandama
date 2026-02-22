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
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Animated Cyber Grid */}
                <div className="absolute inset-0 grid-cyber" />

                {/* Dot Pattern */}
                <div className="absolute inset-0 panda-watermark" />

                {/* Floating Orb 1 - Green, top-right */}
                <div
                    className="absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[150px]"
                    style={{ animation: 'float-orb-1 20s ease-in-out infinite' }}
                />

                {/* Floating Orb 2 - Purple, bottom-left */}
                <div
                    className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[130px]"
                    style={{ animation: 'float-orb-2 25s ease-in-out infinite' }}
                />

                {/* Floating Orb 3 - Mixed, center */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[120px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(204,255,0,0.06), rgba(168,85,247,0.06))',
                        animation: 'float-orb-3 18s ease-in-out infinite',
                    }}
                />
            </div>

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

            <footer className="relative z-10 px-6 pb-10">
                <div className="max-w-7xl mx-auto pt-20 border-t border-white/10 flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-8 opacity-50">
                    <Link to="/" className="flex items-center gap-2">
                        <Hexagon className="text-primary w-5 h-5" />
                        <span className="font-bold tracking-tighter uppercase">PANDAMA</span>
                    </Link>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs font-medium uppercase tracking-widest">
                        {['Livrare', 'Termeni', 'Confidențialitate', 'Contact'].map(item => (
                            <a key={item} className="hover:text-primary transition-colors" href="#">{item}</a>
                        ))}
                    </div>
                    <p className="text-xs font-mono text-center">© 2026 PANDAMA LABS. TOATE DREPTURILE REZERVATE.</p>
                </div>
            </footer>

            {/* Cart Drawer */}
            <CartDrawer />
        </div>
    );
}
