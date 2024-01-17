const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");

const today = new Date().toJSON().split("T")[0];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription("Log your daily task"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("logModal")
      .setTitle("Daily Log");
    // add components to modal
    // create the text input components
    const date = new TextInputBuilder()
      .setCustomId("dateInput")
      .setLabel("Date")
      .setPlaceholder("Enter the date")
      .setValue(today)
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const log = new TextInputBuilder()
      .setCustomId("logInput")
      .setLabel("Task Details")
      .setPlaceholder("Enter the task")
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(1_000)
      .setRequired(true);

    // action row only holds one text input
    const dateRow = new ActionRowBuilder().addComponents(date);
    const logRow = new ActionRowBuilder().addComponents(log);
    // add input to the modal
    modal.addComponents(dateRow, logRow);
    // show the modal to the user
    await interaction.showModal(modal);
  },
};
