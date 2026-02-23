import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, BarChart3, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('pandama-cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('pandama-cookie-consent', 'all');
        setVisible(false);
    };

    const acceptEssential = () => {
        localStorage.setItem('pandama-cookie-consent', 'essential');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-[200] p-6 lg:p-10"
                >
                    <div className="max-w-6xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] text-white relative overflow-hidden">
                        {/* Background glow detail */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                            <div className="flex-1 max-w-2xl">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                                        <Cookie className="w-8 h-8 text-primary stroke-[1.5]" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-2">COOKIE-URI PREMIUM</h3>
                                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">CONTROL TOTAL ASUPRA DATELOR TALE</p>
                                    </div>
                                </div>

                                <p className="text-white/40 text-sm font-medium leading-relaxed mb-10 max-w-xl">
                                    FOLOSIM TEHNOLOGII DE TIP COOKIE PENTRU A PERSONALIZA CONȚINUTUL ȘI ANUNȚURILE, PENTRU A OFERI FUNCȚII DE REȚELE SOCIALE ȘI PENTRU A ANALIZA TRAFICUL.
                                    EXPERIENȚA TA PANDAMA ESTE PRIORITATEA NOASTRĂ. AFLĂ MAI MULTE ÎN{' '}
                                    <Link to="/privacy" className="text-primary font-black uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all">
                                        POLITICA NOASTRĂ <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>.
                                </p>

                                <div className="flex flex-wrap gap-8">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(76,175,80,0.5)]" />
                                        <span>ESENȚIALE</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                                        <span>ANALITICE</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch gap-6 shrink-0 lg:w-[450px]">
                                <button
                                    onClick={acceptAll}
                                    className="btn-primary flex-1 py-6 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(76,175,80,0.2)]"
                                >
                                    ACCEPT TOATE
                                </button>
                                <button
                                    onClick={acceptEssential}
                                    className="bg-white/5 border border-white/10 text-white/60 py-6 px-10 rounded-xl text-xs font-black hover:bg-white/10 hover:text-white transition-all uppercase tracking-[0.2em]"
                                >
                                    DOAR ESENȚIALE
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={acceptEssential}
                            className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white/20 hover:text-white border border-transparent hover:border-white/10"
                        >
                            <X className="w-6 h-6 stroke-[1.5]" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
