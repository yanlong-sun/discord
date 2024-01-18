const { Events } = require("discord.js");
const { getTask, addTask } = require("../util/gsOperation.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // 监听提交动作
    if (interaction.isModalSubmit() && interaction.customId === "logModal") {
      const user =
        interaction.user.username === "yanlong_sun" ? "Yanlong" : "Jamie";
      const id = interaction.user.username === "yanlong_sun" ? "2" : "1";
      const date = interaction.fields.getTextInputValue("dateInput");
      const log = interaction.fields.getTextInputValue("logInput");
      if (!Number.isNaN(new Date(date).valueOf())) {
        await interaction.reply({
          content: `Submission was FAILED! \n ${date} is not a valid date`,
        });
        return;
      }
      // upload to google sheet
      await addTask(data, 1, log);

      await interaction.reply({
        content: `${user} submitted: \n \n ${date} \n ${log}`,
      });
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
