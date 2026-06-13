import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ProjeVerisi {
  id: string;
  baslik: string;
  ozet: string;
  kategori: string;
  teknolojiler: string[];
  gorsel: string;
}

// icerikler klasöründeki tüm .md dosyalarını okuyan fonksiyon
function getProjeler(): ProjeVerisi[] {
  const iceriklerKlasoru = path.join(process.cwd(), 'icerikler');
  
  if (!fs.existsSync(iceriklerKlasoru)) {
    return [];
  }

  const dosyaAdlari = fs.readdirSync(iceriklerKlasoru);

  return dosyaAdlari
    .filter((dosyaAdi) => dosyaAdi.endsWith('.md'))
    .map((dosyaAdi) => {
      const id = dosyaAdi.replace(/\.md$/, '');
      const tamYol = path.join(iceriklerKlasoru, dosyaAdi);
      const dosyaIcerigi = fs.readFileSync(tamYol, 'utf-8');
      const { data } = matter(dosyaIcerigi);

      return {
        id,
        baslik: data.baslik || 'Başlıksız Proje',
        ozet: data.ozet || '',
        kategori: data.kategori || 'Yazılım',
        teknolojiler: data.teknolojiler || [],
        gorsel: data.gorsel || (data.kategori === 'Donanım' ? '📟' : '💻'),
      };
    });
}

export default function Home() {
  const dinamikProjeler = getProjeler();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-950/70">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono font-bold text-lg tracking-wider text-emerald-400">
            &lt;GelisitiriciPortfolyo /&gt;
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <section className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Yeni projelere açık
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Yazılım ve Donanımın Kesiştiği Yerde.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Merhaba, ben bir mühendislik öğrencisiyim. Gömülü sistemlerden modern full-stack web uygulamalarına kadar projeler geliştiriyorum.
          </p>
        </section>

        <section id="projeler" className="pt-24 space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-slate-100">Öne Çıkan Projelerim</h2>
          </div>

          {dinamikProjeler.length === 0 ? (
            <p className="text-slate-500 text-sm italic">Henüz icerikler klasörüne bir .md dosyası eklenmedi.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {dinamikProjeler.map((proje) => (
                <div key={proje.id} className="group relative rounded-xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{proje.gorsel}</span>
                      <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                        proje.kategori === 'Donanım' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {proje.kategori}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{proje.baslik}</h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-3">{proje.ozet}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {proje.teknolojiler.map((tech) => (
                        <span key={tech} className="text-[11px] font-mono text-slate-500">#{tech}</span>
                      ))}
                    </div>
                    <Link href={`/projeler/${proje.id}`} className="text-xs font-medium text-emerald-400 flex items-center gap-1 hover:underline">
                      Detaylar →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}