import { redirect } from 'next/navigation';

export default function LegacyProductPage({ params }) {
  redirect(`/release/${params.slug}`);
}
