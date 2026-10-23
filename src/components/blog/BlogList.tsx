import React, { useState } from 'react';
import { Search, Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { BlogPost } from '../../types';

interface BlogListProps {
  onNavigate: (path: string) => void;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onNavigate, onSelectPost }) => {
  const { blogPosts } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'Websites',
    'Business Email',
    'Domains & Hosting',
    'POS & Inventory',
    'SEO & Marketing'
  ];

  const filtered = blogPosts.filter((p) => {
    if (p.isDraft) return false;
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Knowledge Base & Practical Guides
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
            Nyota One Business & Tech Blog
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Practical digital playbooks, technical guides, and cost breakdowns written specifically for businesses operating in Uganda, East Africa, and globally.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Guides' : cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3.5 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-0.5 rounded">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with typographic separators (anti-slop rule) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{post.publishedAt.split('T')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                    {post.isMigrated && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-blue-600">Preserved Article</span>
                      </>
                    )}
                  </div>

                  <h2
                    onClick={() => onSelectPost(post)}
                    className="text-lg font-bold text-slate-900 font-heading hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{post.author}</span>
                  <button
                    type="button"
                    onClick={() => onSelectPost(post)}
                    className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
