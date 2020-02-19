const message_content_parsing = require('../HelperModules/message-content-parsing');

module.exports = {
    name: 'mute',
    description: 'Premitive way to mute someone, deletes their message as it gets displayed',
    usage: '[mention user]',
    guildOnly: true,
    execute(message, args) {
        muteUser(message, args);
    },
};

function muteUser(message, args) {
    if(message.author.id !== message.guild.ownerID) return;

    if(args[0]) {
        const userMentioned = message_content_parsing(args[0]);
        const user = message.client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        else if(user.id === message.guild.ownerID) {
            return message.reply('Can not mute owner');
        }
        message.client.mutedUsers.set(user.id, user);
    }
}