import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { PortfolioProject } from '../../types';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  onSelectProject: (project: PortfolioProject) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, onSelectProject }) => {
  const { projects } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'E-commerce',
    'Education Technology',
    'Internal Business Tools',
    'Websites',
    'Business Systems'
  ];

  const filtered = projects.filter((p) => {
    return selectedCategory === 'all' || p.category === selectedCategory;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Real Work & Case Studies
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Our Work & Client Deployments
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real platforms, web applications, and digital business systems built and deployed for Ugandan and international organizations. We let verified outcomes speak for themselves.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Deployments' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {project.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-medium text-slate-400 flex items-center justify-between">
                    <span>{project.client}</span>
                    <span>{project.location}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-slate-900 font-heading hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5">Verified Outcome:</span>
                    <p className="line-clamp-2">{project.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
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
                      onClick={() => onSelectProject(project)}
                      className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      Read Full Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        Visit Site
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
    </div>
  );
};
