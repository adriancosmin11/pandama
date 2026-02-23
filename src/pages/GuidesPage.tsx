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
                        initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-10 md:p-16 rounded-3xl text-black shadow-2xl relative overflow-hidden group cursor-pointer"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <guide.icon className="w-8 h-8 text-[#2F5233]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20">{guide.level}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                                {guide.title}
                            </h2>
                            <div className="flex items-center justify-between border-t border-black/5 pt-10">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#2F5233]">START CURS</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-black/20">{guide.duration} VIDEO CONTENT</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
