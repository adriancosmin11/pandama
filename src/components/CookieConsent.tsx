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
                    className="fixed bottom-0 left-0 right-0 z-[200] p-6 lg:p-10"
                >
                    <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-black/5 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-black relative overflow-hidden">
                        {/* Subtle background detail */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5F5F5] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                            <div className="flex-1 max-w-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#2F5233] rounded-2xl flex items-center justify-center">
                                        <Cookie className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">COOKIE-URI PREMIUM</h3>
                                        <p className="text-[10px] text-black/20 font-black uppercase tracking-[0.2em]">CONTROL PRIVACY PANDAMA</p>
                                    </div>
                                </div>

                                <p className="text-black/60 text-sm font-medium leading-relaxed mb-8">
                                    FOLOSIM TEHNOLOGII DE TIP COOKIE PENTRU A PERSONALIZA CONȚINUTUL ȘI ANUNȚURILE, PENTRU A OFERI FUNCȚII DE REȚELE SOCIALE ȘI PENTRU A ANALIZA TRAFICUL.
                                    EXPERIENȚA TA PANDAMA ESTE PRIORITATEA NOASTRĂ. AFLĂ MAI MULTE ÎN{' '}
                                    <Link to="/privacy" className="text-[#2F5233] font-black uppercase tracking-widest inline-flex items-center gap-1 hover:gap-2 transition-all">
                                        POLITICA NOASTRĂ <ExternalLink className="w-3 h-3" />
                                    </Link>.
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30">
                                        <Shield className="w-3.5 h-3.5 text-[#2F5233]" />
                                        <span>ESENȚIALE</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/30">
                                        <BarChart3 className="w-3.5 h-3.5 text-black/20" />
                                        <span>ANALITICE</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch gap-4 shrink-0 lg:w-96">
                                <button
                                    onClick={acceptAll}
                                    className="btn-primary py-5 rounded-md text-xs font-black shadow-[0_0_30px_rgba(76,175,80,0.1)]"
                                >
                                    ACCEPT TOATE
                                </button>
                                <button
                                    onClick={acceptEssential}
                                    className="bg-[#F5F5F5] text-black/40 py-5 px-8 rounded-md text-xs font-black hover:bg-black hover:text-white transition-all uppercase tracking-widest"
                                >
                                    DOAR ESENȚIALE
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={acceptEssential}
                            className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors text-black/20 hover:text-black"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
