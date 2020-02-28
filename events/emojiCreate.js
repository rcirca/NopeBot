module.exports = (client, emoji) => {
    if(!client.notifyNewEmoji || !client.notifyChannelOfEmoji) return;


    console.log(emoji.name);
    client.notifyChannelOfEmoji.send('New emoji added:');
    client.notifyChannelOfEmoji.send(`${emoji}`);

};