const time = require('../commands/time');
const { prefix } = require('../config.json');
const prune = require('../commands/prune');

module.exports = (client, message) =>{

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command.startsWith('time')) {
        return time(message);
    }
    else if (command.startsWith('prune')) {
        prune(client, message, args);
    }

};