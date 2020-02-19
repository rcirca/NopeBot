const message_content_parsing = require('../HelperModules/message-content-parsing');

module.exports = {
    name: 'mute',
    description: 'Premitive way to mute someone, deletes their message as it gets displayed',
    usage: '[mention user]',
    execute(message, args) {
        muteUser(message, args);
    },
};

function muteUser(message, args) {
    if(args[0]) {
        const userMentioned = message_content_parsing(args[0]);
        const user = message.client.users.get(userMentioned);
        if(!user) {
            return message.reply('Please use a proper mention if you want to mute someone');
        }
        // if this really was a way to mute someone, we'd want a better way storing it and having multiple people muted
        // most likely creating a collection within discord that we add to in a dictionary, possibly a database as well to persist lol
        return user.id;
    }
}