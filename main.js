// On vide la console avant de commencer
process.stdout.write('\x1B[2J\x1B[3J\x1B[H\x1Bc')

// Config des variables d'environnement
require('dotenv').config();

// Add colors in terminal
var colors = require('colors');

// Creation du client Discord
const { Client, Collection } = require('discord.js');

const client = new Client({ restRequestTimeout: 60000, intents: 69631 });
client.commands = new Collection();

require('./utils/loaders.js')(client);

// Traitement des erreurs
process.on('exit', code => console.log(`process stopped with : ${code}`))
process.on('uncaughtExeption', (err, origin) => console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origin: ${origin}`))
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDELED_REJECTION: ${reason}\n------------\n`, promise) })
process.on('warning', (...args) => colors.yellow(console.log(...args)))


// Connection a discord
client.login(process.env.DISCORD_TOKEN);