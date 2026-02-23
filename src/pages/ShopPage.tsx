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
                className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16"
            >
                <div className="flex flex-wrap justify-center items-center gap-3">
                    <SlidersHorizontal className="w-4 h-4 text-white/20 mr-2" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${activeCategory === cat
                                ? 'bg-primary border-primary text-white'
                                : 'bg-transparent border-white/10 text-white/40 hover:text-white hover:border-white/30'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setSortBy(prev => prev === 'default' ? 'price-asc' : prev === 'price-asc' ? 'price-desc' : 'default')}
                    className="flex items-center gap-3 px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-white/60"
                >
                    <ArrowUpDown className="w-3 h-3" />
                    {sortBy === 'default' ? 'SORTEAZĂ DUPĂ PREȚ' : sortBy === 'price-asc' ? 'PREȚ: MIC → MARE' : 'PREȚ: MARE → MIC'}
                </button>
            </motion.div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filtered.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedProduct(product)}
                        className="product-card group cursor-pointer relative"
                    >
                        <div className="w-full aspect-[4/5] mb-6 overflow-hidden flex items-center justify-center relative bg-[#F5F5F5] rounded-md">
                            <img
                                src={product.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBjBPr-SqKcvmlYGjll5PjL4knJkCDSkI8tfjxErDG7EvP-QvhDv0h27YvOh5ncNok24PGm0-Z6mBW6tYNjWVgwD0GnCDOZ1KR1P855T2kXhRUeNdF_DMBPCQnEnP4dR7udwFIQACxAdbuLFkdzG9uNcOhHyCF3_BeFMoJ9D6LVW155zu3gxxU0oxsR-hP3wi3M6YoGav3Qws5TyFknTUWNQ4oPSFSKmf_yJp_CXMQISEaeJXTf--NTN2CexmFf7m2IczI9sJ_taNK8"}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/80 text-white text-[8px] font-bold px-3 py-1 rounded uppercase tracking-[0.2em]">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                        <h3 className="uppercase tracking-tight text-black font-bold">{product.name}</h3>
                        <p className="text-[#2F5233] font-bold mb-4">${product.price.toFixed(2)}</p>
                        <button className="btn-details">
                            VEZI DETALII <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-32">
                    <p className="text-white/20 uppercase tracking-[0.3em] font-bold">Niciun produs găsit în această categorie.</p>
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
                            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col lg:flex-row min-h-[600px]"
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors z-20">
                                <X className="w-8 h-8" />
                            </button>

                            <div className="lg:w-1/2 bg-[#F5F5F5] flex items-center justify-center p-10">
                                <img className="max-h-[500px] object-contain" src={selectedProduct.image || "/placeholder-kendama.png"} alt={selectedProduct.name} />
                            </div>

                            <div className="lg:w-1/2 p-10 lg:p-14 text-black flex flex-col justify-center">
                                <div className="mb-4 text-xs font-bold text-black/20 uppercase tracking-[0.4em]">
                                    {selectedProduct.category} COLLECTION
                                </div>
                                <h2 className="text-5xl font-black mb-4 italic tracking-tighter uppercase">{selectedProduct.name}</h2>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl font-black text-[#2F5233]">${selectedProduct.price.toFixed(2)}</span>
                                    {selectedProduct.originalPrice && (
                                        <span className="text-black/20 line-through text-lg font-bold">${selectedProduct.originalPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                <p className="text-black/60 text-sm mb-10 leading-relaxed font-medium">{selectedProduct.description}</p>

                                <div className="space-y-4 mb-10">
                                    <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Specificații Premium</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedProduct.specs.map(spec => (
                                            <div key={spec} className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-black/80">
                                                <CheckCircle2 className="text-[#2F5233] w-4 h-4 shrink-0" /> {spec}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleAddToCart(selectedProduct)}
                                        className="flex-1 bg-gradient-to-b from-[#4CAF50] to-[#2F5233] text-white font-black py-5 rounded-xl text-lg hover:brightness-110 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 uppercase tracking-tighter"
                                    >
                                        <ShoppingCart className="w-6 h-6" /> ADAUGĂ ÎN COȘ
                                    </button>
                                    <button className="w-16 h-16 border-2 border-black/5 rounded-xl flex items-center justify-center hover:bg-black/5 transition-colors">
                                        <Heart className="w-6 h-6 text-black/20" />
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
