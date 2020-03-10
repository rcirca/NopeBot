const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'List commands available',
    usage: '[command name]',

    execute(message, args) {
        if(!args.length) {
            sendCommandsToUser(message);
        }
        else {
            sendUsageOfCommandToUser(message, args);
        }

    },
};

function sendCommandsToUser(message) {
    const data = [];
    const { commands } = message.client;

    if(!message) return;

    data.push('List of commands');
    data.push(commands.map(command => command.name).join(', '));
    data.push(`\nYou can use \`${prefix}help [command name]\` to get info on specific command`);

    return message.author.send(data, { split: true })
        .then(() => {
            if(message.channel.type === 'dm') return;
            message.reply('Send a direct messaged with all available commands');
        })
        .catch(error => {
            console.error(`Could not DM to ${message.author.tag}`, error);
        });
}

function sendUsageOfCommandToUser(message, args) {

    const data = [];
    const { commands } = message.client;
    const name = args[0].toLowerCase();
    const command = commands.get(name);
    console.log(`${name}`);
    if(!command) {
        return message.reply('Command does not exist');
    }

    data.push(`**Name:** ${command.name}`);

    if(command.description) data.push(`**Description:** ${command.description}`);
    if(command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
    if(command.altUsage) data.push(`**Alternative Usage:** ${prefix}${command.name} ${command.alternUsage}`);

    message.channel.send(data, { split: true });
}