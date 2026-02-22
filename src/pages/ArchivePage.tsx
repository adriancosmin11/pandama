import { motion } from 'motion/react';
import { Archive, Layers, Calendar, ArrowRight } from 'lucide-react';
import { ARCHIVE_COLLECTIONS } from '../constants';

export default function ArchivePage() {
    return (
        <section className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                    <Archive className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold tracking-widest uppercase">Moștenirea Brandului</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter uppercase italic mb-6">
                    <span className="text-primary drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]">ARHIVA</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                    Fiecare colecție spune o poveste. Explorează întreaga istorie a PANDAMA — de la Genesis până acum.
                </p>
            </motion.div>

            {/* Timeline Line */}
            <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

                {/* Collections */}
                <div className="space-y-8 lg:space-y-16">
                    {ARCHIVE_COLLECTIONS.map((collection, idx) => {
                        const isEven = idx % 2 === 0;

                        return (
                            <motion.div
                                key={collection.id}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                            >
                                {/* Card */}
                                <div className={`lg:w-[45%] w-full ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                                    <motion.div
                                        whileHover={{ y: -6 }}
                                        className="glass rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all group cursor-pointer"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            {collection.image ? (
                                                <img
                                                    src={collection.image}
                                                    alt={collection.name}
                                                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                                    <Layers className="w-16 h-16 text-white/10" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-card-dark to-transparent" />

                                            {/* Highlight Badge */}
                                            {collection.highlight && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                        {collection.highlight}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono">
                                                    {collection.season} {collection.year}
                                                </span>
                                            </div>
                                            <h3 className="text-3xl font-bold uppercase italic tracking-tighter mb-3">{collection.name}</h3>
                                            <p className="text-sm text-slate-400 mb-5">{collection.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Layers className="w-3 h-3" /> {collection.productCount} produse
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> {collection.year}
                                                    </span>
                                                </div>
                                                <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Explorează <ArrowRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Timeline Center Point */}
                                <div className="hidden lg:flex w-[10%] justify-center">
                                    <div className="relative">
                                        <div className="w-4 h-4 rounded-full bg-primary neon-glow-primary" />
                                        <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
                                    </div>
                                </div>

                                {/* Year Label (other side) */}
                                <div className={`hidden lg:block lg:w-[45%] ${isEven ? 'text-left' : 'text-right'}`}>
                                    <div className="inline-block">
                                        <span className="text-6xl font-bold text-white/5 uppercase italic tracking-tighter">{collection.year}</span>
                                        <div className={`text-xs text-slate-600 uppercase tracking-widest font-bold mt-1 ${isEven ? '' : 'text-right'}`}>
                                            {collection.season}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-20"
            >
                <div className="glass rounded-2xl p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tighter mb-4">
                            POVESTEA <span className="text-primary">CONTINUĂ</span>
                        </h2>
                        <p className="text-slate-400 max-w-lg mx-auto mb-8">
                            Sezonul 05 este în dezvoltare. Fii primul care află când apare următorul capitol.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-10 py-4 bg-primary text-black font-bold rounded-full text-lg hover:scale-105 transition-transform neon-glow-primary">
                                ÎNSCRIE-TE PE LISTĂ
                            </button>
                            <button className="px-10 py-4 glass text-white font-bold rounded-full text-lg border border-white/10 hover:bg-white/10 transition-all">
                                VEZI LOOKBOOK
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
