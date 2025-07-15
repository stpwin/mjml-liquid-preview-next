'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { JSONEditor } from '../liquid/json-editor';
import useMJMLProcessor from '@/hooks/use-mjml-processor';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useKeyboard } from '@/hooks/use-keyboard';
import { useToast } from '@/hooks/use-toast';
import { STORAGE_KEYS } from '@/lib/constants';

interface LoadTemplateProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoadTemplate({ isOpen, onOpenChange }: LoadTemplateProps) {
  const [value, setValue] = useState('');
  const { toast } = useToast();
  const storageKey = STORAGE_KEYS.LOAD_TEMPLATE;
  const defaultTemplate = {};
  const [storedTemplate, setStoredTemplate] = useLocalStorage<
    Record<string, unknown>
  >(storageKey, defaultTemplate);
  const { refreshTemplate, setContent } = useMJMLProcessor();
  const { isAltPressed } = useKeyboard();

  useEffect(() => {
    if (isOpen) {
      setValue(JSON.stringify(storedTemplate, null, 2));
    }
  }, [isOpen, storedTemplate]);

  const handleSave = () => {
    try {
      const parsedValue = JSON.parse(value);
      setStoredTemplate(parsedValue);

      setContent(parsedValue.content)

      refreshTemplate();
      toast({
        description: `Loaded!`,
        variant: 'success',
      });
      onOpenChange(false);
    } catch {
      toast({
        description: 'Invalid JSON format',
        variant: 'destructive',
      });
    }
  };

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
          <SheetTitle>{'Load template from master data'}</SheetTitle>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <div className='border rounded-md overflow-hidden'>
            <JSONEditor
              value={value}
              onChange={setValue}
              className='min-h-[300px]'
            />
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <Button onClick={handleSave} className='relative'>
                <Zap className='h-4 w-4' />
                <span className='font-sans'>Load</span>
                {isAltPressed && (
                  <span className='absolute mx-auto text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded'>
                    ↩
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
