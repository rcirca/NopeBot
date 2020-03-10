const { prefix } = require('../config.json');
const messageContentParsing = require('../helper-modules/message-content-parsing');
const permissions = require('../helper-modules/permissions.js');
module.exports = {
    name: 'unmute',
    aliases: ['um'],
    description: 'Unmute chat user or get a list of users who are muted',
    usage: '[user_to_unmute]',
    altUsage: true,
    guildOnly: true,
    execute(message, args) {
        unmute(message, args);
    },
};


function unmute(message, args) {
    const { client, guild, member } = message;
    const serverConfig = client.servers.getServerConfig(guild);
    if(args[0]) {
        if(member.id !== guild.ownerID && !member.hasPermission(permissions.manageMessages)) return;

        const userMentioned = messageContentParsing(args[0]);
        const user = client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }

        const deletedUser = serverConfig.mutedUsers.delete(user.id);
        if(!deletedUser) {
            return message.reply(`Could not find user to unmute: ${user}`);
        }
        else {
            return message.reply(`Unmuted ${user}`);
        }
    }
    else {
        listMutedUsers(message);
    }
}


function listMutedUsers(message) {
    const data = [];
    const { client, guild } = message;
    const serverConfig = client.servers.getServerConfig(guild);

    if(!message) return;
    if(serverConfig.mutedUsers.size == 0) {
        message.author.send('No users are muted currently');
    }
    else {
        data.push('List of users muted: ');
        data.push(serverConfig.mutedUsers.map(mu => mu.username).join(', '));
        data.push(`\n you Can use \`${prefix}${this.name} @[username]\` to unmute that user`);
        message.author.send(data, { split: true });
    }
    return message.delete();
}