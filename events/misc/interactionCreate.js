module.exports= {
    name: 'interactionCreate',
    once: false,
    async run(client, interaction) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName)
        if (!command) return interaction.reply({ content: 'Cette commande n\'existe pas', ephemeral: true })
        
        command.execute(client, interaction)
    }
}