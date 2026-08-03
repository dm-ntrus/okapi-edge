import { setRequestLocale } from 'next-intl/server';
import { BlogPage } from '@/components/pages/BlogPage';
import { getDynamicPosts } from '@/lib/content/dynamic';
import { buildPageMetadata } from '@/lib/i18n/metadata';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'blog', '/blog');
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getDynamicPosts(locale);
  return <BlogPage posts={posts} />;
}
