const axios = require('axios');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

// dotenv
const dotenv = require('dotenv');
dotenv.config();
const { APOD_KEY, CLIENT_AVATAR_URL } = process.env;


//Requisição APOD
async function getAPOD() {
	const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${APOD_KEY}`);
	return response.data;
}

async function createEmbed(apodData) {
	const embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle(apodData.title)
		.setAuthor({ name: 'Foto astronômica do dia', iconURL: CLIENT_AVATAR_URL })
		.setThumbnail(apodData.url)
		.setImage(apodData.hdurl)
		.setDescription(apodData.explanation)
		.addFields(
			{ name: 'Data', value: apodData.date },
		)
		.addFields({ name: 'Copyright: ', value: apodData.copyright, inline: true })
		.setTimestamp(new Date())
		.setFooter({ text: 'APOD Bot', iconURL: CLIENT_AVATAR_URL });

	return embed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apod")
    .setDescription("Veja a foto astronômica do dia!"),
  async execute(interaction) {
    const apodData = await getAPOD();
    const embed = await createEmbed(apodData);
    await interaction.reply({ embeds: [embed] });
	await interaction.followUp('Esta é a Foto Astronômica do Dia. Para obter mais informações, visite https://apod.nasa.gov/apod/astropix.html');
  },
};