import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap, Star, ChevronRight } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../constants';

export default function ProTeamPage() {
    const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

    return (
        <section className="max-w-7xl mx-auto">
            {/* Hero */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-20"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                    <Trophy className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold tracking-widest uppercase">Echipa de Elită</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter uppercase italic mb-6">
                    ECHIPA <span className="text-primary drop-shadow-[0_0_30px_rgba(204,255,0,0.4)]">PRO</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                    Cunoaște atleții care împing limitele posibilului. Sponsorizați de PANDAMA, dominând scena mondială.
                </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            >
                {[
                    { label: 'Membri Echipă', value: '4', icon: Star },
                    { label: 'Titluri Mondiale', value: '12', icon: Trophy },
                    { label: 'Total Victorii', value: '802', icon: Zap },
                    { label: 'Țări', value: '8', icon: ChevronRight },
                ].map((stat, idx) => (
                    <div key={stat.label} className="glass rounded-xl p-6 border border-white/10 text-center">
                        <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                    </div>
                ))}
            </motion.div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TEAM_MEMBERS.map((member, idx) => (
                    <motion.div
                        key={member.id}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 + idx * 0.1 }}
                        whileHover={{ y: -6 }}
                        onClick={() => setActiveMember(activeMember?.id === member.id ? null : member)}
                        className={`glass rounded-xl overflow-hidden cursor-pointer border transition-all group ${activeMember?.id === member.id ? 'border-primary' : 'border-white/10 hover:border-primary/50'
                            }`}
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Image */}
                            <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.alias}
                                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card-dark/80 hidden sm:block" />
                                <div className="absolute inset-0 bg-gradient-to-t from-card-dark/80 to-transparent sm:hidden" />
                            </div>

                            {/* Info */}
                            <div className="sm:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">{member.role}</span>
                                <h3 className="text-3xl font-bold uppercase italic tracking-tighter mb-1">{member.alias}</h3>
                                <p className="text-sm text-slate-500 mb-5">{member.name}</p>

                                {/* Stats */}
                                <div className="flex gap-6 mb-5">
                                    {member.stats.map(stat => (
                                        <div key={stat.label}>
                                            <div className="text-xl font-bold text-white">{stat.value}</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Achievements (expanded) */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: activeMember?.id === member.id ? 'auto' : 0,
                                        opacity: activeMember?.id === member.id ? 1 : 0,
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 border-t border-white/10">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Realizări</h4>
                                        <ul className="space-y-2">
                                            {member.achievements.map(ach => (
                                                <li key={ach} className="flex items-center gap-2 text-sm text-slate-300">
                                                    <Star className="w-3 h-3 text-primary shrink-0" />
                                                    {ach}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Join CTA */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-20 text-center"
            >
                <div className="glass rounded-2xl p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter mb-4">
                            CREZI CĂ AI CE <span className="text-primary">TREBUIE?</span>
                        </h2>
                        <p className="text-slate-400 max-w-lg mx-auto mb-8">
                            Căutăm mereu noua generație de performeri de elită. Trimite-ne filmul tău de prezentare și alătură-te echipei.
                        </p>
                        <button className="px-10 py-4 bg-primary text-black font-bold rounded-full text-lg hover:scale-105 transition-transform neon-glow-primary">
                            APLICĂ ACUM
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
