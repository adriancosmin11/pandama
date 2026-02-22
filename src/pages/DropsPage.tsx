import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Flame, ArrowRight, Package, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DROPS } from '../constants';

function useCountdown(targetDate: string) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const target = new Date(targetDate).getTime();
        const tick = () => {
            const now = Date.now();
            const diff = Math.max(0, target - now);
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
}

export default function DropsPage() {
    const nextDrop = DROPS.find(d => d.status === 'UPCOMING');
    const liveDrop = DROPS.find(d => d.status === 'LIVE');
    const pastDrops = DROPS.filter(d => d.status === 'SOLD OUT');
    const countdown = useCountdown(nextDrop?.date || '2026-04-15');

    const statusColors: Record<string, string> = {
        'SOLD OUT': 'bg-red-500/20 text-red-400 border-red-500/30',
        'LIVE': 'bg-primary/20 text-primary border-primary/30',
        'UPCOMING': 'bg-secondary/20 text-secondary border-secondary/30',
    };

    return (
        <section className="max-w-7xl mx-auto">
            {/* Hero — Next Drop Countdown */}
            {nextDrop && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-20"
                >
                    <div className="glass rounded-2xl p-10 md:p-16 border border-white/10 relative overflow-hidden">
                        {/* Background Image */}
                        {nextDrop.image && (
                            <div className="absolute inset-0 opacity-10">
                                <img src={nextDrop.image} alt="" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 mb-6">
                                <Clock className="w-3 h-3 text-secondary" />
                                <span className="text-xs font-bold tracking-widest uppercase text-secondary">Următoarea Lansare</span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase italic mb-2">
                                {nextDrop.name}
                            </h1>
                            <p className="text-slate-400 text-lg mb-2">{nextDrop.season} · {nextDrop.itemCount} Articole</p>
                            <p className="text-slate-500 max-w-lg mb-10">{nextDrop.description}</p>

                            {/* Countdown */}
                            <div className="grid grid-cols-4 gap-3 max-w-md mb-8">
                                {[
                                    { label: 'Zile', value: countdown.days },
                                    { label: 'Ore', value: countdown.hours },
                                    { label: 'Min', value: countdown.minutes },
                                    { label: 'Sec', value: countdown.seconds },
                                ].map(unit => (
                                    <div key={unit.label} className="glass rounded-xl p-4 text-center border border-white/10">
                                        <div className="text-3xl md:text-4xl font-bold text-primary font-mono">
                                            {String(unit.value).padStart(2, '0')}
                                        </div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">{unit.label}</div>
                                    </div>
                                ))}
                            </div>

                            <button className="px-8 py-4 bg-secondary text-white font-bold rounded-full text-lg hover:scale-105 transition-transform neon-glow-purple">
                                ANUNȚĂ-MĂ
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Live Drop */}
            {liveDrop && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Flame className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-bold uppercase tracking-tight">Activă Acum</h2>
                    </div>

                    <div className="glass rounded-xl overflow-hidden border border-primary/30 group hover:border-primary transition-colors">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden">
                                {liveDrop.image && (
                                    <img src={liveDrop.image} alt={liveDrop.name} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card-dark/80 hidden md:block" />
                            </div>
                            <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors['LIVE']}`}>
                                        <span className="inline-flex w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
                                        ACTIVĂ ACUM
                                    </span>
                                    <span className="text-slate-500 text-xs font-mono uppercase">{liveDrop.season}</span>
                                </div>
                                <h3 className="text-4xl font-bold uppercase italic tracking-tighter mb-2">{liveDrop.name}</h3>
                                <p className="text-slate-400 mb-6 max-w-md">{liveDrop.description}</p>
                                <div className="flex items-center gap-4">
                                    <Link to="/shop" className="px-8 py-3 bg-primary text-black font-bold rounded-full flex items-center gap-2 hover:brightness-110 transition-all">
                                        CUMPĂRĂ ACUM <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                                        <Package className="w-3 h-3 inline mr-1" />{liveDrop.itemCount} Articole
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Past Drops Timeline */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center gap-3 mb-8">
                    <CalendarDays className="w-5 h-5 text-slate-500" />
                    <h2 className="text-2xl font-bold uppercase tracking-tight">Istoric Lansări</h2>
                </div>

                <div className="space-y-4">
                    {pastDrops.map((drop, idx) => (
                        <motion.div
                            key={drop.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="glass rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors group"
                        >
                            <div className="flex flex-col sm:flex-row items-center">
                                {/* Date Column */}
                                <div className="sm:w-32 p-6 text-center sm:border-r border-white/10 shrink-0">
                                    <div className="text-2xl font-bold text-white font-mono">
                                        {new Date(drop.date).toLocaleDateString('en', { month: 'short' }).toUpperCase()}
                                    </div>
                                    <div className="text-xs text-slate-500 uppercase font-mono">
                                        {new Date(drop.date).getFullYear()}
                                    </div>
                                </div>

                                {/* Image */}
                                {drop.image && (
                                    <div className="hidden md:block w-24 h-24 relative overflow-hidden m-4 rounded-lg shrink-0">
                                        <img src={drop.image} alt={drop.name} className="w-full h-full object-cover opacity-40" />
                                    </div>
                                )}

                                {/* Info */}
                                <div className="flex-1 p-6 sm:py-6">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold uppercase italic tracking-tighter">{drop.name}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors[drop.status]}`}>
                                            {drop.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">{drop.description}</p>
                                </div>

                                {/* Meta */}
                                <div className="p-6 text-right shrink-0">
                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{drop.season}</div>
                                    <div className="text-xs text-slate-600 mt-1">{drop.itemCount} articole</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
