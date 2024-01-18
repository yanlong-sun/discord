const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tv")
    .setDescription("生成小宝和爱一帆搜索结果"),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("tvModal")
      .setTitle("搜索关键字");
    const keyword = new TextInputBuilder()
      .setCustomId("keyword")
      .setLabel("KeyWord")
      .setPlaceholder("莫蒂和瑞克")
      .setValue("莫蒂和瑞克")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);
    // action row only holds one text input
    const keywordRow = new ActionRowBuilder().addComponents(keyword);
    // add input to the modal
    modal.addComponents(keywordRow);
    // show the modal to the user
    await interaction.showModal(modal);
  },
};
