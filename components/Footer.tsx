import React from 'react';

interface FooterProps {
  variant?: 'dev' | 'music';
}

const Footer = ({ variant = 'dev' }: FooterProps) => {
  const isMusic = variant === 'music';

  return (
    <footer className={`w-full py-12 border-t mt-12 transition-colors duration-500 ${isMusic ? 'border-purple-500/10' : 'border-zinc-900/50'
      }`}>
      <div className={`max-w-5xl mx-auto px-6 ${isMusic ? 'pl-20' : ''} flex flex-col items-center justify-center gap-4`}>

        <div className="flex flex-wrap justify-center items-center gap-2 text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">
          <span className="text-zinc-500">Made with</span>

          {/* Tech Stack Colors change based on variant */}
          <span className={isMusic ? 'text-purple-600 font-bold' : 'text-zinc-100'}>
            Next.js
          </span>

          <span className="text-zinc-700">•</span>

          <span className={isMusic ? 'text-pink-500 font-bold' : 'text-zinc-100'}>
            React
          </span>

          <span className="text-zinc-700">•</span>

          <span className={isMusic ? 'text-zinc-600' : 'text-zinc-400'}>
            By Pinaki
          </span>
        </div>

        <p className={`text-[9px] font-mono uppercase tracking-widest 'text-zinc-500'
          }`}>
          {isMusic ? 'Sonic Architecture' : '22.58° N, 88.41° E'} • {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;