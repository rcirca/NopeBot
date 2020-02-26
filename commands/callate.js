const messageContentParsing = require('../helper-modules/message-content-parsing');

module.exports = {
    name: 'callate',
    description: 'Premitive way to mute someone, deletes their message as it gets displayed',
    usage: '[mention user]',
    guildOnly: true,
    execute(message, args) {
        muteUser(message, args);
    },
};

function muteUser(message, args) {
    const { member } = message;
    console.log('Check if you can mute user');
    if(message.author.id !== message.guild.ownerID && !member.roles.find(p => p.name === 'LWD' || p.name === 'DJ' || p.name === 'Mod')) return;

    console.log('User is owner, or has roles');
    if(args[0]) {
        const userMentioned = messageContentParsing(args[0]);
        const user = message.client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        else if(user.id === message.guild.ownerID) {
            return message.reply('Can not mute owner');
        }
        message.client.mutedUsers.set(user.id, user);
        console.log(`Muted ${user}`);
    }
}