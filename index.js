require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  // 确保消息不是来自Bot自身
  if (message.author.bot) return;

  // 你的其他消息处理逻辑
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
const args = process.argv.slice(2);
console.log("token is", args[0]);
client.login(args[0]);
