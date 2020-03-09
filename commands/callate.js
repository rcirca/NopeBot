const messageContentParsing = require('../helper-modules/message-content-parsing');
const permissions = require('../helper-modules/permissions.js');
module.exports = {
    name: 'callate',
    description: 'Premitive way to mute someone, deletes their message as it gets displayed',
    usage: '[mention user]',
    args: true,
    guildOnly: true,
    execute(message, args) {
        muteUser(message, args);
    },
};

function muteUser(message, args) {
    const { client, member, guild } = message;

    const serverConfig = client.servers.getServerConfig(guild);

    if(member.id !== guild.ownerID && !member.hasRole(permissions.manageMessages)) return;

    if(args[0]) {
        const userMentioned = messageContentParsing(args[0]);
        const user = client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        else if(user.id === guild.ownerID) {
            return message.reply('Can not mute owner');
        }
        serverConfig.mutedUsers.set(user.id, user);
        console.log(`Muted ${user} on ${serverConfig.serverName}`);
    }
}