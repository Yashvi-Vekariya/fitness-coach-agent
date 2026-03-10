export function formatForTelegram(text: string): string {
  // Convert markdown bold to Telegram HTML bold
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/#{1,3}\s(.*)/g, '<b>$1</b>');
}

export function formatForWeb(text: string): string {
  // Keep markdown as-is for web (React will render it)
  return text;
}

export function truncateForTelegram(text: string, maxLength: number = 4000): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
