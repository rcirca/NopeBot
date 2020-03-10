const Discord = require('discord.js');

module.exports = (client) => {
    const { commands } = client;
    const commandAliases = new Discord.Collection();
    for (const cmd of commands.values()) {
        if(cmd.aliases) {
            const { aliases } = cmd;
            for (const alias of aliases) {
                const conflictCommand = commandAliases.get(alias);
                if(conflictCommand) {
                    console.log(`conflict with ${conflictCommand} and ${cmd.name} both contain ${alias} as one of their aliases`);
                    return false;
                }
                commandAliases.set(alias, cmd.name);
            }
        }
    }
    return true;
};