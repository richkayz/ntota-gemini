import React from 'react';
import { ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { useAppStore } from '../../lib/store';

interface FeaturedProjectsProps {
  onNavigate: (path: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onNavigate }) => {
  const { projects } = useAppStore();
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="bg-slate-100/70 py-20 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Verified Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              Featured Client & Internal Systems
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Real platforms, web applications, and digital business systems designed, engineered, and maintained by Nyota One.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/projects')}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer self-start md:self-auto group"
          >
            View Complete Portfolio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {project.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-medium text-slate-500 flex items-center justify-between">
                    <span>{project.client}</span>
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/projects/${project.slug}`)}
                      className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer flex items-center gap-1"
                    >
                      Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Live Website
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
