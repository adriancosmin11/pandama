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

            <div className="grid lg:grid-cols-5 gap-12 items-start">
                {/* Contact Info */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-6"
                >
                    {contactInfo.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="bg-white border border-white/5 p-8 rounded-2xl flex items-center gap-6 group hover:translate-x-2 transition-transform shadow-xl"
                        >
                            <div className="w-14 h-14 bg-[#F5F5F5] rounded-xl flex items-center justify-center group-hover:bg-[#2F5233] transition-colors">
                                <item.icon className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <div className="text-[10px] text-black/20 uppercase tracking-[0.2em] font-black mb-1">{item.label}</div>
                                <div className="font-bold text-black uppercase tracking-tight">{item.value}</div>
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
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl space-y-8 text-black">
                        <div className="flex items-center gap-4 mb-4">
                            <MessageSquare className="w-6 h-6 text-[#2F5233]" />
                            <h2 className="text-2xl font-black uppercase tracking-widest italic">TRIMITE UN MESAJ</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-black ml-1">NUME COMPLET</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#F9F9F9] border border-black/5 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-[#2F5233] transition-all font-bold uppercase tracking-tight"
                                    placeholder="INTRODU NUMELE TĂU"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-black ml-1">ADRESĂ EMAIL</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#F9F9F9] border border-black/5 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-[#2F5233] transition-all font-bold uppercase tracking-tight"
                                    placeholder="EMAIL@EXEMPLU.COM"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-black ml-1">SUBIECT</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full bg-[#F9F9F9] border border-black/5 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-[#2F5233] transition-all font-bold uppercase tracking-tight"
                                placeholder="CUM TE PUTEM AJUTA?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-black ml-1">MESAJUL TĂU</label>
                            <textarea
                                required
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-[#F9F9F9] border border-black/5 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-[#2F5233] transition-all font-bold uppercase tracking-tight resize-none"
                                placeholder="SCRIE MESAJUL TĂU AICI..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary py-6 rounded-xl flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {submitted ? (
                                <span className="uppercase tracking-[0.2em]">✓ MESAJ TRIMIS CU SUCCES</span>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" /> <span className="uppercase tracking-[0.2em] font-black">TRIMITE MESAJUL</span>
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
