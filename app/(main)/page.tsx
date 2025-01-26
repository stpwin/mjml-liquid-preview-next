import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FlipText } from "@/components/ui/flip-text";

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
      <Button asChild size="lg" variant="outline">
        <Link 
          href="/editor"
          className="font-sans group flex items-center space-x-2 text-xl hover:text-primary transition-colors duration-200"
        >
          <span>Go to editor</span>
          <span className="inline-block transition-transform duration-700 ease-in-out group-hover:translate-x-1 group-hover:duration-300">
            →
          </span>
        </Link>
      </Button>
    )
  }

  const renderAboutButton = () => {
    return (
      <Button asChild size="lg" variant="outline">
        <Link 
          href="/about"
          className="font-sans group flex items-center space-x-2 text-xl hover:text-primary transition-colors duration-200"
        >
          <span>Learn more</span>
          <span className="inline-block transition-transform duration-700 ease-in-out group-hover:translate-x-1 group-hover:duration-300">
            →
          </span>
        </Link>
      </Button>
    )
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-background mx-auto p-10">
      <div className="max-w-xl mx-auto space-y-20">
        {renderHero()}
        <div className="flex flex-col items-end space-y-3">
          {renderEditorButton()}
          {renderAboutButton()}
        </div>
      </div>
    </div>
  );
}
