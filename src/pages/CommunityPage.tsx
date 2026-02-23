import { motion } from 'motion/react';
import { Instagram, Users, MessageCircle } from 'lucide-react';

export default function CommunityPage() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-24"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <Users className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">ALĂTURĂ-TE NOUĂ</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
                    PANDAMA <span className="text-primary italic">COMMUNITY</span>
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                    NU E DOAR UN SPORT, E O FAMILIE. SCHIMBĂ EXPERIENȚE, ÎNVAȚĂ TRICK-URI NOI ȘI FII PARTE DIN MIȘCARE.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                <motion.a
                    href="#"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] p-16 rounded-3xl text-white shadow-2xl flex flex-col items-center text-center group transition-transform hover:scale-[1.02]"
                >
                    <Instagram className="w-16 h-16 mb-8 group-hover:rotate-12 transition-transform" />
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">INSTAGRAM</h3>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest">URMĂREȘTE NOUTĂȚILE ȘI GIVEAWAY-URILE</p>
                </motion.a>

                <motion.a
                    href="#"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-16 rounded-3xl text-black shadow-2xl flex flex-col items-center text-center group transition-transform hover:scale-[1.02]"
                >
                    <MessageCircle className="w-16 h-16 mb-8 text-[#2F5233] group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">DISCORD SERVER</h3>
                    <p className="text-black/40 text-xs font-bold uppercase tracking-widest">DISCUTĂ CU JUCĂTORI PRO ȘI AFLĂ TIPS & TRICKS</p>
                </motion.a>
            </div>
        </section>
    );
}
