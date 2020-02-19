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
    hours = String(hours).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');


    return message.channel.send(`Time is: ${hours}:${minutes}`);
}
