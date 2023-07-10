const { MessageEmbed } = require("discord.js")

module.exports = {
    help: {
      name: 'ping',
      description: 'Reponds pong',
    },
    async execute(client, interaction) {
        interaction.reply({ content: "Pong !", ephemeral: true })
    }
  }