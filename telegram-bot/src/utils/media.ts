import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

// Download file from Telegram
export async function downloadTelegramFile(bot: TelegramBot, fileId: string): Promise<Buffer | null> {
  try {
    const file = await bot.getFile(fileId);
    const url = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Failed to download file:', error);
    return null;
  }
}

// Convert buffer to base64
export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}
