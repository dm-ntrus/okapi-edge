import { listAllProducts } from '@/lib/db/queries';
import { SAAS_PRODUCTS } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { ProductsCrud } from '@/components/admin/ProductsCrud';

export default async function AdminProductsPage() {
  const fromDb = await listAllProducts();
  const products =
    fromDb ??
    SAAS_PRODUCTS.map((p, i) => ({
      id: p.id,
      locale: 'fr',
      key: p.id,
      name: p.name,
      subtitle: p.subtitle,
      tagline: p.tagline,
      category: p.category,
      description: p.description,
      full_description: p.fullDescription,
      tags: p.tags,
      metrics: p.metrics,
      features: p.features,
      subdomain_url: p.subdomainUrl,
      badge: p.badge,
      color: p.color,
      bg_gradient: p.bgGradient,
      published: true,
      sort_order: i,
    }));

  return <ProductsCrud products={products} dbOk={isDbConfigured()} />;
}
