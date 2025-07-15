import { useUIState } from '@/hooks/use-ui-state';
import { HOTKEYS, UI_STATE } from '@/lib/constants';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { HotkeyIconButton } from './shared/hotkeys/hotkey-icon-button';
import { LucideFolderOpen } from 'lucide-react';
import { LoadTemplate } from './manage-template/load-template';

export function LoadTemplateMenu() {
  const { isOpen, onOpenChange } = useUIState(UI_STATE.LOAD_TEMPLATE);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <HotkeyIconButton
            icon={LucideFolderOpen}
            hotkey={HOTKEYS.LOAD_TEMPLATE.hint}
            srText={HOTKEYS.LOAD_TEMPLATE.description}
            title={HOTKEYS.LOAD_TEMPLATE.description}
            showHotkeyOverride={isOpen}
          />
        </DropdownMenuTrigger>
      </DropdownMenu>
      <LoadTemplate isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
