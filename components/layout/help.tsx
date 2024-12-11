"use client"

import { HelpCircle } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"
import { useKeyboard } from "@/hooks/use-keyboard"
import { useUIState } from "@/hooks/use-ui-state"
import { UI_STATE, HOTKEYS, HOTKEY_SECTIONS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

export function HelpDialog() {
  const { isOpen, onOpenChange } = useUIState(UI_STATE.HELP)

  useHotkeys(HOTKEYS.TOGGLE_HELP, (e) => {
    e.preventDefault()
    onOpenChange(!isOpen)
  }, { enableOnFormTags: true, enableOnContentEditable: true })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <span className="font-sans text-xl">Keyboard Shortcuts</span>
          </DialogTitle>
          <DialogDescription>
            <span className="font-sans text-sm text-muted-foreground">
              Hitting <kbd className="px-2 py-1 rounded bg-muted font-mono text-xs">alt</kbd> opens up mini keywords beside the various buttons to help you navigate the app.
              I hope you find using this as fun as it was to build!
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {HOTKEY_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-sans text-lg font-semibold mb-2">{section.title}</h3>
              <div className="space-y-2">
                {section.hotkeys.map((hotkey) => (
                  <div key={hotkey.key} className="flex items-center justify-between">
                    <span className="font-sans text-sm text-muted-foreground">{hotkey.description}</span>
                    <kbd className="px-2 py-1 rounded bg-muted font-mono text-xs">
                      {hotkey.key.replace(/\+/g, ' + ')}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function HelpButton() {
  const { isOpen, onOpenChange } = useUIState(UI_STATE.HELP)
  const { isAltPressed } = useKeyboard()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onOpenChange(true)}
      className="relative"
    >
      <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
      {isAltPressed && !isOpen && (
        <span className="absolute bottom-0 right-0 text-[10px] font-mono bg-muted px-1 rounded">
          .
        </span>
      )}
    </Button>
  )
} 