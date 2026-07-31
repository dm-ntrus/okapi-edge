import { setRequestLocale } from 'next-intl/server';
import { BlogPage } from '@/components/pages/BlogPage';
import { getDynamicPosts } from '@/lib/content/dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata() {
  return {
    title: 'Blog & Articles',
    description: 'Insights engineering, edge computing et études de cas Okapi Edge.',
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = await getDynamicPosts(locale);
  return <BlogPage posts={posts} />;
}
