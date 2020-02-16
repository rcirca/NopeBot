module.exports = {
    name: 'time',
    descritpion: 'Relays bot local time',
    execute(message) {
        getTime(message);
    },
};

function getTime(message) {
    const date = new Date();
    let hours = date.getHours();

    if(hours > 12) {
        hours = hours - 12;
    }

    const minutes = date.getMinutes();

    return message.reply(`Time is: ${hours}:${minutes}`);
}
