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
                        className="bg-white border border-white/5 rounded-3xl p-10 shadow-xl group hover:border-[#2F5233]/30 transition-all text-black"
                    >
                        <div className="w-14 h-14 bg-[#F5F5F5] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#2F5233] transition-colors">
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
            <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-[1px] w-8 bg-primary" />
                        <h2 className="text-2xl font-black uppercase tracking-widest italic">PROCESARE</h2>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-10 text-white/40 text-sm font-medium leading-loose space-y-6">
                        <p>COMERZILE PLASATE ÎNAINTE DE ORA 14:00 SUNT PROCESATE ÎN ACEEAȘI ZI LUCRĂTOARE. EXPERIENȚA PANDAMA ÎNCEPE CU O LOGISTICĂ EFICIENTĂ.</p>
                        <p>VEI PRIMI UN EMAIL DE CONFIRMARE CU NUMĂRUL DE TRACKING IMEDIAT CE COLETUL A FOST PREDAT CURIERULUI.</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-[1px] w-8 bg-primary" />
                        <h2 className="text-2xl font-black uppercase tracking-widest italic">RETURNĂRI</h2>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-3xl p-10 text-white/40 text-sm font-medium leading-loose space-y-6">
                        <p>ACCEPTIĂM RETURNĂRI ÎN TERMEN DE 14 ZILE DE LA PRIMIREA PRODUSULUI. PRODUSUL TREBUIE SĂ FIE ÎN STAREA ORIGINALĂ, NEFOLOSIT ȘI CU ETICHETELE ATAȘATE.</p>
                        <p>PENTRU A INIȚIA O RETURNARE, CONTACTEAZĂ-NE LA <span className="text-primary">SUPPORT@PANDAMA.RO</span> CU NUMĂRUL COMENZII.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
