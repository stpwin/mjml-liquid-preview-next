interface CopyToClipboardOptions {
  onCopyStart?: () => void;
  onCopySuccess?: () => void;
  onCopyError?: (err: unknown) => void;
  onCopyComplete?: () => void;
  toastMessage?: string; 
  showToast?: boolean;
  toast?: (props: { description: string; variant: "success" | "destructive" }) => void;
  resetDelay?: number;
}

export async function copyToClipboard(
  data: string, 
  options: CopyToClipboardOptions = {}
) {
  const {
    onCopyStart,
    onCopySuccess,
    onCopyError,
    onCopyComplete,
    toastMessage,
    showToast = true,
    toast,
    resetDelay = 1000
  } = options;
  
  try {
    if (onCopyStart) onCopyStart();
    
    await navigator.clipboard.writeText(data);
    
    if (onCopySuccess) onCopySuccess();
    
    if (showToast && toast && toastMessage) {
      toast({
        description: toastMessage,
        variant: "success",
      });
    }
  } catch (err) {
    console.error("Failed to copy text: ", err);
    
    if (onCopyError) onCopyError(err);
    
    if (showToast && toast) {
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard",
      });
    }
  } finally {
    if (resetDelay > 0 && onCopyComplete) {
      setTimeout(() => {
        onCopyComplete();
      }, resetDelay);
    }
  }
}
