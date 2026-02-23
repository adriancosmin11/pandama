import { motion } from 'motion/react';
import { PlayCircle, Award, BookOpen } from 'lucide-react';

export default function GuidesPage() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-24"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <BookOpen className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">ACADEMIA PANDAMA</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
                    FLOW <span className="text-primary italic">SCHOOL</span>
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                    ÎNVAȚĂ DE LA CEI MAI BUNI. DE LA PRIMII PAȘI PÂNĂ LA TRICK-URI DE NIVEL MONDIAL.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[
                    { title: 'PRIMII PAȘI ÎN KENDAMA', duration: '12 MIN', level: 'BEGINNER', icon: PlayCircle },
                    { title: 'MAESTRIA BALANSULUI', duration: '45 MIN', level: 'ADVANCED', icon: Award },
                ].map((guide, idx) => (
                    <motion.div
                        key={guide.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group cursor-pointer backdrop-blur-3xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all">
                                    <guide.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors stroke-[1.2]" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-white/30">{guide.level}</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12 leading-none group-hover:text-primary/90 transition-colors">
                                {guide.title}
                            </h2>
                            <div className="flex items-center justify-between border-t border-white/5 pt-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">START CURS</span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{guide.duration} DE CONȚINUT</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
