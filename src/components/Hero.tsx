import React, { useState } from 'react';
import { ArrowRight, FileText, Mail, Phone, MapPin, Check } from 'lucide-react';
import { contactInfo } from '../data/cvData';
import profileImage from '../assets/images/profile_ajie_rafli_1788602915478.jpeg';

interface Props {
  onExploreProjects: () => void;
  onOpenCv: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<Props> = ({ onExploreProjects, onOpenCv, onContactClick }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Name & Primary Role */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-tight">
                {contactInfo.name}
              </h1>
              <p className="text-base sm:text-lg font-mono text-neutral-600 dark:text-neutral-400">
                Data Scientist & Analytics Engineer
              </p>
            </div>

            {/* Professional Summary */}
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              Data Scientist dan Analytics Engineer yang berfokus pada perancangan arsitektur data prediktif, pemodelan Time Series Forecasting, implementasi Retrieval-Augmented Generation (RAG & Graph RAG), serta Business Intelligence & Data Visualization. Berpengalaman mentransformasikan data kompleks berskala besar menjadi wawasan strategis dan solusi analitik berdaya guna tinggi untuk mendukung pengambilan keputusan bisnis yang presisi.
            </p>

            {/* Metadata Contact Strip */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono pt-1">
              <span className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                {contactInfo.location}
              </span>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                {contactInfo.phone}
              </a>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300 shadow-xs"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> : <Mail className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />}
                <span>{copiedEmail ? 'Email Disalin' : contactInfo.email}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-semibold text-xs transition-colors shadow-xs"
              >
                <span>Lihat Dokumentasi Proyek</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCv}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 font-medium text-xs transition-colors shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lihat CV Lengkap</span>
              </button>

              <button
                onClick={onContactClick}
                className="px-4 py-2.5 rounded bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white border border-neutral-300 dark:border-neutral-800 font-medium text-xs transition-colors"
              >
                Hubungi Langsung
              </button>
            </div>
          </div>

          {/* Right Column: User Portrait Photo */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 space-y-2.5 shadow-sm">
              <div className="relative aspect-square w-full rounded overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <img
                  src={profileImage}
                  alt="Ajie Rafli Pamungkas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1 py-0.5 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                <span>Ajie Rafli Pamungkas</span>
                <span className="text-neutral-500">Informatika / Data Science</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
