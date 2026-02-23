import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: Mail, label: 'EMAIL', value: 'contact@pandama.ro', href: 'mailto:contact@pandama.ro' },
        { icon: Phone, label: 'TELEFON', value: '+40 742 000 000', href: 'tel:+40742000000' },
        { icon: MapPin, label: 'SEDIU', value: 'București, România', href: '#' },
        { icon: Clock, label: 'PROGRAM', value: 'Lun-Vin: 09:00-18:00', href: '#' },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-20 text-center"
            >
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic text-gradient-gold">
                    CONTACTEAZĂ-NE
                </h1>
                <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium uppercase tracking-widest text-xs">
                    Ai o întrebare sau vrei să colaborezi? Suntem aici să te ajutăm în cel mai scurt timp.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-16 items-start">
                {/* Contact Info */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-8"
                >
                    {contactInfo.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="bg-white/5 border border-white/10 p-10 rounded-3xl flex items-center gap-8 group hover:translate-x-3 transition-all duration-500 shadow-2xl backdrop-blur-md"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <item.icon className="w-8 h-8 text-white group-hover:text-white transition-colors stroke-[1.2]" />
                            </div>
                            <div>
                                <div className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-black mb-1.5">{item.label}</div>
                                <div className="font-extrabold text-white text-lg uppercase tracking-tight">{item.value}</div>
                            </div>
                        </a>
                    ))}
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-3"
                >
                    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] space-y-10 text-white backdrop-blur-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 opacity-50" />

                        <div className="flex items-center gap-6 mb-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter italic">TRIMITE UN MESAJ</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black ml-1">NUME COMPLET</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-bold uppercase tracking-widest placeholder:text-white/10 outline-none"
                                    placeholder="INTRODU NUMELE TĂU"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black ml-1">ADRESĂ EMAIL</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-bold uppercase tracking-widest placeholder:text-white/10 outline-none"
                                    placeholder="EMAIL@EXEMPLU.COM"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black ml-1">SUBIECT</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-bold uppercase tracking-widest placeholder:text-white/10 outline-none"
                                placeholder="CUM TE PUTEM AJUTA?"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black ml-1">MESAJUL TĂU</label>
                            <textarea
                                required
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-bold uppercase tracking-widest placeholder:text-white/10 outline-none resize-none"
                                placeholder="SCRIE MESAJUL TĂU AICI..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary py-7 rounded-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-all hover:shadow-[0_20px_40px_rgba(76,175,80,0.3)]"
                        >
                            {submitted ? (
                                <span className="uppercase tracking-[0.3em] font-black">✓ MESAJ TRIMIS CU SUCCES</span>
                            ) : (
                                <>
                                    <Send className="w-6 h-6 stroke-[2]" /> <span className="uppercase tracking-[0.3em] font-black">TRIMITE MESAJUL</span>
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
