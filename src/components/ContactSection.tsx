import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { contactInfo } from '../data/cvData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setError('');

    try {
      const now = new Date();
      const timeStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, subject, message, time: timeStr },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setError('Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-16 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 space-y-2">
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block">
            Kontak & Diskusi
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white tracking-tight">
            Hubungi Saya
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            Terbuka untuk peluang karir Data Scientist, Analytics Engineer, riset Machine Learning, maupun konsultasi analitik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 space-y-5 shadow-xs">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Saluran Langsung
              </span>

              {/* Email Card */}
              <div className="bg-white dark:bg-neutral-950 p-4 rounded border border-neutral-200 dark:border-neutral-800 space-y-1.5 shadow-2xs">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-mono">Email Utama</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm font-medium text-neutral-900 dark:text-white hover:underline truncate"
                  >
                    {contactInfo.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(contactInfo.email, 'email')}
                    className="p-1.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white border border-neutral-300 dark:border-neutral-800 transition-colors shrink-0 cursor-pointer"
                    title="Salin Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="bg-white dark:bg-neutral-950 p-4 rounded border border-neutral-200 dark:border-neutral-800 space-y-1.5 shadow-2xs">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-mono">Telepon & WhatsApp</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/6285770460205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-900 dark:text-white hover:underline truncate"
                  >
                    {contactInfo.phone}
                  </a>
                  <div className="flex items-center gap-1.5 shrink-0">
                <button
                      onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                      className="p-1.5 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white border border-neutral-300 dark:border-neutral-800 transition-colors cursor-pointer"
                      title="Salin Nomor"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href="https://wa.me/6285770460205"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-mono border border-neutral-300 dark:border-neutral-700 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white dark:bg-neutral-950 p-4 rounded border border-neutral-200 dark:border-neutral-800 shadow-2xs">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-mono">Domisili</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white mt-1 block">{contactInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Message Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 sm:p-8 space-y-4 shadow-xs">
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Kirim Pesan Langsung
              </span>

              {isSubmitted && (
                <div className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded p-4 text-xs text-neutral-900 dark:text-neutral-200 shadow-2xs">
                  <span className="font-semibold block mb-0.5">Pesan Berhasil Terkirim</span>
                  <span className="text-neutral-600 dark:text-neutral-400">Terima kasih atas pesan Anda. Saya akan segera menghubungi kembali.</span>
                </div>
              )}

              {error && (
                <div className="bg-white dark:bg-neutral-900 border border-red-300 dark:border-red-700 rounded p-4 text-xs text-red-900 dark:text-red-200 shadow-2xs">
                  <span className="font-semibold block mb-0.5">Gagal Mengirim</span>
                  <span className="text-red-600 dark:text-red-400">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-700 dark:text-neutral-300 font-medium block mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Budi Santoso"
                      className="w-full bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-500 rounded px-3 py-2 text-neutral-900 dark:text-neutral-200 focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-700 dark:text-neutral-300 font-medium block mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="budi@perusahaan.com"
                      className="w-full bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-500 rounded px-3 py-2 text-neutral-900 dark:text-neutral-200 focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-700 dark:text-neutral-300 font-medium block mb-1">Subjek</label>
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Tawaran Kerja Data Scientist / Undangan Wawancara"
                    className="w-full bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-500 rounded px-3 py-2 text-neutral-900 dark:text-neutral-200 focus:outline-none transition-colors shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-neutral-700 dark:text-neutral-300 font-medium block mb-1">Pesan *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pesan atau kebutuhan proyek..."
                    className="w-full bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-neutral-500 rounded p-3 text-neutral-900 dark:text-neutral-200 focus:outline-none transition-colors resize-none shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 font-semibold text-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
