module.exports = {
    name: 'notifyemoji',
    aliases: ['ne'],
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
    const { client, guild, mentions } = message;
    const serverConfig = client.servers.getServerConfig(guild);

    console.log(args[0]);
    if(args[0]) {
        if(args[0] == 'on') {
            if(mentions && mentions.channels && mentions.channels.size > 0) {
                serverConfig.notifyChannelOfEmoji = message.mentions.channels.first();
                serverConfig.notifyNewEmoji = true;
                return;
            }
            console.log(serverConfig.notifyChannelOfEmoji ? serverConfig.notifyChannelOfEmoji.name : 'no channel');
            if(serverConfig.notifyChannelOfEmoji) return serverConfig.notifyNewEmoji = true;
        }
        else if(args[0] == 'off') {
            return serverConfig.notifyNewEmoji = false;
        }
    }
}