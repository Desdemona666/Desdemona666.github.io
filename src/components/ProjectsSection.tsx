import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProjectCaseStudy } from '../types';
import { projectsData } from '../data/projectsData';

interface Props {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<Props> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'GenAI & NLP',
    'Time Series & Forecasting',
    'Predictive Modeling',
    'Operations & Analytics',
    'Data Engineering & Streaming'
  ];

  const filteredProjects = selectedCategory === 'Semua'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
              Portofolio & Dokumentasi Teknis
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Proyek Data Science & Analytics Terpilih
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              Setiap proyek di bawah ini menyediakan dokumentasi komprehensif yang mencakup latar belakang strategis bisnis, pemodelan matematis & algoritmik, arsitektur pipeline data, rekayasa fitur, implementasi teknis sistem, serta evaluasi dampak dan nilai bisnis.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-1.5 rounded self-start lg:self-auto shadow-2xs">
            {projectsData.length} Proyek Dokumentasi
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors font-medium cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-lg p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                    <span>{project.readTime}</span>
                    {project.featured && (
                      <span className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 text-[10px] font-mono">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-950 dark:text-white group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono line-clamp-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3 font-normal">
                  {project.shortDescription}
                </p>

                {/* Key Metrics Strip inside Card */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div key={mIdx} className="bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded border border-neutral-200 dark:border-neutral-800/90">
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block truncate">{m.label}</span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-sm font-mono font-bold text-neutral-950 dark:text-white">{m.value}</span>
                        {m.change && (
                          <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 font-medium">{m.change}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-950 text-neutral-500 text-[11px] font-mono">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button Link */}
              <div className="pt-4 mt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                  Dokumentasi Teknis & Pembahasan
                </span>
                <div className="flex items-center gap-1 text-neutral-900 dark:text-white font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>Buka Dokumentasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
