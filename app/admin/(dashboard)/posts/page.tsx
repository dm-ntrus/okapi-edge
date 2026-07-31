import { listAllPosts } from '@/lib/db/queries';
import { BLOG_POSTS } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { PostsCrud } from '@/components/admin/PostsCrud';

export default async function AdminPostsPage() {
  const fromDb = await listAllPosts();
  const posts =
    fromDb ??
    BLOG_POSTS.map((p) => ({
      id: p.id,
      locale: 'fr',
      title: p.title,
      slug: p.slug,
      category: p.category,
      author: p.author,
      date_label: p.date,
      read_time: p.readTime,
      excerpt: p.excerpt,
      content: p.content,
      image: p.image,
      tags: p.tags,
      published: true,
    }));

  return <PostsCrud posts={posts} dbOk={isDbConfigured()} />;
}
