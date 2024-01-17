const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // 监听提交动作
    if (interaction.isModalSubmit() && interaction.customId === "logModal") {
      const user = interaction.user.userName;
      const date = interaction.fields.getTextInputValue("dateInput");
      const log = interaction.fields.getTextInputValue("logInput");
      await interaction.reply({
        content: `${user}'s submission was received successfully: \n ${date} \n ${log}`,
      });
      return;
    }
    // 监听 slash command
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
