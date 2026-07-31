import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { BlogPostPage } from '@/components/pages/BlogPostPage';
import { getDynamicPost, getDynamicPosts } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const [fr, en] = await Promise.all([getDynamicPosts('fr'), getDynamicPosts('en')]);
  const slugs = new Set([...fr, ...en].map((p) => p.slug));
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getDynamicPost(slug, locale);
  if (!post) return { title: 'Article' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getDynamicPost(slug, locale);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
