require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

const args = process.argv.slice(2);
console.log("token is", args[0]);
client.login(args[0]);
