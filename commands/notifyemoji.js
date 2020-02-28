module.exports = {
    name: 'notifyemoji',
    description: 'Turn on/off notification of new emojis to a channel. Have to at least turn on once with channel, to toggle, or turn it on, on different channel',
    args: true,
    guildOnly: true,
    // potential to have more than one channel
    usage: '[on/off] [tag_channel_name]',
    altUsage: true,
    alternUsage: '[on/off]',
    execute(message, args) {
        toggleNotificationNewEmoji(message, args);
    },
};


function toggleNotificationNewEmoji(message, args) {
    const { client } = message;
    const { mentions } = message;

    console.log(args[0]);
    if(args[0]) {
        if(args[0] == 'on') {
            if(mentions && mentions.channels && mentions.channels.size > 0) {
                client.notifyChannelOfEmoji = message.mentions.channels.first();
                client.notifyNewEmoji = true;
                return;
            }
            console.log(client.notifyChannelOfEmoji ? client.notifyChannelOfEmoji.name : 'no channel');
            if(client.notifyChannelOfEmoji) return client.notifyNewEmoji = true;
        }
        else if(args[0] == 'off') {
            return message.client.notifyNewEmoji = false;
        }
    }
}