import React from 'react';
import { contactInfo, spokenLanguages } from '../data/cvData';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: "Predictive Modeling & Machine Learning",
      description: "Mengembangkan model prediktif machine learning (LightGBM, XGBoost, Scikit-learn, Statsmodel) dengan feature engineering sistematis, validasi silang adaptif, serta interpretasi model berbasis Machine Learning Explainability."
    },
    {
      title: "RAG & Graph RAG",
      description: "Mengembangkan arsitektur Retrieval-Augmented Generation berbasis semantic search dan integrasi basis data graf untuk penalaran kontekstual yang presisi dan minim halusinasi."
    },
    {
      title: "Time Series Forecasting",
      description: "Meramalkan volatilitas dan tren data runtun waktu melalui dekomposisi komponen tren musiman, regresi residual, serta analisis tren historis untuk proyeksi bisnis yang akurat."
    },
    {
      title: "Business Intelligence & Data Visualization",
      description: "Membangun dashboard analitik interaktif dan visualisasi data multi-dimensi (Power BI, Tableau, Plotly) untuk menerjemahkan metrik kompleks menjadi wawasan strategis yang komunikatif bagi pemangku kepentingan."
    }
  ];

  return (
    <section id="about" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 space-y-2">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Profil & Landasan Kerja
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
            Tentang Saya & Fokus Keahlian
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Summary Box */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 sm:p-8 space-y-4 shadow-xs">
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-200 leading-relaxed font-normal">
                {contactInfo.summary}
              </p>
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                  <span>Data-Driven Problem Solving</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                  <span>Komunikasi Insight ke Bisnis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                  <span>Integrasi Pipeline & Cloud GCP</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                  <span>Standar & Best-Practices MLOps</span>
                </div>
              </div>
            </div>

            {/* Language Status from CV */}
            <div className="bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-xs">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-4">
                Kemampuan Bahasa (Languages)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {spokenLanguages.map((lang) => (
                  <div
                    key={lang.language}
                    className="bg-white dark:bg-neutral-950 px-4 py-3.5 rounded border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-2xs"
                  >
                    <span className="font-medium text-neutral-900 dark:text-white text-xs sm:text-sm">{lang.language}</span>
                    <span className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-200 font-medium">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Pillars (Right column) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 space-y-1.5 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-400" />
                  <h3 className="text-sm font-semibold text-neutral-950 dark:text-white">{pillar.title}</h3>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed pl-3.5">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
