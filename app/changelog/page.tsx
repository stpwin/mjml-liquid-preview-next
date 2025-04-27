import { getAllChangelogEntries } from '@/lib/changelog';
import ChangelogList from '@/components/changelog/changelog-list';
import { FlipText } from '@/components/ui/flip-text';

export default async function ChangelogPage() {
  const entries = await getAllChangelogEntries();

  const renderHero = () => {
    return (
      <div className="flex flex-col items-start space-y-8 md:flex-row md:items-center md:space-y-0 justify-between">
        <div className="space-y-4">
          <FlipText
            preTransitionText="Changelog"
            postTransitionText="Updates"
            srOnlyText="Changelog"
            className="text-4xl font-sans"
          />
          <p className="text-lg font-serif">
            Track our latest updates and improvements here.
          </p>
        </div>
      </div>
    )
  }
  
  return ( <div className="h-full flex flex-col items-center bg-background p-10">
      <div className="max-w-xl mx-auto space-y-8">
        {renderHero()}
        <ChangelogList entries={entries} />
      </div>
    </div>
  );
}