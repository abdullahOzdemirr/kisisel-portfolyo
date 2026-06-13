import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';

interface ProjePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjeDetayPage({ params }: ProjePageProps) {
  const { id } = await params;

  try {
    // Proje yolunu oluştur ve dosyayı oku
    const dosyaYolu = path.join(process.cwd(), 'icerikler', `${id}.md`);
    const dosyaIcerigi = fs.readFileSync(dosyaYolu, 'utf-8');

    // Bilgileri ve metni ayır
    const { data, content } = matter(dosyaIcerigi);
    const htmlIcerik = marked(content);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Geri Dön Butonu */}
          <Link href="/" className="text-xs font-mono text-slate-500 hover:text-emerald-400 transition-colors mb-8 inline-block">
            ← Ana Sayfaya Dön
          </Link>

          {/* Başlık Bloğu */}
          <div className="mb-8 border-b border-slate-800 pb-6">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full">
              {data.kategori}
            </span>
            <h1 className="text-4xl font-extrabold mt-4 text-white">{data.baslik}</h1>
            <p className="text-slate-400 mt-2 italic">{data.ozet}</p>
          </div>

          {/* HTML'e Dönüştürülen Markdown İçeriği */}
          <div 
            className="prose prose-invert prose-slate max-w-none 
              prose-headings:text-emerald-400 prose-h1:text-3xl prose-h2:text-2xl 
              prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: htmlIcerik }} 
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dosya okunurken hata oluştu:", error);
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-4">
        <p className="text-red-400 font-mono text-sm bg-red-500/10 border border-red-500/20 px-4 py-2 rounded">
          Proje dosyası bulunamadı!
        </p>
        <Link href="/" className="text-xs text-emerald-400 underline">Ana sayfaya dön</Link>
      </div>
    );
  }
}