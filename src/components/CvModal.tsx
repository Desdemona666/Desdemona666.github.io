import React, { useState } from 'react';
import { X, Printer, Copy, Check, FileText } from 'lucide-react';
import { contactInfo, workExperiences, educations, skillGroups, spokenLanguages } from '../data/cvData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const cvText = `
${contactInfo.name}
${contactInfo.title}
${contactInfo.location} • ${contactInfo.phone} • ${contactInfo.email}

RINGKASAN PROFESIONAL
${contactInfo.summary}

PENGALAMAN KERJA
${workExperiences.map(e => `
${e.role} — ${e.company}
${e.location} | ${e.period}
${e.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

PENDIDIKAN & SERTIFIKASI
${educations.map(ed => `
${ed.institution}
${ed.degree} ${ed.gpa ? `(IPK: ${ed.gpa})` : ''} | ${ed.period}
${ed.description ? `${ed.description}\n` : ''}${ed.focus ? `Fokus Keahlian: ${ed.focus}` : ''}
`).join('\n')}

KEAHLIAN TEKNIS
${skillGroups.map(sg => `${sg.category}: ${sg.skills.join(', ')}`).join('\n')}

BAHASA
${spokenLanguages.map(l => `${l.language}: ${l.level}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(cvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white">
      <div className="relative bg-white text-neutral-900 rounded-lg w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-300 print:border-none print:shadow-none print:max-h-none print:rounded-none">
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="sticky top-0 z-10 bg-neutral-100/95 backdrop-blur-md px-6 py-3 border-b border-neutral-300 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
            <FileText className="w-4 h-4 text-neutral-700" />
            <span>Curriculum Vitae — Ajie Rafli Pamungkas</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-neutral-900" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Body (Formatted accurately to user's CV) */}
        <div className="p-8 sm:p-12 font-sans space-y-6 text-neutral-800 print:p-0">
          {/* Header */}
          <div className="border-b border-neutral-900 pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-neutral-950">
              {contactInfo.name}
            </h1>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-600 mt-1 font-mono">
              {contactInfo.title}
            </p>
            <p className="text-xs text-neutral-600 mt-2 font-mono">
              {contactInfo.location} • {contactInfo.phone} • {contactInfo.email}
            </p>
          </div>

          {/* Ringkasan Profesional */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
              Ringkasan Profesional
            </h2>
            <p className="text-xs leading-relaxed text-neutral-700 text-justify">
              {contactInfo.summary}
            </p>
          </section>

          {/* Pengalaman Kerja */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
              Pengalaman Kerja
            </h2>

            {workExperiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-neutral-950">
                  <div>
                    <span>{exp.role}</span>
                    <span className="font-normal text-neutral-600"> — {exp.company}</span>
                  </div>
                  <span className="text-neutral-600 text-[11px] font-mono font-medium">{exp.period}</span>
                </div>
                <div className="text-[11px] text-neutral-500 italic">
                  {exp.location}
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-neutral-700">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="leading-normal">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Pendidikan & Sertifikasi */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
              Pendidikan & Sertifikasi
            </h2>

            {educations.map((edu) => (
              <div key={edu.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-neutral-950">
                  <span>{edu.institution}</span>
                  <span className="text-neutral-600 text-[11px] font-mono font-medium">{edu.period}</span>
                </div>
                <div className="text-neutral-700">
                  {edu.degree} {edu.gpa && <span className="font-semibold font-mono">(IPK: {edu.gpa})</span>}
                </div>
                {edu.description && (
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    {edu.description}
                  </p>
                )}
                {edu.focus && (
                  <div className="text-[11px] text-neutral-600 font-mono">
                    <strong>Fokus Keahlian:</strong> {edu.focus}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Keahlian Teknis */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
              Keahlian Teknis
            </h2>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              {skillGroups.map((sg) => (
                <div key={sg.category} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-neutral-900 w-44 shrink-0 font-mono">{sg.category}</span>
                  <span className="text-neutral-700">{sg.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Bahasa */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-950 border-b border-neutral-300 pb-1">
              Bahasa
            </h2>
            <div className="space-y-1 text-xs text-neutral-700">
              {spokenLanguages.map((l) => (
                <div key={l.language} className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900 w-40">{l.language}:</span>
                  <span>{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
