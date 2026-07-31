'use client';

import React, { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { BLOG_POSTS } from '@/content/mock-data';
import { PageHero } from '@/components/ui/PageHero';
import { Container, Section } from '@/components/ui/Section';
import { Search } from 'lucide-react';

export const BlogPage: React.FC<{ posts?: typeof BLOG_POSTS }> = ({ posts = BLOG_POSTS }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tous', 'Tech & Edge Architecture', 'Guides Métiers', 'Études de Cas'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[var(--oe-bg)]">
      <PageHero
        eyebrow="Hub d'Intelligence & SEO"
        title="Blog & Ressources Okapi"
        description="Décryptages techniques, études de cas clients et guides d'implémentation de la conformité e-DGI en RDC."
      />

      <Section className="bg-[var(--oe-bg)] border-b-0">
        <Container>
          <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-[var(--oe-radius-lg)] border border-[var(--oe-border)] bg-[var(--oe-surface)] p-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-[var(--oe-radius)] px-3 py-1.5 text-xs font-mono transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[var(--oe-accent-soft)] text-[var(--oe-accent)] border border-[var(--oe-accent)]/30'
                      : 'text-[var(--oe-text-muted)] hover:text-[var(--oe-text)] border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--oe-text-muted)]" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[var(--oe-radius)] border border-[var(--oe-border)] bg-[var(--oe-bg)] pl-9 pr-3 py-2 text-sm text-[var(--oe-text)] placeholder:text-[var(--oe-text-muted)] focus:border-[var(--oe-accent)]/50 focus:outline-none"
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
                          Okapi Edge
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
                  <span className="font-mono text-[var(--oe-accent)]">Lire →</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};
