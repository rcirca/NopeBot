const { prefix } = require('../config.json');
const messageContentParsing = require('../helper-modules/message-content-parsing');
module.exports = {
    name: 'habla',
    description: 'Unmute user or get a list of users who are muted',
    usage: '[user_to_unmute]',
    altUsage: true,
    guildOnly: true,
    execute(message, args) {
        unmute(message, args);
    },
};


function unmute(message, args) {
    if(args[0]) {
        const { member } = message;
        console.log('Try to unmute user');
        if(message.author.id !== message.guild.ownerID && !member.roles.find(p => p.name === 'LWD' || p.name === 'DJ' || p.name === 'Mod')) return;

        console.log('Is owner or has role to unmute');

        const userMentioned = messageContentParsing(args[0]);
        const user = message.client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }

        const deletedUser = message.client.mutedUsers.delete(user.id);
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
    const { mutedUsers } = message.client;

    if(!message) return;
    if(mutedUsers.size == 0) {
        console.log(mutedUsers.size);
        message.author.send('No users are muted currently');
    }
    else {
        console.log(mutedUsers.size);
        data.push('List of users muted: ');
        data.push(mutedUsers.map(mu => mu.username).join(', '));
        data.push(`\n you Can use \`${prefix}habla @[username]\` to unmute that user`);
        message.author.send(data, { split: true });
    }
    console.log('deleting message');
    return message.delete();
}