import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export default function AccessoriesPage() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <ShoppingBag className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">ACCESORII PREMIUM</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
                    LEVEL <span className="text-primary italic">UP</span>
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                    TOT CE AI NEVOIE PENTRU COMPLETAREA EXPERIENȚEI TALE PANDAMA. STRING-URI, RULMENȚI ȘI MULTE ALTELE.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                    { name: 'STRING PACK V2', price: '45.00 RON', type: 'COLECȚIA PRO' },
                    { name: 'METAL BEARINGS', price: '12.00 RON', type: 'INDUSTRIAL' },
                    { name: 'GRIP TAPE PRO', price: '25.00 RON', type: 'COLECȚIA PRO' },
                ].map((item, idx) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-10 text-white shadow-2xl group hover:-translate-y-2 transition-all duration-500 backdrop-blur-md relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-full aspect-square bg-white/[0.03] rounded-2xl mb-10 flex items-center justify-center relative overflow-hidden">
                            <ShoppingBag className="w-16 h-16 text-white/5 group-hover:text-primary/20 group-hover:scale-110 transition-all duration-500" />
                            <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-50 transition-opacity" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-3 block">{item.type}</span>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-primary transition-colors">{item.name}</h3>
                        <div className="flex items-center justify-between border-t border-white/5 pt-8">
                            <span className="text-2xl font-black italic tracking-tighter text-white/90">{item.price}</span>
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
