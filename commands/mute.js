const messageContentParsing = require('../helper-modules/message-content-parsing');
const permissions = require('../helper-modules/permissions');

module.exports = {
    name: 'mute',
    description: 'mute user a user',
    usage: '[user_to_unmute]',
    args: true,
    guildOnly: true,
    execute(message, args) {
        mute(message, args);
    },
};


function mute(message, args) {

    const { client, guild, member } = message;

    if(args[0]) {
        if(!member.hasPermission(permissions.muteUsersVoice)) {
            message.author.send('Don\'t have the right permissions to mute');
            return message.delete();
        }

        const userMentioned = messageContentParsing(args[0]);
        const userToMute = client.users.get(userMentioned);
        if(!userToMute) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        else if(userToMute.id === guild.ownerID) {
            return message.reply('Can not mute owner');
        }
        const memberToMute = guild.member(userToMute);

        if(!memberToMute) return message.reply('User is not in this server');

        return memberToMute.setMute(true);
    }
}
