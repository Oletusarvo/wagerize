export function useCopyToClipboard(contentToCopy: string, onCopy: () => void) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contentToCopy).then(onCopy);
  };

  return copyToClipboard;
}
