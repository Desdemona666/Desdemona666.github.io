import React, { useState } from 'react';
import { Menu, X, FileText, Sun, Moon } from 'lucide-react';
import { contactInfo } from '../data/cvData';

interface Props {
  onOpenCv: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isInsideBlog: boolean;
  onBackToHome: () => void;
  onLogoClick?: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<Props> = ({
  onOpenCv,
  activeSection,
  onNavigate,
  isInsideBlog,
  onBackToHome,
  onLogoClick,
  isDarkMode,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'Tentang' },
    { id: 'experience', label: 'Pengalaman' },
    { id: 'education', label: 'Pendidikan' },
    { id: 'skills', label: 'Keahlian' },
    { id: 'projects', label: 'Proyek & Dokumentasi' },
    { id: 'contact', label: 'Kontak' },
  ];

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (onLogoClick) {
      onLogoClick();
    } else {
      if (isInsideBlog) {
        onBackToHome();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemClick = (id: string) => {
    if (isInsideBlog) {
      onBackToHome();
      setTimeout(() => {
        onNavigate(id);
      }, 100);
    } else {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Identity */}
          <button
            onClick={handleLogoClick}
            className="text-left group flex items-center gap-3 cursor-pointer"
            title="Kembali ke Beranda / Paling Atas"
          >
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 shadow-2xs">
              AR
            </div>
            <div>
              <span className="font-semibold text-sm tracking-tight text-neutral-950 dark:text-white block">
                {contactInfo.name}
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block -mt-0.5 font-mono">
                Data Scientist & Analytics Engineer
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  !isInsideBlog && activeSection === item.id
                    ? 'text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 font-semibold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action: Theme Toggle & CV Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 transition-colors cursor-pointer"
              title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>

            <button
              onClick={onOpenCv}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lihat CV / Resume</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
            </button>
            <button
              onClick={onOpenCv}
              className="px-2.5 py-1 rounded bg-neutral-900 text-white dark:bg-neutral-900 dark:border dark:border-neutral-700 text-xs font-medium"
            >
              CV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-300 dark:border-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                !isInsideBlog && activeSection === item.id
                  ? 'text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-900 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900/60'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenCv();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Buka Dokumen CV Lengkap</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
