// Require the necessary discord.js classes
require("dotenv").config();

const client = new Discord.Client();
client.once("ready", () => {
  console.log("Ready! Logged in !");
});

client.on("message", async (message) => {
  if (message === "ping") {
    console.log("pongx");
  }
});

const args = process.argv.slice(2);
console.log("token is", args[0]);
client.login(args[0]);
