import { notFound } from 'next/navigation';
import { getTeaBySlug, teas } from '@/data/teas';
import ProductPageClient from '@/components/ProductPageClient';

export function generateStaticParams() {
  return teas.map((tea) => ({ slug: tea.slug }));
}

export default function ProductPage({ params }) {
  const tea = getTeaBySlug(params.slug);
  if (!tea) notFound();
  return <ProductPageClient tea={tea} />;
}
