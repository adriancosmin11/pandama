import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, SlidersHorizontal, X, CheckCircle2, Heart, Bolt, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, QUICK_VIEW_IMAGE, type Product } from '../constants';
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

    const categoryColors: Record<Product['category'], string> = {
        Legendary: 'bg-secondary neon-glow-purple',
        Rare: 'bg-primary text-black',
        Limited: 'bg-orange-500',
        Standard: 'bg-white/20',
    };

    return (
        <>
            <section className="max-w-7xl mx-auto">
                {/* Page Header */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic mb-4">
                        <span className="text-primary">MAGAZINUL</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-xl">
                        Explorează întreaga noastră colecție de echipament de înaltă performanță. Fiecare piesă creată pentru excelență.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4 text-slate-500 mr-1" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat
                                    ? 'bg-primary text-black neon-glow-primary'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white/70'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setSortBy(prev => prev === 'default' ? 'price-asc' : prev === 'price-asc' ? 'price-desc' : 'default')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                        <ArrowUpDown className="w-3 h-3" />
                        {sortBy === 'default' ? 'Sortează după Preț' : sortBy === 'price-asc' ? 'Preț: Mic → Mare' : 'Preț: Mare → Mic'}
                    </button>
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -6 }}
                            onClick={() => setSelectedProduct(product)}
                            className="glass rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-primary transition-all group"
                        >
                            <div className="relative h-56 overflow-hidden bg-black/30">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                                        <Bolt className="w-16 h-16 text-secondary/50" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${categoryColors[product.category]}`}>
                                        {product.category}
                                    </span>
                                </div>
                                {product.originalPrice && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-red-500/80 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                                            SALE
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold uppercase tracking-tight italic mb-1">{product.name}</h3>
                                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="text-slate-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => handleAddToCart(product, e)}
                                        className="p-2 bg-primary text-black rounded-full hover:brightness-110 transition-all"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">Niciun produs găsit în această categorie.</p>
                    </div>
                )}
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
                                <div className="lg:w-1/2 h-[350px] lg:h-auto bg-black flex items-center justify-center p-10 relative">
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ccff00 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    <img className="max-h-full object-contain drop-shadow-[0_0_50px_rgba(204,255,0,0.3)]" src={selectedProduct.image || QUICK_VIEW_IMAGE} alt={selectedProduct.name} />
                                </div>
                                <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-secondary px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest neon-glow-purple">{selectedProduct.category} Drop</span>
                                        <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">SKU: {selectedProduct.sku}</span>
                                    </div>
                                    <h2 className="text-5xl font-bold mb-4 italic tracking-tighter uppercase">{selectedProduct.name}</h2>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-4xl font-bold text-primary">${selectedProduct.price.toFixed(2)}</span>
                                        {selectedProduct.originalPrice && <span className="text-slate-500 line-through text-lg">${selectedProduct.originalPrice.toFixed(2)}</span>}
                                    </div>
                                    <p className="text-slate-400 mb-8">{selectedProduct.description}</p>
                                    <div className="mb-8">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Specificații</h4>
                                        <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                            {selectedProduct.specs.map(spec => (
                                                <li key={spec} className="flex items-center gap-2 text-slate-200">
                                                    <CheckCircle2 className="text-primary w-4 h-4 shrink-0" /> {spec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleAddToCart(selectedProduct)} className="flex-1 bg-primary text-black font-bold py-5 rounded-full text-lg hover:brightness-110 transition-all neon-glow-primary active:scale-95">
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
