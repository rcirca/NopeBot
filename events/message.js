const { prefix } = require('../config.json');

module.exports = (client, message) =>{

    if(message.author.bot) return;

    try {
        const serverConfig = message.client.servers.getServer(message.guild);
        if(serverConfig) {
            if(isUserMuted(serverConfig, message)) {
                message.delete();
                return;
            }
        }
    }
    catch (error) {
        console.log(error);
    }


    if (!message.content.startsWith(prefix)) return;

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


function isUserMuted(serverConfig, message) {
    const { servers } = message.client;
    if(!servers) return false;
    const mutedUser = serverConfig.mutedUsers.get(message.author.id);
    if(mutedUser) return true;

    return false;
}