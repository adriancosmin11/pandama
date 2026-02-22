import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ArrowRight, X, CheckCircle2, Heart, Bolt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, QUICK_VIEW_IMAGE, type Product } from '../constants';
import { useCart } from '../context/CartContext';

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
        <>
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto mb-20">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-xs font-bold tracking-widest uppercase">Lansare Limitată Sezon 04 Activă</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-[120px] font-bold tracking-tighter leading-[0.85] mb-8 uppercase italic"
                    >
                        PANDAMA:<br />
                        <span className="text-primary drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]">LEVEL UP</span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl text-slate-400 text-lg md:text-xl mb-10 font-light"
                    >
                        Creat pentru performanță maximă. Fuzionând estetica futuristă stradală cu meșteșugul japonez. Experimentează noul standard.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link to="/shop" className="px-10 py-4 bg-primary text-black font-bold rounded-full text-lg hover:scale-105 transition-transform neon-glow-primary">
                            CUMPĂRĂ COLECȚIA
                        </Link>
                        <Link to="/drops" className="px-10 py-4 glass text-white font-bold rounded-full text-lg border border-white/10 hover:bg-white/10 transition-all">
                            VEZI LOOKBOOK
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Section */}
            <section className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight uppercase">LANSĂRI RECOMANDATE</h2>
                        <p className="text-slate-500">Echipament de performanță selectat</p>
                    </div>
                    <Link className="text-primary font-bold flex items-center gap-2 group" to="/shop">
                        Vezi Tot <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-auto lg:grid-rows-2 gap-4 h-auto lg:h-[800px]">
                    {/* Main Large Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedProduct(PRODUCTS[0])}
                        className="md:col-span-4 lg:col-span-3 lg:row-span-2 glass rounded-lg overflow-hidden relative group cursor-pointer border border-white/10 hover:border-primary transition-colors"
                    >
                        <img className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" src={PRODUCTS[0].image} alt={PRODUCTS[0].name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
                        <div className="absolute top-6 left-6 flex gap-2">
                            <span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider neon-glow-purple">{PRODUCTS[0].category}</span>
                            <span className="bg-black/50 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">În Stoc</span>
                        </div>
                        <div className="absolute bottom-10 left-10 right-10">
                            <h3 className="text-4xl font-bold mb-2 uppercase tracking-tighter italic">{PRODUCTS[0].name}</h3>
                            <p className="text-slate-400 mb-6 max-w-md">{PRODUCTS[0].description}</p>
                            <div className="flex items-center gap-6">
                                <span className="text-3xl font-bold text-primary">${PRODUCTS[0].price.toFixed(2)}</span>
                                <button
                                    onClick={(e) => handleAddToCart(PRODUCTS[0], e)}
                                    className="px-6 py-3 bg-primary text-black font-bold rounded-full flex items-center gap-2 hover:brightness-110 transition-all"
                                >
                                    <ShoppingCart className="w-4 h-4" /> ADAUGĂ RAPID
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mid-size Card */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedProduct(PRODUCTS[1])}
                        className="md:col-span-2 lg:col-span-3 lg:row-span-1 glass rounded-lg overflow-hidden relative group cursor-pointer border border-white/10 hover:border-primary transition-colors"
                    >
                        <img className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" src={PRODUCTS[1].image} alt={PRODUCTS[1].name} />
                        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <span className="text-primary text-[10px] font-bold mb-1 block uppercase tracking-widest">Ediție Limitată</span>
                            <h3 className="text-2xl font-bold uppercase italic">{PRODUCTS[1].name}</h3>
                            <p className="text-sm text-slate-400">${PRODUCTS[1].price.toFixed(2)}</p>
                        </div>
                        <div className="absolute top-6 right-6">
                            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-black uppercase tracking-wider">{PRODUCTS[1].category}</span>
                        </div>
                    </motion.div>

                    {/* Small Card 1 */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedProduct(PRODUCTS[2])}
                        className="md:col-span-2 lg:col-span-1.5 lg:row-span-1 glass rounded-lg overflow-hidden relative group cursor-pointer border border-white/10 hover:border-primary transition-colors"
                    >
                        <img className="w-full h-full object-cover opacity-50" src={PRODUCTS[2].image} alt={PRODUCTS[2].name} />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute bottom-4 left-4">
                            <h4 className="font-bold text-lg leading-tight uppercase italic">{PRODUCTS[2].name}</h4>
                            <span className="text-primary font-bold">${PRODUCTS[2].price.toFixed(2)}</span>
                        </div>
                    </motion.div>

                    {/* Small Card 2 */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        onClick={() => setSelectedProduct(PRODUCTS[3])}
                        className="md:col-span-2 lg:col-span-1.5 lg:row-span-1 glass rounded-lg overflow-hidden relative group cursor-pointer border border-white/10 hover:border-primary transition-colors"
                    >
                        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/30 transition-colors" />
                        <div className="p-6 h-full flex flex-col justify-between relative z-10">
                            <Bolt className="text-secondary w-10 h-10" />
                            <div>
                                <h4 className="font-bold text-lg leading-tight uppercase italic">{PRODUCTS[3].name}</h4>
                                <p className="text-xs text-slate-300">{PRODUCTS[3].description}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick View Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass max-w-5xl w-full rounded-xl overflow-hidden shadow-2xl relative z-10 border border-white/20"
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-20">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/2 h-[400px] lg:h-auto bg-black flex items-center justify-center p-10 relative">
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ccff00 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    <img className="max-h-full object-contain drop-shadow-[0_0_50px_rgba(204,255,0,0.3)]" src={selectedProduct.image || QUICK_VIEW_IMAGE} alt="Product detail" />
                                </div>
                                <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-secondary px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest neon-glow-purple">{selectedProduct.category} Drop</span>
                                        <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">SKU: {selectedProduct.sku}</span>
                                    </div>
                                    <h2 className="text-5xl font-bold mb-4 italic tracking-tighter uppercase">{selectedProduct.name}</h2>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl font-bold text-primary">${selectedProduct.price.toFixed(2)}</span>
                                        {selectedProduct.originalPrice && (
                                            <span className="text-slate-500 line-through text-lg">${selectedProduct.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm mb-8">{selectedProduct.description}</p>
                                    <div className="space-y-6 mb-10">
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Specificații</h4>
                                            <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                                {selectedProduct.specs.map(spec => (
                                                    <li key={spec} className="flex items-center gap-2 text-slate-200">
                                                        <CheckCircle2 className="text-primary w-4 h-4 shrink-0" /> {spec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleAddToCart(selectedProduct)}
                                            className="flex-1 bg-primary text-black font-bold py-5 rounded-full text-lg hover:brightness-110 transition-all neon-glow-primary active:scale-95"
                                        >
                                            ADAUGĂ ÎN COȘ — ${selectedProduct.price.toFixed(0)}
                                        </button>
                                        <button className="w-16 h-16 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                                            <Heart className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
