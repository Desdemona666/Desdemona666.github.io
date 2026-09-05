import React, { useState } from 'react';
import { skillGroups } from '../data/cvData';
import { projectsData } from '../data/projectsData';

interface Props {
  onSkillSelect?: (skill: string) => void;
}

export const SkillsSection: React.FC<Props> = ({ onSkillSelect }) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillClick = (skill: string) => {
    if (selectedSkill === skill) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
      if (onSkillSelect) onSkillSelect(skill);
    }
  };

  // Find projects that use this skill
  const relatedProjects = selectedSkill
    ? projectsData.filter(p => 
        p.techStack.some(t => t.toLowerCase().includes(selectedSkill.toLowerCase()))
      )
    : [];

  return (
    <section id="skills" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 space-y-2">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Kompetensi & Tooling
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
            Keahlian Teknis & Ekosistem Data
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Daftar teknologi yang digunakan dalam pipeline produksi, pemodelan statistik, dan deployment cloud.
          </p>
        </div>

        {/* Skills Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 space-y-3 shadow-xs"
            >
              <div className="pb-2 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider font-mono">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
                  const isSelected = selectedSkill === skill;
                  return (
                    <button
                      key={skill}
                      onClick={() => handleSkillClick(skill)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-xs'
                          : 'bg-white dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-950 dark:hover:text-white shadow-2xs'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Cross-Reference Banner */}
        {selectedSkill && (
          <div className="mt-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-700 dark:text-neutral-300">
                Dokumentasi Proyek yang Menggunakan: <strong className="text-neutral-950 dark:text-white font-mono">{selectedSkill}</strong>
              </span>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-xs text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white font-mono underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {relatedProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {relatedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-800 text-xs shadow-2xs"
                  >
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono block">{proj.category}</span>
                    <span className="font-semibold text-neutral-950 dark:text-white block mt-0.5">{proj.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                Digunakan dalam analisis eksplorasi dan modul pendukung internal.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
