import { FlipText } from "@/components/ui/flip-text";
import HoverLink from "@/components/shared/buttons/hover-link";

export default function HomePage() {
  const renderHero = () => {
    return (
      <div className="space-y-5">
        <p className="text-xl font-sans">
          A simple tool to edit and preview your
        </p>
        <FlipText
          preTransitionText="MJML + Liquid"
          postTransitionText="MJMLiquid"
          srOnlyText="MJML and Liquid"
          className="text-6xl font-sans"
        />
        <p className="text-xl font-sans">
          code and templates in real-time.
        </p>
      </div>
    )
  }

  const renderEditorButton = () => {
    return (
      <HoverLink 
        title="Go to editor"
        href="/editor"
        fontSize="text-xl"
      />
    )
  }

  const renderAboutButton = () => {
    return (
      <HoverLink
        title="Learn more"
        href="/about"
        fontSize="text-xl"
      />
    )
  }

  const renderChangelogButton = () => {
    return (
      <HoverLink
        title="View changelog"
        href="/changelog"
        fontSize="text-xl"
      />
    )
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-background mx-auto p-10">
      <div className="max-w-xl mx-auto space-y-20">
        {renderHero()}
        <div className="flex flex-col items-end space-y-4">
          {renderEditorButton()}
          {renderChangelogButton()}
          {renderAboutButton()}
        </div>
      </div>
    </div>
  );
}
