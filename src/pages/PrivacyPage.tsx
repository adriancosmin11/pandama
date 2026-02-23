import { motion } from 'motion/react';
import { Lock, Eye, Database, Shield, Cookie, UserCheck } from 'lucide-react';

const sections = [
    {
        icon: Eye,
        title: '1. CE DATE COLECTĂM',
        content: `Colectăm următoarele categorii de date personale: numele și prenumele, adresa de email, adresa de livrare, numărul de telefon, istoricul comenzilor și datele de navigare pe site (prin cookies). Nu colectăm date financiare — plățile sunt procesate securizat prin furnizori terți.`,
    },
    {
        icon: Database,
        title: '2. CUM FOLOSIM DATELE',
        content: `Datele personale sunt utilizate pentru: procesarea și livrarea comenzilor, comunicări legate de comenzi (confirmare, tracking), îmbunătățirea experienței pe site, trimiterea de oferte și noutăți (doar cu consimțământul dumneavoastră) și respectarea obligațiilor legale.`,
    },
    {
        icon: Shield,
        title: '3. PROTECȚIA DATELOR',
        content: `Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor dumneavoastră, inclusiv criptare SSL, acces restricționat la date și backup-uri securizate. Datele sunt stocate pe servere securizate din Uniunea Europeană.`,
    },
    {
        icon: UserCheck,
        title: '4. DREPTURILE DUMNEAVOASTRĂ',
        content: `Conform GDPR, aveți dreptul de: acces la datele personale, rectificarea datelor incorecte, ștergerea datelor ("dreptul de a fi uitat"), restricționarea prelucrării, portabilitatea datelor și opoziția la prelucrare. Pentru exercitarea acestor drepturi, contactați-ne la privacy@pandama.ro.`,
    },
    {
        icon: Cookie,
        title: '5. POLITICA DE COOKIES',
        content: `Folosim cookies pentru funcționarea corectă a site-ului, analiza traficului și personalizarea conținutului. Cookies esențiale sunt necesare pentru funcționarea site-ului. Cookies analitice și de marketing necesită consimțământul dumneavoastră, pe care îl puteți gestiona din banner-ul de cookies.`,
    },
    {
        icon: Lock,
        title: '6. PARTAJAREA DATELOR',
        content: `Nu vindem și nu închiriem datele dumneavoastră personale. Datele pot fi partajate cu: servicii de curierat (pentru livrare), procesatori de plăți (pentru tranzacții) și autorități publice (când legea o impune). Toți partenerii noștri respectă GDPR.`,
    },
];

export default function PrivacyPage() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-10">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-20 text-center"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <Lock className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">CONFIDENȚIALITATE & GDPR</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
                    PROTEJĂM <span className="text-primary italic">DATELE TALE</span>
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em]">
                    Ultima actualizare: Februarie 2026
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white border border-white/5 rounded-2xl p-10 shadow-xl group hover:border-[#2F5233]/30 transition-all"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-[#F5F5F5] rounded-lg flex items-center justify-center group-hover:bg-[#2F5233] transition-colors">
                                <section.icon className="w-4 h-4 text-black group-hover:text-white transition-colors" />
                            </div>
                            <h2 className="text-lg font-black uppercase tracking-widest italic text-black">{section.title}</h2>
                        </div>
                        <p className="text-black/60 text-sm leading-relaxed font-medium">{section.content}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 p-12 bg-white/5 border border-white/5 rounded-3xl text-center">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6 leading-loose">
                    Dacă aveți întrebări suplimentare despre modul în care gestionăm datele dumneavoastră,<br />vă rugăm să ne contactați la <span className="text-primary">privacy@pandama.ro</span>
                </p>
            </div>
        </section>
    );
}
