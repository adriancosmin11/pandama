import { motion } from 'motion/react';
import { Scale, FileText, ShieldAlert } from 'lucide-react';

const sections = [
    {
        title: '1. CONDIȚII GENERALE',
        content: `Prin accesarea și utilizarea site-ului pandama.ro, acceptați acești Termeni și Condiții în totalitate. Dacă nu sunteți de acord cu oricare dintre aceste condiții, vă rugăm să nu utilizați site-ul nostru. PANDAMA LABS SRL își rezervă dreptul de a modifica acești termeni fără notificare prealabilă.`,
    },
    {
        title: '2. PRODUSE ȘI PREȚURI',
        content: `Toate prețurile afișate pe site sunt exprimate în RON și includ TVA. Ne rezervăm dreptul de a modifica prețurile fără notificare prealabilă. Produsele sunt disponibile în limita stocului. Imaginile produselor sunt cu titlu ilustrativ și pot diferi ușor de produsul real.`,
    },
    {
        title: '3. COMENZI ȘI PLĂȚI',
        content: `Plasarea unei comenzi constituie o ofertă de cumpărare supusă acceptării de către PANDAMA LABS. Acceptăm plăți prin card bancar, transfer bancar și ramburs. O comandă este confirmată doar după primirea emailului de confirmare. Ne rezervăm dreptul de a refuza sau anula orice comandă.`,
    },
    {
        title: '4. LIVRARE',
        content: `Livrarea se efectuează pe teritoriul României prin servicii de curierat. Termenele de livrare sunt estimative și pot varia în funcție de stocul disponibil și zona de livrare. PANDAMA LABS nu este responsabilă pentru întârzierile cauzate de serviciul de curierat.`,
    },
    {
        title: '5. DREPTUL DE RETRAGERE',
        content: `Conform legislației în vigoare, aveți dreptul de a returna produsul în termen de 14 zile calendaristice de la primire, fără a specifica motivul. Produsul trebuie returnat în starea originală, nefolosit, cu ambalajul intact. Costurile de returnare sunt suportate de client.`,
    },
    {
        title: '6. PROPRIETATE INTELECTUALĂ',
        content: `Tot conținutul site-ului (texte, imagini, logo-uri, design) este proprietatea PANDAMA LABS SRL și este protejat de legislația privind drepturile de autor. Reproducerea, distribuirea sau utilizarea conținutului fără acordul scris al PANDAMA LABS este strict interzisă.`,
    },
    {
        title: '7. LIMITAREA RĂSPUNDERII',
        content: `PANDAMA LABS nu este responsabilă pentru eventualele daune directe sau indirecte cauzate de utilizarea sau imposibilitatea utilizării site-ului. Site-ul este furnizat „așa cum este", fără garanții de niciun fel, exprimate sau implicite.`,
    },
    {
        title: '8. LEGEA APLICABILĂ',
        content: `Acești Termeni și Condiții sunt guvernați de legislația română. Orice litigiu va fi soluționat de instanțele competente din România.`,
    },
];

export default function TermsPage() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-10">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-20 text-center"
            >
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10">
                    <ShieldAlert className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">ACORD LEGAL</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 italic">
                    TERMENI ȘI <span className="text-primary italic">CONDIȚII</span>
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.4em]">
                    Ultima actualizare: Februarie 2026
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl group hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-500 backdrop-blur-md relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-6 mb-8 relative z-10">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                {idx % 2 === 0 ? (
                                    <Scale className="w-6 h-6 text-white group-hover:text-white transition-colors stroke-[1.5]" />
                                ) : (
                                    <FileText className="w-6 h-6 text-white group-hover:text-white transition-colors stroke-[1.5]" />
                                )}
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tighter italic text-white/90 group-hover:text-primary transition-colors">{section.title}</h2>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed font-medium uppercase tracking-wide relative z-10">{section.content}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-24 p-16 bg-white/5 border border-white/10 rounded-[2.5rem] text-center backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                    PANDAMA LABS SRL · BUCUREȘTI, ROMÂNIA
                </p>
                <p className="text-white text-xs font-black uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed italic">
                    UTILIZAREA ACESTUI SITE IMPLICĂ ACCEPTAREA NEECHOVOCĂ A TERMENILOR DE MAI SUS.
                </p>
            </div>
        </section>
    );
}
