// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { config } = require("dotenv");
require("dotenv").config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("messageCreate", async (message) => {
  // if (message.author.bot) return; // 忽略其他机器人
  // if (!message.guild) return; // 确保消息来自服务器
  // const args = message.content.trim().split(/ +/);
  const args = message.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const content = args.join(" ");
  if (command === "-update") {
    console.log(content);
  }
});

const args = process.argv.slice(2);
console.log("token is", args[0]);
client.login(args[0]);
