import { Metadata } from 'next';

import { notFound } from 'next/navigation';
import { getChangelogDates, getChangelogEntry } from '@/lib/changelog';
import ChangelogPost from '@/components/changelog/changelog-post';
import HoverLink from '@/components/shared/buttons/hover-link';

export async function generateStaticParams() {
  const dates = getChangelogDates();
  
  return dates.map((date) => ({
    date,
  }));
}

type Props = {
  params: Promise<{ date: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const date = (await params).date;
  
  if (!date) {
    return {
      title: 'Changelog entry not found',
      description: 'The requested changelog entry could not be found.',
    };
  }
  
  const entry = await getChangelogEntry(date);
  
  if (!entry) {
    return {
      title: 'Changelog entry not found',
      description: `No changelog entry found for ${date}.`,
    };
  }
  
  return {
    title: `${entry.title} | Changelog`,
    description: entry.excerpt,
  };
}

export default async function ChangelogEntryPage({ params }: Props) {
  const date = (await params).date;

  const renderHeader = () => {
    return (
      <div className="mb-8 flex items-center justify-between hidden sm:flex">
        <HoverLink title="Back to Changelog" href="/changelog" arrowDirection="back"/>
        <HoverLink title="Visit the editor" href={`/editor`} arrowDirection="forward"/>
      </div>
    )
  }
  
  if (!date) {
    console.error('No date parameter provided');
    notFound();
  }
  
  try {
    const entry = await getChangelogEntry(date);
    
    if (!entry) {
      console.error(`No changelog entry found for ${date}`);
      notFound();
    }
    
    return (
      <div className="h-full flex flex-col items-center bg-background p-10">
        <div className="max-w-xl mx-auto space-y-8">
          {renderHeader()}
          <ChangelogPost entry={entry} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error rendering changelog for ${date}:`, error);
    notFound();
  }
} 