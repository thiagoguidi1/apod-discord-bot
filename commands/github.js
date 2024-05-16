const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("github")
		.setDescription("Retorna um link para o Github do meu criador."),
	async execute(interaction) {
		await interaction.reply("Acesse minha documentação: _https://github.com/thiagoguidi1/apod-discord-bot_");
	},
};