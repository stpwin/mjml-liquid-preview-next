'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { JSONEditor } from '../liquid/json-editor';
import useMJMLProcessor from '@/hooks/use-mjml-processor';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { STORAGE_KEYS } from '@/lib/constants';

interface ViewTemplateProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTemplate({ isOpen, onOpenChange }: ViewTemplateProps) {
  const [value, setValue] = useState('');
  const storageKey = STORAGE_KEYS.LOAD_TEMPLATE;
  const defaultTemplate = {};
  const [storedTemplate, , reloadValue] = useLocalStorage<
    Record<string, unknown>
  >(storageKey, defaultTemplate);
  const { content } = useMJMLProcessor();

  useEffect(() => {
    reloadValue()
  }, [value, content])

  useEffect(() => {
    const templateBase = {
      metadata: storedTemplate.metadata,
      content,
    };
    if (isOpen) {
      setValue(JSON.stringify(templateBase));
    }
  }, [isOpen, content, storedTemplate]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className={cn(
          'transition-all duration-300 sm:max-w-none',
          'w-[400px] sm:w-[540px]'
        )}
      >
        <SheetHeader>
          <SheetTitle>{'Template JSON'}</SheetTitle>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='border rounded-md'>
            <JSONEditor
              value={value}
              onChange={setValue}
              isReadonly={true}
              height='900px'
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
