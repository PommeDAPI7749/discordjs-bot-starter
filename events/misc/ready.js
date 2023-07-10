module.exports = {
    name: 'ready',
    once: true,
    async run(client) {
        console.log("\n\n-----------------------------------------------------".green);
        console.log("\n🎉 The bot is connected to Discord and operational 🎉".green);
        console.log("\n-----------------------------------------------------".green);
        console.log();
    }
}