'use client';

import dynamic from 'next/dynamic';

const PasswordGenerator = dynamic(
  () => import('../components/PasswordGenerator'),
  { ssr: false },
);

export default function Home() {
  return <PasswordGenerator />;
}
