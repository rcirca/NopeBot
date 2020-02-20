const messageContentParsing = require('../helper-modules/message-content-parsing');
module.exports = {
    name: 'habla',
    description: 'remove someone that got muted by primitive-mute',
    usage: 'list of who is muted',
    guildOnly: true,
    execute(message, args) {
        unmute(message, args);
    },
};


function unmute(message, args) {
    if(message.author.id !== message.guild.ownerID && !message.member.roles.some(p => p.name === 'LWD')) return;

    if(args[0]) {
        const userMentioned = messageContentParsing(args[0]);
        const user = message.client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }

        const deletedUser = message.client.mutedUsers.delete(user.id);
        if(!deletedUser) {
            return message.reply(`Unmuted ${user}`);
        }
    }
}