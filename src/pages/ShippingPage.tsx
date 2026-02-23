import { motion } from 'motion/react';
import { Truck, Clock, MapPin, Package, Shield, Globe } from 'lucide-react';

export default function ShippingPage() {
    const shippingMethods = [
        {
            icon: Truck,
            name: 'LIVRARE STANDARD',
            time: '3-5 ZILE LUCRĂTOARE',
            price: 'GRATUITĂ PESTE 200 RON',
            details: 'EXPEDIERE PRIN CURIER RAPID ÎN TOATĂ ROMÂNIA.',
        },
        {
            icon: Clock,
            name: 'LIVRARE EXPRESS',
            time: '1-2 ZILE LUCRĂTOARE',
            price: '29.99 RON',
            details: 'PRIORITATE MAXIMĂ. IDEALĂ PENTRU COMENZI URGENTE.',
        },
        {
            icon: MapPin,
            name: 'RIDICARE DIN PUNCT',
            time: 'DISPONIBIL ÎN 24H',
            price: 'GRATUITĂ',
            details: 'RIDICĂ COMANDA DIN PUNCTUL DE LIVRARE CEL MAI APROAPIAT.',
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-20 text-center"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <Globe className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">LIVRARE & LOGISTICĂ</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic text-gradient-gold">
                    EXPEDIERE <span className="text-white italic">PREMIUM</span>
                </h1>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                    NE ASIGURĂM CĂ ECHIPAMENTUL TĂU AJUNGE ÎN SIGURANȚĂ ȘI CÂT MAI RAPID POSIBIL.
                </p>
            </motion.div>

            {/* Shipping Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {shippingMethods.map((method, idx) => (
                    <motion.div
                        key={method.name}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl group hover:border-[#2F5233]/30 transition-all text-black"
                    >
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
                            <method.icon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{method.name}</h3>
                        <div className="text-[#2F5233] font-black text-xs uppercase tracking-widest mb-6">{method.price}</div>
                        <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest mb-4 leading-relaxed">{method.details}</p>
                        <div className="text-black/20 text-[9px] font-black uppercase tracking-[0.2em] border-t border-black/5 pt-4">{method.time}</div>
                    </motion.div>
                ))}
            </div>

            {/* Info Sections */}
            <div className="grid md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-6 mb-2">
                        <div className="h-[2px] w-12 bg-primary rounded-full shadow-[0_0_15px_rgba(76,175,80,0.5)]" />
                        <h2 className="text-3xl font-black uppercase tracking-tighter italic">PROCESARE</h2>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-white/40 text-xs font-black uppercase tracking-[0.3em] leading-loose space-y-8 backdrop-blur-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                        <p>COMENZILE PLASATE ÎNAINTE DE ORA 14:00 SUNT PROCESATE ÎN ACEEAȘI ZI LUCRĂTOARE. EXPERIENȚA PANDAMA ÎNCEPE CU O LOGISTICĂ EFICIENTĂ.</p>
                        <p className="text-white/20">VEI PRIMI UN EMAIL DE CONFIRMARE CU NUMĂRUL DE TRACKING IMEDIAT CE COLETUL A FOST PREDAT CURIERULUI.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-6 mb-2">
                        <div className="h-[2px] w-12 bg-primary rounded-full shadow-[0_0_15px_rgba(76,175,80,0.5)]" />
                        <h2 className="text-3xl font-black uppercase tracking-tighter italic">RETURNĂRI</h2>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-white/40 text-xs font-black uppercase tracking-[0.3em] leading-loose space-y-8 backdrop-blur-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                        <p>ACCEPTIĂM RETURNĂRI ÎN TERMEN DE 14 ZILE DE LA PRIMIREA PRODUSULUI. PRODUSUL TREBUIE SĂ FIE ÎN STAREA ORIGINALĂ, NEFOLOSIT ȘI CU ETICHETELE ATAȘATE.</p>
                        <p className="text-white/20">PENTRU A INIȚIA O RETURNARE, CONTACTEAZĂ-NE LA <span className="text-primary italic">SUPPORT@PANDAMA.RO</span> CU NUMĂRUL COMENZII.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
