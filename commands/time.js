module.exports = message =>{
    const date = new Date();
    let hours = date.getHours();

    if(hours > 12) {
        hours = hours - 12;
    }

    const minutes = date.getMinutes();

    return message.reply(`Time is: ${hours}:${minutes}`);
};
