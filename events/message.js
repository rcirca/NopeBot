const time = require('../commands/time');

module.exports = (client, message) =>{
    if(message.content.startsWith('$time')) {
        return time(message);
    }
};