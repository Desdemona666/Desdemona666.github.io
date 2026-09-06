import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectBlogView } from './components/ProjectBlogView';
import { ContactSection } from './components/ContactSection';
import { CvModal } from './components/CvModal';
import { Footer } from './components/Footer';
import { projectsData } from './data/projectsData';
import { ProjectCaseStudy } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
    }
    // Default base: Light Mode
    return false;
  });

  // Sync dark class on document.documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Handle URL hash routing for direct deep links (e.g. #chatbot-rag-knowledge-graph-neo4j)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setSelectedProject(null);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // Check if hash matches any project slug
      const foundProject = projectsData.find(p => p.slug === hash || p.id === hash);
      if (foundProject) {
        setSelectedProject(foundProject);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSelectedProject(null);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Initial check on mount: if no hash, guarantee scroll to top (Hero Section)
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (project: ProjectCaseStudy) => {
    setSelectedProject(project);
    window.location.hash = project.slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = (targetSection = 'home') => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
    setTimeout(() => {
      if (targetSection === 'home' || !targetSection) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetSection);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        }
      }
    }, 50);
  };

  const handleLogoClick = () => {
    setSelectedProject(null);
    setActiveSection('home');
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    if (selectedProject) {
      handleBackToHome(sectionId);
    } else {
      setActiveSection(sectionId);
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-200 dark:selection:bg-neutral-800 selection:text-neutral-900 dark:selection:text-white font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenCv={() => setIsCvModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isInsideBlog={!!selectedProject}
        onBackToHome={() => handleBackToHome('home')}
        onLogoClick={handleLogoClick}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      {selectedProject ? (
        // Dedicated Project Documentation & Blog View
        <ProjectBlogView
          project={selectedProject}
          onBack={() => handleBackToHome('projects')}
          onSelectProject={handleSelectProject}
          allProjects={projectsData}
        />
      ) : (
        // Main Single-View Portfolio
        <main className="space-y-0">
          <Hero
            onExploreProjects={() => handleNavigate('projects')}
            onOpenCv={() => setIsCvModalOpen(true)}
            onContactClick={() => handleNavigate('contact')}
          />
          <AboutSection />
          <ExperienceEducation />
          <SkillsSection
            onSkillSelect={(skill) => {
              // Smooth scroll to projects section
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <ProjectsSection onSelectProject={handleSelectProject} />
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer
        onScrollToTop={handleScrollToTop}
        onNavigate={handleNavigate}
      />
    </div>

    {/* High-Fidelity Printable CV Modal — rendered outside main div for clean print */}
    <CvModal
      isOpen={isCvModalOpen}
      onClose={() => setIsCvModalOpen(false)}
    />
    </>
  );
}
