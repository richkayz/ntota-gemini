import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogPostDetailProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  post,
  onNavigate,
  onSelectPost
}) => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="hover:text-blue-600 flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Resources & Blog
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{post.category}</span>
        </div>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 shadow-xs space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Clean unboxed metadata with subtle separators */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-y border-slate-100 py-3 font-medium">
              <span>Author: <strong className="text-slate-700">{post.author}</strong> ({post.authorRole})</span>
              <span aria-hidden="true">·</span>
              <span>Published: {post.publishedAt.split('T')[0]}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
              {post.isMigrated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 font-semibold">Preserved Original Article</span>
                </>
              )}
            </div>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 font-heading pt-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-slate-900 font-heading pt-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('# ')) {
                return null; // Already rendered in H1
              }
              return (
                <p key={idx} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" />
              Topics:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action footer */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold font-heading">Ready to implement this solution for your business?</h4>
              <p className="text-xs text-slate-400">Our engineering consultants provide live walkthroughs.</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
            >
              Talk to Nyota Team
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
