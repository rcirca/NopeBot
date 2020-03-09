module.exports = (client, emoji) => {

    if(!emoji || !emoji.guild) return;

    const serverConfig = client.servers.getServerConfig(emoji.guild);
    const { notifyNewEmoji, notifyChannelOfEmoji } = serverConfig;
    if(!notifyNewEmoji || !notifyChannelOfEmoji) return;


    console.log(emoji.name);
    notifyChannelOfEmoji.send('New emoji added:');
    notifyChannelOfEmoji.send(`${emoji}`);

};