const messageContentParsing = require('../helper-modules/message-content-parsing');
const permissions = require('../helper-modules/permissions');

module.exports = {
    name: 'mute',
    description: 'mute user a user',
    usage: '[user_to_unmute]',
    guildOnly: true,
    execute(message, args) {
        mute(message, args);
    },
};


function mute(message, args) {

    if(!message) return;

    const { member } = message;
    if(!member) return;

    if(args[0]) {
        if(!member.hasPermission(permissions.manageMessages)) return;

        const userMentioned = messageContentParsing(args[0]);
        const userToMute = message.client.users.get(userMentioned);
        if(!userToMute) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        else if(userToMute.id === message.guild.ownerID) {
            return message.reply('Can not mute owner');
        }
        const memberToMute = message.guild.member(userToMute);

        if(!memberToMute) return message.reply('User is not in this server');

        const mutedRole = message.guild.roles.find(r => r.name === 'Muted');

        if(!mutedRole) return message.reply('Did not find role');

        memberToMute.addRole(mutedRole).catch(console.error);
    }

}
