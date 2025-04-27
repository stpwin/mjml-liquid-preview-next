"use client";

import { H1, P } from '@/components/shared/common/typography';
import HoverLink from '@/components/shared/buttons/hover-link';

export default function ChangelogNotFound() {
  return (
    <div className="h-full flex flex-col items-center bg-background p-10">
      <div className="max-w-xl mx-auto space-y-8">
        <H1 className="text-3xl font-sans">Changelog entry not found 🥵</H1>
        <P className="text-lg text-gray-600 mb-8">
          The changelog entry you&apos;re looking for could not be found.
        </P>
        <HoverLink title="Back to Changelog" href="/changelog" arrowDirection="back"/>
      </div>
    </div>
  );
} 