import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, SlidersHorizontal, X, CheckCircle2, Heart, ChevronRight, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, type Product } from '../constants';
import { useCart } from '../context/CartContext';

type Category = 'All' | Product['category'];
type SortBy = 'default' | 'price-asc' | 'price-desc';

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [sortBy, setSortBy] = useState<SortBy>('default');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

    const handleAddToCart = (product: Product, e?: MouseEvent) => {
        if (e) e.stopPropagation();
        addToCart(product);
        setSelectedProduct(null);
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProduct(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const categories: Category[] = ['All', 'Legendary', 'Rare', 'Limited', 'Standard'];

    const filtered = PRODUCTS
        .filter(p => activeCategory === 'All' || p.category === activeCategory)
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Page Header */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-20 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 italic">
                    COLECȚIA <span className="text-primary">PANDAMA</span>
                </h1>
                <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium uppercase tracking-widest text-xs">
                    Echipament de performanță creat pentru cei care nu acceptă compromisuri.
                </p>
            </motion.div>

            {/* Filters & Sorting */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20"
            >
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <SlidersHorizontal className="w-5 h-5 text-white/20 mr-2" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${activeCategory === cat
                                ? 'bg-primary border-primary text-white shadow-[0_10px_30px_rgba(76,175,80,0.3)]'
                                : 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setSortBy(prev => prev === 'default' ? 'price-asc' : prev === 'price-asc' ? 'price-desc' : 'default')}
                    className="flex items-center gap-4 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white"
                >
                    <ArrowUpDown className="w-4 h-4 text-primary" />
                    {sortBy === 'default' ? 'SORTEAZĂ DUPĂ PREȚ' : sortBy === 'price-asc' ? 'PREȚ: MIC → MARE' : 'PREȚ: MARE → MIC'}
                </button>
            </motion.div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {filtered.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white/5 border border-white/10 rounded-[2rem] p-8 group cursor-pointer relative transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08] backdrop-blur-md"
                    >
                        <div className="w-full aspect-square mb-8 overflow-hidden flex items-center justify-center relative bg-white/[0.03] rounded-2xl border border-white/5">
                            <img
                                src={product.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBjBPr-SqKcvmlYGjll5PjL4knJkCDSkI8tfjxErDG7EvP-QvhDv0h27YvOh5ncNok24PGm0-Z6mBW6tYNjWVgwD0GnCDOZ1KR1P855T2kXhRUeNdF_DMBPCQnEnP4dR7udwFIQACxAdbuLFkdzG9uNcOhHyCF3_BeFMoJ9D6LVW155zu3gxxU0oxsR-hP3wi3M6YoGav3Qws5TyFknTUWNQ4oPSFSKmf_yJp_CXMQISEaeJXTf--NTN2CexmFf7m2IczI9sJ_taNK8"}
                                alt={product.name}
                                className="h-[80%] object-contain group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700"
                            />
                            <div className="absolute top-5 left-5">
                                <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em]">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                        <h3 className="uppercase tracking-tighter text-white font-black italic text-xl mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-white/40 font-bold mb-8 italic tracking-tight">${product.price.toFixed(2)}</p>

                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">VEZI DETALII</span>
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                                <ChevronRight className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-40">
                    <p className="text-white/10 uppercase tracking-[0.4em] font-black text-xs">Niciun produs găsit în această categorie.</p>
                </div>
            )}

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
                                <div className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block w-fit">
                                    {selectedProduct.category} COLLECTION
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
