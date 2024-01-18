const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("xxoo").setDescription("xxoo"),
  async execute(interaction) {
    await interaction.reply(
      "hey babe, welcome to this channel. I made a bot for us to log our daily tasks more easily. \n \n I'm starting to feel like this is kind of silly because I spent the nights of this whole week on it. \n Try typing **/log**, enter the information, open the Google Sheet, and see what happens. You see this in English because I don't know how to 用中文这么客气的跟你说这些. \n \n Tell me your thoughts, and we can make it better!"
    );
  },
};
