module.exports = {
    name: 'prune',
    description: 'Prune the last X messages that are not 2 weeks old',
    usage: '[amount]',
    args: true,
    guildOnly: true,
    execute(message, args) {
        removeMessages(message, args);
    },
};

function removeMessages(message, args) {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
    }
    else if (amount <= 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    }

    message.channel.bulkDelete(amount, true).catch(err => {
        console.log(err);
        message.channel.send('there was an error trying to prune messages in this channel!');
    });
}