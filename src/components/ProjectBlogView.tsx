import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Share2, Check, Copy } from 'lucide-react';
import { ProjectCaseStudy } from '../types';
import { MathFormula, RenderTextWithMath } from './MathFormula';

interface Props {
  project: ProjectCaseStudy;
  onBack: () => void;
  onSelectProject: (p: ProjectCaseStudy) => void;
  allProjects: ProjectCaseStudy[];
}

export const ProjectBlogView: React.FC<Props> = ({ project, onBack, onSelectProject, allProjects }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-neutral-900 dark:selection:text-white pb-24 transition-colors">
      {/* Sticky Sub-Header for reading navigation */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 px-3 py-1.5 rounded border border-neutral-300 dark:border-neutral-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portofolio</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            <span className="text-neutral-800 dark:text-neutral-200">{project.category}</span>
            <span className="text-neutral-400 dark:text-neutral-600">/</span>
            <span className="truncate max-w-[320px] text-neutral-600 dark:text-neutral-400">{project.title}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 px-2.5 py-1.5 rounded border border-neutral-300 dark:border-neutral-800 transition-colors cursor-pointer"
            title="Salin tautan dokumentasi"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Tersalin' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* Main Documentation Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Title Header */}
        <header className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span className="px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800">
              {project.category}
            </span>
            <span>{project.date}</span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span>{project.readTime}</span>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <span className="text-neutral-700 dark:text-neutral-300">Dokumentasi Teknis & Arsitektur</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
            {project.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <span className="text-xs text-neutral-500 mr-1 font-mono">Tech Stack:</span>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Highlight Metrics Cards */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded p-4 flex flex-col justify-between shadow-xs"
            >
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                {metric.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950 dark:text-white">
                  {metric.value}
                </span>
                {metric.change && (
                  <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-medium">
                    {metric.change}
                  </span>
                )}
              </div>
              {metric.helper && (
                <span className="text-[11px] text-neutral-500 mt-2 block">
                  {metric.helper}
                </span>
              )}
            </div>
          ))}
        </section>

        {/* Section 1: Executive Summary */}
        <section className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Ringkasan Eksekutif
          </span>
          <div className="bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded p-6 shadow-xs">
            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
              <RenderTextWithMath text={project.executiveSummary} />
            </p>
          </div>
        </section>

        {/* Section 2: Business Problem & Challenges */}
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Permasalahan Bisnis & Tantangan Teknis
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-2 shadow-xs">
              <h3 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Konteks & Bottleneck Bisnis
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                <RenderTextWithMath text={project.businessProblem} />
              </p>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-2 shadow-xs">
              <h3 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Tantangan Kompleksitas Teknis
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                {project.challenges.map((ch, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                    <span className="leading-relaxed">
                      <RenderTextWithMath text={ch} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Mathematical Formulations & Foundations (KaTeX Rendered) */}
        {project.mathFormulas && project.mathFormulas.length > 0 && (
          <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <div className="space-y-1">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
                Pemodelan Matematis & Fondasi Algoritmik
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal">
                Notasi formal matematis dan persamaan teoritis yang menjadi landasan estimasi dan komputasi model.
              </p>
            </div>

            <div className="space-y-4">
              {project.mathFormulas.map((math, mIdx) => (
                <div 
                  key={mIdx}
                  className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-neutral-950 dark:text-white font-mono">
                      {math.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                      LaTeX KaTeX
                    </span>
                  </div>

                  {/* Rendered Equation */}
                  <MathFormula formula={math.latex} block />

                  {/* Explanation */}
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    <RenderTextWithMath text={math.explanation} />
                  </p>

                  {/* Variables table if provided */}
                  {math.variables && math.variables.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-2">
                        Definisi Variabel & Parameter:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {math.variables.map((v, vIdx) => (
                          <div key={vIdx} className="flex items-center gap-2 bg-white dark:bg-neutral-950 px-2.5 py-1.5 rounded border border-neutral-200 dark:border-neutral-800/80 shadow-2xs">
                            <span className="text-neutral-950 dark:text-white font-bold">
                              <MathFormula formula={v.symbol} />
                            </span>
                            <span className="text-neutral-600 dark:text-neutral-400 text-[11px] font-sans">
                              : {v.meaning}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: System Architecture & Pipeline */}
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
              Arsitektur Sistem & Pipeline Data
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal">
              {project.architecture.flowDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {project.architecture.nodes.map((node) => (
              <div
                key={node.step}
                className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-4 space-y-2 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                      Langkah {node.step}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 bg-white dark:bg-neutral-950 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800">
                      {node.tool}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-950 dark:text-white">
                    {node.name}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Dataset & Preprocessing */}
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Karakteristik Data & Pipeline Preprocessing
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-3 shadow-xs">
              <div>
                <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                  Sumber Data & Volume
                </span>
                <p className="text-xs sm:text-sm text-neutral-950 dark:text-white font-medium mt-1">
                  {project.dataset.source}
                </p>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Volume: {project.dataset.volume}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Fitur Kunci / Atribut Data
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.dataset.keyFeatures.map((feat) => (
                    <span
                      key={feat}
                      className="px-2 py-0.5 bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono shadow-2xs"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-3 shadow-xs">
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Tahapan Preprocessing & Rekayasa Fitur
              </span>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
                {project.dataset.preprocessing.map((prep, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                    <span className="leading-relaxed">
                      <RenderTextWithMath text={prep} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Methodology & Modeling Deep-Dive */}
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Metodologi & Modeling Approach
          </span>

          <div className="space-y-3">
            {project.methodology.map((m, mIdx) => (
              <div
                key={mIdx}
                className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-2 shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                    Fase {mIdx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-semibold text-neutral-950 dark:text-white">
                    {m.phase}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pl-1">
                  <RenderTextWithMath text={m.description} />
                </p>
                <div className="pt-1 pl-1">
                  <ul className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {m.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                        <span>
                          <RenderTextWithMath text={d} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Production Code Snippet */}
        <section className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
              Implementasi Kode Teknis & Arsitektur Sistem
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 px-2.5 py-1 rounded border border-neutral-300 dark:border-neutral-800 transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Tersalin' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="bg-neutral-900 dark:bg-neutral-950 text-neutral-100 border border-neutral-800 rounded overflow-hidden font-mono text-xs shadow-sm">
            <div className="bg-neutral-800/90 dark:bg-neutral-900/90 px-4 py-2 border-b border-neutral-700 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-neutral-300 text-xs">{project.codeSnippet.filename}</span>
              <span className="text-[11px] text-neutral-400 uppercase">{project.codeSnippet.language}</span>
            </div>
            <div className="p-4 overflow-x-auto text-neutral-200 leading-relaxed bg-neutral-950">
              <pre><code>{project.codeSnippet.code}</code></pre>
            </div>
            <div className="px-4 py-2 bg-neutral-900/80 border-t border-neutral-800 text-[11px] text-neutral-400 font-sans">
              {project.codeSnippet.description}
            </div>
          </div>
        </section>

        {/* Section 8: Results & Business Impact */}
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Hasil Evaluasi Performa & Dampak Nilai Bisnis
          </span>

          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-6 space-y-5 shadow-xs">
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase text-neutral-600 dark:text-neutral-400 mb-2">
                Pencapaian Utama (Key Deliverables & Performance):
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {project.resultsAndImpact.map((res, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="text-neutral-400 dark:text-neutral-500 font-mono">—</span>
                    <span className="leading-relaxed">
                      <RenderTextWithMath text={res} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded p-4 shadow-2xs">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold block mb-1">
                Kalkulasi Business ROI & Valuasi Dampak:
              </span>
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-relaxed">
                {project.businessROI}
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Lessons Learned & Future Roadmap */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-8">
          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-2 shadow-xs">
            <h4 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Pembelajaran & Catatan Produksi (Lessons Learned)
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              {project.lessonsLearned.map((lesson, lIdx) => (
                <li key={lIdx} className="flex items-start gap-2">
                  <span className="text-neutral-400 dark:text-neutral-600 font-mono">—</span>
                  <span className="leading-relaxed">{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded p-5 space-y-2 shadow-xs">
            <h4 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Rencana Pengembangan (Future Roadmap)
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              {project.futureRoadmap.map((roadmap, rmIdx) => (
                <li key={rmIdx} className="flex items-start gap-2">
                  <span className="text-neutral-400 dark:text-neutral-600 font-mono">—</span>
                  <span className="leading-relaxed">{roadmap}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom Pagination: Next & Previous Project */}
        <nav className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <button
              onClick={() => onSelectProject(prevProject)}
              className="w-full sm:w-auto text-left p-4 rounded bg-white hover:bg-neutral-50 dark:bg-neutral-900/50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center gap-3 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Proyek Sebelumnya</span>
                <span className="text-xs font-semibold text-neutral-950 dark:text-white line-clamp-1">{prevProject.title}</span>
              </div>
            </button>
          ) : <div />}

          {nextProject ? (
            <button
              onClick={() => onSelectProject(nextProject)}
              className="w-full sm:w-auto text-right p-4 rounded bg-white hover:bg-neutral-50 dark:bg-neutral-900/50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-end gap-3 ml-auto cursor-pointer shadow-2xs"
            >
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Proyek Selanjutnya</span>
                <span className="text-xs font-semibold text-neutral-950 dark:text-white line-clamp-1">{nextProject.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </button>
          ) : <div />}
        </nav>
      </div>
    </article>
  );
};
