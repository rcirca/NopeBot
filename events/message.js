const { prefix } = require('../config.json');

module.exports = (client, message) =>{

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && message.channel.type !== 'text') return;

    if(command.args && !args.length) {
        let reply = `Missing arguments ${message.author}`;
        if(command.usage) {
            reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    try{
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('Error executing command');
    }
};