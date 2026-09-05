import React, { useState } from 'react';
import { workExperiences, educations } from '../data/cvData';

export const ExperienceEducation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');

  return (
    <section id="experience" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
              Rekam Jejak & Kualifikasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Pengalaman Kerja & Pendidikan
            </h2>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1 bg-white dark:bg-neutral-900 p-1 rounded border border-neutral-300 dark:border-neutral-800 text-xs self-start sm:self-auto shadow-2xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded transition-colors font-medium cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-1.5 rounded transition-colors font-medium cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              Pengalaman Kerja
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3 py-1.5 rounded transition-colors font-medium cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              Pendidikan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Work Experience Column */}
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className={`${activeTab === 'all' ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                Pengalaman Kerja (Professional Experience)
              </span>

              <div className="relative pl-6 border-l border-neutral-300 dark:border-neutral-800 space-y-6">
                {workExperiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] top-2 w-2.5 h-2.5 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-neutral-400" />

                    <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 space-y-3 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-300">
                            {exp.company}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                          <span>{exp.period}</span>
                          <span className="mx-1.5 text-neutral-400 dark:text-neutral-600">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Bullet points from CV */}
                      <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills Tags */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {exp.skillsUsed.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-[11px] font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Column */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <div id="education" className={`${activeTab === 'all' ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                Pendidikan & Sertifikasi Khusus
              </span>

              <div className="relative pl-6 border-l border-neutral-300 dark:border-neutral-800 space-y-6">
                {educations.map((edu) => (
                  <div key={edu.id} className="relative">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] top-2 w-2.5 h-2.5 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-neutral-400" />

                    <div className="bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 space-y-3 shadow-xs">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                            {edu.institution}
                          </h3>
                          {edu.gpa && (
                            <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium">
                              IPK: {edu.gpa}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                          {edu.degree}
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                          {edu.period}
                        </div>
                      </div>

                      {edu.description && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {edu.description}
                        </p>
                      )}

                      {edu.focus && (
                        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/80">
                          <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                            Fokus Keahlian:
                          </span>
                          <span className="text-xs text-neutral-700 dark:text-neutral-300 font-mono block">
                            {edu.focus}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
