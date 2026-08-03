'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { BLOG_POSTS } from '@/content/mock-data';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Search } from 'lucide-react';

type CategoryId = 'all' | 'tech' | 'guides' | 'cases';
const CATEGORY_FILTERS: { id: CategoryId; match?: string }[] = [
  { id: 'all' },
  { id: 'tech', match: 'Tech & Edge Architecture' },
  { id: 'guides', match: 'Guides Métiers' },
  { id: 'cases', match: 'Études de Cas' },
];

export const BlogPage: React.FC<{ posts?: typeof BLOG_POSTS }> = ({ posts = BLOG_POSTS }) => {
  const t = useTranslations('blog');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const filter = CATEGORY_FILTERS.find((c) => c.id === selectedCategory);
    const matchesCategory =
      selectedCategory === 'all' || !filter?.match || post.category === filter.match;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        description={t('hero.description')}
      />

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {CATEGORY_FILTERS.map((cat) => {
                const selected = selectedCategory === cat.id;
                return (
                  <span key={cat.id} className="contents">
                    <input
                      type="radio"
                      name="oe-blog-cat"
                      id={`oe-blog-cat-${cat.id}`}
                      checked={selected}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="oe-native-toggle"
                    />
                    <label
                      htmlFor={`oe-blog-cat-${cat.id}`}
                      className={`oe-tap shrink-0 cursor-pointer rounded-[var(--oe-radius)] px-3 py-2 text-xs font-mono transition-colors min-h-11 inline-flex items-center ${
                        selected
                          ? 'bg-[var(--oe-accent-soft)] text-[var(--oe-accent)] border border-[var(--oe-accent)]/30'
                          : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] border border-transparent'
                      }`}
                    >
                      {t(`categories.${cat.id}`)}
                    </label>
                  </span>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--oe-text-muted)]" />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="oe-field pl-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] overflow-hidden transition-colors hover:border-[var(--oe-border-strong)]"
              >
                <div>
                  <div className="h-44 overflow-hidden bg-[var(--oe-bg)]">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--oe-surface)] to-[var(--oe-bg)]">
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--oe-text-muted)]">
                          {t('coverFallback')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--oe-accent)]">
                        {post.category}
                      </span>
                      <span className="font-mono text-[11px] text-[var(--oe-text-muted)]">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--oe-text)] tracking-tight mb-2 group-hover:text-[var(--oe-accent)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--oe-text-secondary)] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--oe-border)] px-6 py-4 text-xs text-[var(--oe-text-muted)]">
                  <span>{post.author}</span>
                  <span className="font-mono text-[var(--oe-accent)]">{t('readCta')}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
