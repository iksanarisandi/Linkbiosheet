import React, { useEffect, useState } from 'react';
import { fetchLinks } from './services/linkService';
import { LinkItem } from './types';
import { LinkButton } from './components/LinkButton';
import { ProfileHeader } from './components/ProfileHeader';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLinks();
        setLinks(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data. Mohon periksa koneksi internet atau coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 font-sans antialiased selection:bg-white/10 selection:text-white">
      
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#09090b] to-[#09090b]"></div>
        
        {/* Subtle noise texture (optional for 'premium' feel) */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        
        {/* Top highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-md mx-auto px-6 py-16 flex flex-col min-h-screen">
        
        <ProfileHeader />

        <div className="flex-grow mt-12 flex flex-col items-center w-full">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-xl text-center backdrop-blur-sm animate-fade-in max-w-xs w-full">
              <p className="text-red-400 text-sm mb-3">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-200 text-xs uppercase tracking-wider font-medium rounded-lg transition-colors"
              >
                Muat Ulang
              </button>
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-zinc-600 text-sm font-light">Belum ada link yang tersedia.</p>
            </div>
          ) : (
            <div className="w-full space-y-4 animate-slide-up pb-12">
              {links.map((link, index) => (
                <LinkButton key={link.id} link={link} index={index} />
              ))}
            </div>
          )}
        </div>

        <footer className="py-6 mt-auto text-center border-t border-white/5">
          <p className="text-[10px] text-zinc-600 font-medium tracking-widest uppercase">
            All Rights Reserved
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;