import React from 'react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  link: LinkItem;
  index: number;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ link, index }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Background with subtle glass effect */}
      <div className="
        relative z-10
        flex items-center justify-between
        w-full px-6 py-4
        bg-zinc-800/40 hover:bg-zinc-700/60
        border border-white/5 hover:border-white/20
        backdrop-blur-md
        rounded-xl
        transition-all duration-300 ease-out
        shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)]
        hover:shadow-[0_8px_25px_-10px_rgba(255,255,255,0.1)]
        transform hover:-translate-y-0.5
      ">
        {/* Icon Placeholder (Optional, purely decorative dot) */}
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-white/80 transition-colors duration-300" />

        {/* Label */}
        <span className="flex-1 text-center text-sm font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">
          {link.label}
        </span>

        {/* Subtle Arrow */}
        <div className="text-zinc-600 group-hover:text-white transition-transform duration-300 transform group-hover:translate-x-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
};