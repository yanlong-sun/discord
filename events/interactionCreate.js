const { Events } = require("discord.js");
const { getTask, addTask } = require("../util/gsOperation.js");
const logger = require("../util/logger.js");

const isValidDateFormat = (date) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  logger.info(`is Date ${date}, valid? ${dateFormatRegex.test(date)}`);
  return dateFormatRegex.test(date);
};

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
      if (!isValidDateFormat(date)) {
        await interaction.reply({
          content: `Submission was FAILED! \n ${date} is not a valid date`,
        });
        return;
      }
      try {
        await addTask(date, id, log);
      } catch (error) {
        await interaction.reply({
          content: `Submission was FAILED! ${error}`,
        });
      }
      await interaction.reply({
        content: `${user} submitted: \n \n ${date} \n ${log}`,
      });
    }
    if (interaction.isModalSubmit() && interaction.customId === "tvModal") {
      const keyword = interaction.fields.getTextInputValue("keyword");
      const encodedKeyword = encodeURI(keyword);
      await interaction.reply({
        content: `https://www.iyf.tv/search/${encodedKeyword} https://xiaoxintv.net/index.php/vod/search.html?wd=${encodedKeyword}&submit= ,`,
      });
      return;
    }
    // 监听 slash command
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      logger.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      logger.error(error);
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
