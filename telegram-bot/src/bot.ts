import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config({ path: "../.env" });
dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

if (!TOKEN) {
  console.error("❌ TELEGRAM_BOT_TOKEN is required!");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

console.log(`
╔══════════════════════════════════════════╗
║   🏋️  FitCoach AI - Telegram Bot        ║
║   Bot is running...                      ║
║   Backend: ${BACKEND_URL}                ║
╚══════════════════════════════════════════╝
`);


// EXPRESS SERVER (Render ke liye)
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🏋️ FitCoach Telegram Bot Running");
});

app.listen(PORT, () => {
  console.log(`🌐 Server listening on port ${PORT}`);
});


// Backend helper
async function sendToBackend(message: string, telegramUserId: string): Promise<any> {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/chat/message`, {
      message,
      userId: `tg_${telegramUserId}`,
      channel: "telegram",
    });

    return response.data;
  } catch (error: any) {
    console.error("Backend error:", error.message);
    return { response: "⚠️ Sorry, I'm having connection issues. Please try again!" };
  }
}


// Text cleaner
function cleanText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,3}\s(.*)/g, "$1")
    .replace(/<[^>]*>/g, "")
    .slice(0, 4000);
}


// /start
bot.onText(/\/start/, async (msg) => {
  const name = msg.from?.first_name || "there";

  const welcome =
    `🏋️ Welcome to FitCoach AI, ${name}!\n\n` +
    `I'm your personal AI fitness coach.\n\n` +
    `Tell me about yourself or use the menu below 👇`;

  bot.sendMessage(msg.chat.id, welcome, {
    reply_markup: {
      keyboard: [
        [{ text: "🏋️ Workout Plan" }, { text: "🥗 Nutrition" }],
        [{ text: "📊 Progress" }, { text: "📅 Schedule" }],
        [{ text: "⚙️ Settings" }, { text: "❓ Help" }]
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  });
});


// /help
bot.onText(/\/help/, async (msg) => {
  const helpText =
    `❓ FitCoach AI - Help Guide\n\n` +
    `/start - Start the bot\n` +
    `/help - Show help\n` +
    `/workout - Get workout plan\n` +
    `/progress - View progress\n` +
    `/bmi - BMI calculator\n` +
    `/stats - Your stats`;

  bot.sendMessage(msg.chat.id, helpText);
});


// /workout
bot.onText(/\/workout/, async (msg) => {
  bot.sendMessage(msg.chat.id, "💪 What type of workout would you like?", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🏠 Home Workout", callback_data: "workout_home" },
          { text: "🏋️ Gym Workout", callback_data: "workout_gym" }
        ],
        [
          { text: "💪 Upper Body", callback_data: "workout_upper" },
          { text: "🦵 Lower Body", callback_data: "workout_lower" }
        ],
        [
          { text: "🔄 Full Body", callback_data: "workout_fullbody" },
          { text: "📋 Weekly Plan", callback_data: "workout_weekly" }
        ]
      ]
    }
  });
});


// CALLBACK HANDLER
bot.on("callback_query", async (query) => {
  const chatId = query.message?.chat.id;
  if (!chatId || !query.data) return;

  bot.answerCallbackQuery(query.id);

  const workoutMap: Record<string, string> = {
    workout_home: "Give me a home workout plan",
    workout_gym: "Give me a gym workout plan",
    workout_upper: "Give me upper body workout",
    workout_lower: "Give me lower body workout",
    workout_fullbody: "Give me full body workout",
    workout_weekly: "Create weekly workout plan"
  };

  const message = workoutMap[query.data];

  if (message) {
    bot.sendMessage(chatId, "⏳ Creating your workout plan...");
    const result = await sendToBackend(message, String(query.from?.id));
    bot.sendMessage(chatId, cleanText(result.response));
  }
});


// GENERAL MESSAGE
bot.on("message", async (msg) => {
  if (!msg.text) return;
  if (msg.text.startsWith("/")) return;

  const menuMap: Record<string, string> = {
    "🏋️ Workout Plan": "Give me a workout plan",
    "🥗 Nutrition": "Give me nutrition advice",
    "📊 Progress": "Show my progress",
    "⚙️ Settings": "Help me set up profile",
    "❓ Help": "Show help"
  };

  const mappedMessage = menuMap[msg.text] || msg.text;

  bot.sendChatAction(msg.chat.id, "typing");

  const result = await sendToBackend(mappedMessage, String(msg.from?.id));

  bot.sendMessage(msg.chat.id, cleanText(result.response));
});


// ERRORS
bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});