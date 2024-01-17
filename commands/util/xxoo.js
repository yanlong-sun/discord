const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder().setName("xxoo").setDescription("xxoo"),
  async execute(interaction) {
    await interaction.reply("xxoo");
    await wait(3_000);
    await interaction.editReply("xxoo");
  },
};
