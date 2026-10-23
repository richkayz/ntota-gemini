import React from 'react';
import { ArrowLeft, ExternalLink, CheckCircle2, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { PortfolioProject } from '../../types';

interface ProjectDetailProps {
  project: PortfolioProject;
  onNavigate: (path: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onNavigate }) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <button
          type="button"
          onClick={() => onNavigate('/projects')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all case studies
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {project.category}
              </span>
              <span className="text-xs text-slate-400">· {project.location}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Client / Deployment: <strong>{project.client}</strong></p>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 font-heading flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                The Client Challenge
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
              <h3 className="text-sm font-bold text-blue-900 font-heading flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                The Nyota One Solution
              </h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Outcome */}
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <h3 className="text-sm font-bold text-emerald-900 font-heading">
              Verified Business Outcome
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              {project.outcome}
            </p>
          </div>

          {/* Tech stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Technology Architecture & Stack:
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External Link & CTA */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
              >
                Visit Live Platform
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-slate-500">Internal proprietary deployment</span>
            )}

            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              Build a Similar Solution
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
