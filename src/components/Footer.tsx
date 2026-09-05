import React from 'react';
import { ArrowUp } from 'lucide-react';
import { contactInfo } from '../data/cvData';

interface Props {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<Props> = ({ onScrollToTop, onNavigate }) => {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 py-12 text-neutral-600 dark:text-neutral-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-900">
          <div>
            <span className="font-semibold text-neutral-950 dark:text-white text-sm block">
              {contactInfo.name}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Data Scientist & Analytics Engineer • {contactInfo.location}
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-neutral-600 dark:text-neutral-400 text-xs">
            <button onClick={() => onNavigate('about')} className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
              Tentang
            </button>
            <button onClick={() => onNavigate('experience')} className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
              Pengalaman
            </button>
            <button onClick={() => onNavigate('skills')} className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
              Keahlian
            </button>
            <button onClick={() => onNavigate('projects')} className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
              Proyek
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">
              Kontak
            </button>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white border border-neutral-300 dark:border-neutral-800 transition-colors text-xs cursor-pointer shadow-2xs"
          >
            <span>Ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} {contactInfo.name}. Portofolio & Dokumentasi Proyek Data Science.</p>
          <p>
            Bekasi, Jawa Barat, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
