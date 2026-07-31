'use client';

import React from 'react';
import { Link } from '@/lib/i18n/navigation';
import { BlogPost } from '@/types';
import { ArrowLeft, User, Tag } from 'lucide-react';

interface BlogPostPageProps {
  post: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  return (
    <div className="w-full py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Blog</span>
        </Link>

        {/* Post Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-purple-500/20 text-purple-300">
              {post.category}
            </span>
            <span className="text-xs text-[var(--oe-text-secondary)] font-mono">{post.date} • {post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-[var(--oe-text)] mb-6 leading-snug">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-[var(--oe-text-secondary)] font-mono pb-6 border-b border-[var(--oe-border)]">
            <User className="w-4 h-4 text-purple-400" />
            <span>Par {post.author}, Okapi Edge</span>
          </div>
        </div>

        {/* Cover Image */}
        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-10 h-72 bg-[var(--oe-bg-muted)]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Excerpt */}
        <p className="text-base text-[var(--oe-text-secondary)] font-semibold leading-relaxed mb-8 italic border-l-4 border-purple-500 pl-4">
          {post.excerpt}
        </p>

        {/* Content */}
        <div className="prose prose max-w-none text-sm text-[var(--oe-text-secondary)] leading-relaxed space-y-4 font-body whitespace-pre-line mb-12">
          {post.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-[var(--oe-border)] flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-[var(--oe-text-muted)]" />
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded text-[11px] font-mono bg-[var(--oe-bg-muted)] text-[var(--oe-text-secondary)]">
              #{tag}
            </span>
          ))}
        </div>

        {/* Back CTA */}
        <div className="mt-10 pt-8 border-t border-[var(--oe-border)] text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-[var(--oe-text)] font-heading font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tous les Articles</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
