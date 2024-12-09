"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export function InfoButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Info className="h-[1.2rem] w-[1.2rem]" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <span className="font-sans text-xl">MJML + Liquid Preview</span>
            </SheetTitle>
            <SheetDescription>
              <span className="font-serif text-sm">
                A tool for previewing MJML emails with Liquid templating
              </span>
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-sans text-xl mb-2">About</h3>
              <p className="font-serif text-sm">
                This was inspired by the amazing <a href="https://github.com/zonghangoh" target="_blank" rel="noopener noreferrer" className="underline">@zonghangoh</a> for productivity when developing with MJML and Liquid at <a href="https://www.ascenda.com/" target="_blank" rel="noopener noreferrer" className="underline">Ascenda</a>.
              </p>
              <br />
              <p className="font-serif text-sm">
                I thought it might be useful to others, so I added more features to aid developing with it and open-sourced it. If you find this helpful, do give it a <a href="https://github.com/lohkokwee/mjml-liquid-preview" target="_blank" rel="noopener noreferrer" className="underline">star on GitHub</a>!
              </p>
            </div>

            <div>
              <h3 className="font-sans text-xl mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  <span className="font-serif text-sm">
                    Live <a href="https://mjml.io/" target="_blank" rel="noopener noreferrer" className="underline">MJML</a> preview with <a href="https://shopify.github.io/liquid/" target="_blank" rel="noopener noreferrer" className="underline">Liquid</a> templating support
                  </span>
                </li>
                <li><span className="font-serif text-sm">Local and shared Liquid variables</span></li>
                <li><span className="font-serif text-sm">Responsive preview with scale/overflow modes</span></li>
                <li><span className="font-serif text-sm">Auto-save functionality</span></li>
                <li><span className="font-serif text-sm">Dark mode support</span></li>
                <li><span className="font-serif text-sm">Custom viewport sizes</span></li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-xl mb-2">Usage</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><span className="font-serif text-sm">Edit MJML in the left panel</span></li>
                <li><span className="font-serif text-sm">Use the Liquid button to manage variables</span></li>
                <li><span className="font-serif text-sm">Toggle between scale/overflow modes in the preview</span></li>
                <li><span className="font-serif text-sm">Use the viewport selector for different screen sizes</span></li>
                <li><span className="font-serif text-sm">Enable auto-save to persist your changes</span></li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
} 