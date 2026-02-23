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
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-2xl p-10 text-black shadow-2xl group hover:-translate-y-2 transition-transform cursor-pointer"
                    >
                        <div className="w-full aspect-square bg-[#F5F5F5] rounded-xl mb-8 flex items-center justify-center relative overflow-hidden">
                            <ShoppingBag className="w-12 h-12 text-black/5" />
                        </div>
                        <span className="text-[9px] font-black tracking-widest text-black/20 uppercase mb-2 block">{item.type}</span>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{item.name}</h3>
                        <div className="flex items-center justify-between border-t border-black/5 pt-6">
                            <span className="text-xl font-black italic">{item.price}</span>
                            <ChevronRight className="w-5 h-5 text-black/20 group-hover:text-primary transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
