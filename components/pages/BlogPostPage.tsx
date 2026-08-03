'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { BlogPost } from '@/types';
import { ArrowLeft, User, Tag } from 'lucide-react';

interface BlogPostPageProps {
  post: BlogPost;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  const t = useTranslations('blog');

  return (
    <div className="w-full py-10 sm:py-16 bg-[var(--oe-bg)] text-[var(--oe-text)]">
      <div className="oe-container max-w-3xl">

        <Link
          href="/blog"
          className="oe-tap inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 mb-6 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('post.backToBlog')}</span>
        </Link>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-purple-500/20 text-purple-300">
              {post.category}
            </span>
            <span className="text-xs text-[var(--oe-text-secondary)] font-mono">
              {post.date} • {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[var(--oe-text)] mb-6 leading-snug text-balance">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-[var(--oe-text-secondary)] font-mono pb-6 border-b border-[var(--oe-border)]">
            <User className="w-4 h-4 text-purple-400" />
            <span>{t('post.byPrefix', { author: post.author })}</span>
          </div>
        </div>

        {post.image && (
          <div className="rounded-2xl overflow-hidden mb-8 sm:mb-10 h-48 sm:h-72 bg-[var(--oe-bg-muted)]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <p className="text-base text-[var(--oe-text-secondary)] font-semibold leading-relaxed mb-8 italic border-l-4 border-purple-500 pl-4">
          {post.excerpt}
        </p>

        <div className="oe-prose-mobile max-w-none text-[var(--oe-text-secondary)] leading-relaxed space-y-4 font-body whitespace-pre-line mb-10 sm:mb-12">
          {post.content}
        </div>

        <div className="pt-6 border-t border-[var(--oe-border)] flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-[var(--oe-text-muted)]" />
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded text-[11px] font-mono bg-[var(--oe-bg-muted)] text-[var(--oe-text-secondary)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--oe-border)] text-center">
          <Link
            href="/blog"
            className="oe-tap inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-[var(--oe-text)] font-heading font-bold text-sm transition-colors min-h-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('post.allArticlesCta')}</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
