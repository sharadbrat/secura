export function copyTextToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0.000001';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let isSuccess = false;

    try {
      isSuccess = document.execCommand('copy');
    } catch (err) {
      isSuccess = false;
    }

    document.body.removeChild(textArea);
    return Promise.resolve(isSuccess);
  }

  return navigator.clipboard.writeText(text)
    .then(() => true)
    .catch(() => false);
}
