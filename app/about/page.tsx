import Link from "next/link";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { FlipText } from "@/components/ui/flip-text";

export default function HomePage() {
  const renderHero = () => {
    return (
      <div className="flex flex-col items-start space-y-8 md:flex-row md:items-center md:space-y-0 justify-between">
        <div className="space-y-4">
          <FlipText
            preTransitionText="MJML + Liquid"
            postTransitionText="Preview & Edit"
            srOnlyText="MJML and Liquid Previewer"
            className="text-4xl font-sans"
          />
          <p className="text-lg font-serif block md:hidden">
            A tool for quick previewing and editing of MJML email code/templates with support for Liquid templating.
          </p>
       </div>
        {renderEditorButton()}
      </div>
    )
  }

  const renderDescription = () => {
    return (
      <div className="space-y-8">
        <p className="text-lg font-serif hidden md:block">
          A tool for quick previewing and editing of MJML email code/templates with support for Liquid templating.
        </p>
        <div className="space-y-8">
          <Accordion type="multiple" defaultValue={["roadmap"]}>
            <AccordionItem value="roadmap">
              <AccordionTrigger><h3 className="font-sans text-xl mb-2">Roadmap</h3></AccordionTrigger>
              <AccordionContent>
                {renderRoadmap()}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="about">
              <AccordionTrigger><h3 className="font-sans text-xl mb-2">About</h3></AccordionTrigger>
              <AccordionContent>
                {renderAbout()}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="features">
              <AccordionTrigger><h3 className="font-sans text-xl mb-2">Features</h3></AccordionTrigger>
              <AccordionContent>
                {renderFeatures()}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    )
  }

  const renderAbout = () => {
    return (
      <div className="font-serif text-lg space-y-4">
        <p>
          This was inspired by <a href="https://github.com/zonghangoh" target="_blank" rel="noopener noreferrer" className="underline">@zonghangoh</a> for productivity when developing with MJML and Liquid at <a href="https://www.ascenda.com/" target="_blank" rel="noopener noreferrer" className="underline">Ascenda</a>.
        </p>
        <p>
          I thought it might be useful to others, so I beautified it, added more features to aid developing with it and open-sourced it. If you find this helpful, do give it a <a href="https://github.com/lohkokwee/mjml-liquid-preview" target="_blank" rel="noopener noreferrer" className="underline">star on GitHub</a>!
        </p>
      </div>
    )
  }

  const renderFeatures = () => {
    return (
      <div>
        <ul className="list-disc list-inside space-y-2 font-serif text-lg">
          <li>
            Live <a href="https://mjml.io/" target="_blank" rel="noopener noreferrer" className="underline">MJML</a> preview with <a href="https://shopify.github.io/liquid/" target="_blank" rel="noopener noreferrer" className="underline">Liquid</a> templating support
          </li>
          <li>Local and shared Liquid variables</li>
          <li>Responsive preview with scale/overflow modes</li>
          <li>Auto-save functionality</li>
          <li>Dark mode support</li>
          <li>Custom viewport sizes</li>
          <li>Keyboard first navigation for developers (hit the `option`/`alt` key to start)</li>
        </ul>
      </div>
    )
  }

  const renderRoadmap = () => {
    return (
      <div className="font-serif text-lg space-y-4">
        <p>
          I&apos;ve been enjoying working on this project and have been slowly adding features to it. Here are some of the features that are in the pipeline!
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Copying previews directly as images</li>
          <li>Accounts for data persistence</li>
          <li>Facilities to share previews and liquid variables through links</li>
        </ul>
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
          <span>Visit the editor</span>
          <span className="inline-block transition-transform duration-700 ease-in-out group-hover:translate-x-1 group-hover:duration-300">
            →
          </span>
        </Link>
      </Button>
    )
  }

  return (
    <div className="h-full flex flex-col items-center bg-background p-10">
      <div className="max-w-xl mx-auto space-y-8">
        {renderHero()}
        {renderDescription()}
      </div>
    </div>
  );
}
