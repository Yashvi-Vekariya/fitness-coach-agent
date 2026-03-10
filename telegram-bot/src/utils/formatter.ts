export function formatForTelegram(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.*?)\*/g, '<i>$1</i>')
    .replace(/#{1,3}\s(.*)/g, '<b>$1</b>')
    .slice(0, 4000);
}
