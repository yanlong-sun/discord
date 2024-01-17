const {
  Events,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "log") {
    // create the modal
    const modal = new ModalBuilder()
      .setCustomId("logModal")
      .setTitle("Daily Log");
    // add components to modal
    // create the text input components
    const date = new TextInputBuilder()
      .setCustomId("dataInput")
      .setLable("Date")
      .setPlaceholder("Enter the date")
      .setValue(date.now())
      .setStyle(TextInputStyle.date)
      .setRequired(true);

    const log = new TextInputBuilder()
      .setCustomId("logInput")
      .setLabel("Task Details")
      .setPlaceholder("Enter the task")
      .setStyle(TextInputStyle.Paragraph)
      .setMinLength(10)
      .setMaxLength(1_000)
      .setRequired(true);

    // action row only holds one text input
    const dataRow = new ActionRowBuilder().addComponents(date);
    const logRow = new ActionRowBuilder().addComponents(log);
    // add input to the modal
    modal.addComponents(dataRow, logRow);
    // show the modal to the user
    await interaction.showModal(modal);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "logModal") {
    const user = interaction.user.userName;
    const date = interaction.fields.getTextInputValue("dateInput");
    const log = interaction.fields.getTextInputValue("logInput");
    await interaction.reply({
      content: `${user}'s submission was received successfully: \n ${date} \n ${log}`,
    });
  }
});
