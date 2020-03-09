const messageContentParsing = require('../helper-modules/message-content-parsing');
const permissions = require('../helper-modules/permissions.js');
module.exports = {
    name: 'purge',
    description: 'Purge user\'s messages',
    usage: '[user] [amount_to_purge]',
    guildOnly: true,
    execute(message, args) {
        purge(message, args);
    },
};


function purge(message, args) {
    if(args[0]) {
        const { guild, member } = message;

        if(member.id !== guild.ownerID && !member.hasPermission(permissions.manageMessages)) return;

        const userMentioned = messageContentParsing(args[0]);
        const user = message.client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        console.log(args[1]);
        if(args[1]) {
            const amount = parseInt(args[1]);

            if(isNaN(amount)) return message.reply('that doesn\'t seem to be a valid number.');
            console.log(`amount=${amount}`);
            message.channel.fetchMessages({
                limit: 100,
            }).then((messages) => {
                if(user) {
                    const filterById = user.id;
                    messages = messages.filter(m => m.author.id === filterById).array().slice(0, amount);
                }
                console.log(`${messages}`);
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
            });
        }
    }
}