import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Bolt } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
    const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[440px] z-[90] flex flex-col"
                    >
                        <div className="h-full bg-[#0e0e0e] border-l border-white/10 flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-bold uppercase tracking-tight">Coșul Tău</h2>
                                    {totalItems > 0 && (
                                        <span className="bg-primary text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={closeCart}
                                    className="p-2 hover:bg-white/10 rounded-full transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <ShoppingBag className="w-16 h-16 text-white/10 mb-4" />
                                        <p className="text-slate-500 text-lg font-medium mb-2">Coșul tău este gol</p>
                                        <p className="text-slate-600 text-sm">Adaugă câteva produse pentru a începe</p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/10"
                                        >
                                            {/* Product Image */}
                                            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-black/50">
                                                {item.product.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover opacity-60"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Bolt className="w-8 h-8 text-secondary/50" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold uppercase tracking-tight italic truncate">{item.product.name}</h4>
                                                <p className="text-xs text-slate-500 mb-2">{item.product.category}</p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm font-bold w-6 text-center font-mono">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <span className="text-sm font-bold text-primary">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="self-start p-1 text-slate-500 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-white/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-sm uppercase tracking-widest font-bold">Total</span>
                                        <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button className="w-full bg-primary text-black font-bold py-4 rounded-full text-lg hover:brightness-110 transition-all neon-glow-primary active:scale-[0.98]">
                                        FINALIZEAZĂ COMANDA — ${totalPrice.toFixed(0)}
                                    </button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-red-400 transition-colors py-2"
                                    >
                                        Golește Coșul
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
