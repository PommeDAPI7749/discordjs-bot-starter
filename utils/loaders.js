const { glob } = require('glob');
const { REST, Routes } = require('discord.js');

module.exports = async client => {
    console.log('\n\n\u0009\u0009Started loading events'.grey)
    await loadEvents(client)

    console.log('\n\n\u0009\u0009Started loading commands'.grey)
    await loadCommands(client)
}

async function loadEvents(client) {
    const eventFiles = await glob(`${process.cwd()}/events/*/*.js`);
    let counter = 0;

    for (const eventFile of eventFiles) {
        const event = require(eventFile);
    
        if (!event.name) {
            console.log("⚠️ - Event not ready ->".yellow, eventFile);
            counter++
            continue;
        }
    
        if (event.once) {
            client.once(event.name, (...args) => event.run(client, ...args));
        } else {
            client.on(event.name, (...args) => event.run(client, ...args));
        }
    
        console.log("✅ - Event ready ->".green, event.name);
    }

    if (counter) {
        console.log("WARNING".bgYellow, "-".yellow, counter.toString().yellow, "events didn't loaded properly".yellow)
    } else {
        console.log("SUCCESS".bgGreen, "- All events are ready !".green)
    }

}

async function loadCommands(client) {

    const commandFiles = await glob(`${process.cwd()}/commands/*/*.js`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    const commands = [];

    for (commandFile of commandFiles) {
		const command = require(commandFile)

		if (!command.help || !command.help.name || !command.help.description) return console.log("⚠️ - Command not ready ->".yellow, commandFile)
	
		commands.push(command.help)
		client.commands.set(command.help.name, command)
		console.log("✅ - Command detected ->".green, command.help.name)
	}
	
	try {
		console.log('⏳ - Refreshing application (/) commands...'.grey);
		
		await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });
		
		console.log("SUCCESS".bgGreen, "- Successfully reloaded application (/) commands.".green);
	} catch (error) {
        console.log("WARNING".bgYellow, "-".yellow, "application (/) commands didn't loaded properly".yellow)
        console.log(error)
	}

}