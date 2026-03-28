import { notFound } from 'next/navigation';
import { getTeaBySlug, publicReleases } from '@/data/teas';
import ReleasePageClient from '@/components/ReleasePageClient';

export function generateStaticParams() {
  return publicReleases.map((tea) => ({ slug: tea.slug }));
}

export default function ReleasePage({ params }) {
  const tea = getTeaBySlug(params.slug);
  if (!tea || tea.visibility !== 'public') notFound();
  return <ReleasePageClient release={tea} />;
}
