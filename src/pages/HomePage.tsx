import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, PlayCircle, Wrench, ArrowRight, Instagram, ChevronRight, X, CheckCircle2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, type Product } from '../constants';
import { useCart } from '../context/CartContext';
import heroImage from '@/src/assets/hero-image.png';
import mistBg from '@/src/assets/mist-bg.png';

export default function HomePage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProduct(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleAddToCart = (product: Product, e?: MouseEvent) => {
        if (e) e.stopPropagation();
        addToCart(product);
        setSelectedProduct(null);
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-20">
                {/* Dynamic Background Mist */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={mistBg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-110"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-40 mix-blend-screen"
                        style={{
                            background: 'radial-gradient(circle at 60% 40%, #2F5233 0%, rgba(20, 20, 20, 0) 70%)',
                            filter: 'blur(120px)'
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/40">PREMIUM KENDAMA LABS</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10 md:mb-12 italic">
                            KENDAMA.<br />
                            <span className="text-gradient-gold italic">FLOW.</span> <span className="text-white italic">SKILL.</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
                            <Link to="/shop" className="btn-primary w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 rounded-md text-xs md:text-sm font-black shadow-[0_20px_40px_rgba(76,175,80,0.3)] hover:-translate-y-1 transition-all">
                                CUMPĂRĂ ACUM
                            </Link>
                            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1 transition-all">
                                VEZI COLECȚIA NOUĂ
                            </button>
                        </div>
                    </motion.div>

                    <div className="relative flex justify-center lg:justify-end items-center h-[350px] sm:h-[450px] lg:h-[600px] mt-10 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 w-full max-w-[650px] aspect-square"
                        >
                            <img
                                src={heroImage}
                                alt="Premium Kendama Collection"
                                className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                            />
                            {/* Accent Detail */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[140px] -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="bg-black/50 border-y border-white/5 backdrop-blur-sm py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    <div className="flex items-center gap-5 group cursor-default">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary transition-colors">
                            <img src="https://lh3.googleusercontent.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Panda Icon" className="w-8 h-8 object-contain" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-sm">KENDAME PREMIUM</h4>
                            <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1">Modele de elită pentru performanță</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 group cursor-default">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary transition-colors">
                            <Wrench className="w-8 h-8 text-white stroke-[1.5]" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-sm">ACCESORII PRO</h4>
                            <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1">String-uri, bețe, grip-uri</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 group cursor-default">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-primary transition-colors">
                            <PlayCircle className="w-8 h-8 text-white stroke-[1.5]" />
                        </div>
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-sm">GHIDURI & TRICKS</h4>
                            <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1">Învăță cele mai tari mișcări</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-3xl font-black uppercase tracking-widest mb-2">CELE MAI VÂNDUTE</h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-[1px] w-12 bg-white/20" />
                            <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Best Sellers</span>
                            <div className="h-[1px] w-12 bg-white/20" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCTS.slice(0, 4).map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedProduct(product)}
                                className="group cursor-pointer relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
                            >
                                {idx === 3 && (
                                    <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider z-10">NOU</span>
                                )}
                                <div className="w-full aspect-square mb-6 overflow-hidden flex items-center justify-center relative bg-gradient-to-b from-white/[0.05] to-transparent rounded-xl">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    {/* Reflection Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-black uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">{product.name}</h3>
                                        <p className="text-primary font-black text-xl mt-1 tracking-tighter">${product.price.toFixed(2)}</p>
                                    </div>
                                    <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
                                        VEZI DETALII
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram Community Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-black via-[#111] to-black border border-white/5 rounded-2xl overflow-hidden p-10 md:p-20 relative text-center">
                        {/* Background overlay */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#2F5233 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
                                Alătură-te comunității Pandama!
                            </h2>
                            <p className="text-white/40 font-medium tracking-widest uppercase text-xs mb-10">
                                Urmărește-ne pe Instagram
                            </p>

                            <button className="flex items-center gap-3 bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] text-white font-bold py-4 px-10 rounded-xl hover:scale-105 transition-all shadow-xl group">
                                <span className="uppercase tracking-widest text-sm">URMĂREȘTE</span>
                                <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Quick View Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-black/40 backdrop-blur-3xl border border-white/10 max-w-5xl w-full rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10 flex flex-col lg:flex-row min-h-[600px]"
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-20">
                                <X className="w-8 h-8 stroke-[1.5]" />
                            </button>

                            <div className="lg:w-1/2 bg-gradient-to-b from-white/[0.03] to-transparent flex items-center justify-center p-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10" />
                                <img className="max-h-[500px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] scale-110" src={selectedProduct.image || "/placeholder-kendama.png"} alt={selectedProduct.name} />
                            </div>

                            <div className="lg:w-1/2 p-12 lg:p-16 text-white flex flex-col justify-center">
                                <div className="mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">{selectedProduct.category} COLLECTION</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black mb-6 italic tracking-tighter uppercase leading-none">{selectedProduct.name}</h2>
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="text-5xl font-black text-white/90 tracking-tighter">${selectedProduct.price.toFixed(2)}</span>
                                    {selectedProduct.originalPrice && (
                                        <span className="text-white/20 line-through text-xl font-bold italic tracking-tight">${selectedProduct.originalPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                <p className="text-white/40 text-sm mb-12 leading-relaxed font-medium uppercase tracking-wide max-w-md">{selectedProduct.description}</p>

                                <div className="space-y-6 mb-12">
                                    <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Specificații Tehnice</h4>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                        {selectedProduct.specs.map(spec => (
                                            <div key={spec} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(76,175,80,0.5)]" /> {spec}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <button
                                        onClick={() => handleAddToCart(selectedProduct)}
                                        className="btn-primary flex-1 py-6 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(76,175,80,0.2)] active:scale-95 flex items-center justify-center gap-4"
                                    >
                                        <ShoppingCart className="w-5 h-5 stroke-[2]" /> ADAUGĂ ÎN COȘ
                                    </button>
                                    <button className="w-20 h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all group">
                                        <Heart className="w-6 h-6 text-white/40 group-hover:text-red-500 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
