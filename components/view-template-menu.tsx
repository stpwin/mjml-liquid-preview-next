import { useUIState } from '@/hooks/use-ui-state';
import { HOTKEYS, UI_STATE } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { HotkeyIconButton } from './shared/hotkeys/hotkey-icon-button';
import { FileJson } from 'lucide-react';
import { ViewTemplate } from './manage-template/view-template';

export function ViewTemplateMenu() {
  const { isOpen, onOpenChange } = useUIState(UI_STATE.VIEW_TEMPLATE);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <HotkeyIconButton
            icon={FileJson}
            hotkey={HOTKEYS.VIEW_TEMPLATE.hint}
            srText={HOTKEYS.VIEW_TEMPLATE.description}
            title={HOTKEYS.VIEW_TEMPLATE.description}
            showHotkeyOverride={isOpen}
          />
        </DropdownMenuTrigger>
      </DropdownMenu>
      <ViewTemplate isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
