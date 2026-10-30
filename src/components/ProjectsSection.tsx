import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { featuredProjects } from '../data/projectsData';
import { Project } from '../types';
import { CaseStudyModal } from './CaseStudyModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-20 md:py-28 bg-[var(--surface-color)] border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--primary-color)] mb-3">
            Selected Architecture Work
          </p>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)]">
            Explore advanced CSS implementations designed for high performance, complex responsive viewports, and uncompromising accessibility.
          </p>
        </div>

        {/* Projects Grid: 1-col on mobile, 2-col on md, 3-col on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              aria-labelledby={`${project.id}-title`}
              className="group flex flex-col bg-[var(--bg-color)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-[var(--shadow)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Media image container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-[var(--border-color)]">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    id={`${project.id}-title`}
                    className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--primary-color)] transition-colors"
                  >
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Clean unboxed tags with typographic separators */}
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium mb-5 flex-wrap">
                    {project.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="text-[var(--text-main)] font-semibold">{tag}</span>
                        {idx < project.tags.length - 1 && (
                          <span aria-hidden="true" className="text-[var(--border-color)]">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Accessible action button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-between text-sm font-bold text-[var(--primary-color)] group-hover:text-[var(--primary-hover)] pt-3 border-t border-[var(--border-color)] cursor-pointer focus-visible:ring-2"
                    aria-label={`Read case study for ${project.title}`}
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
