import React from 'react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fade-in pt-4">
      {/* Abstract Avatar / Placeholder */}
      <div className="relative group">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-lg transform group-hover:scale-110 transition-transform duration-500"></div>
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl">
           <svg className="w-10 h-10 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
           </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tight">
          My Links
        </h1>
        <p className="text-zinc-500 text-sm max-w-[280px] mx-auto leading-relaxed">
          Selamat datang. Temukan tautan dan portofolio resmi saya di bawah ini.
        </p>
      </div>
    </div>
  );
};