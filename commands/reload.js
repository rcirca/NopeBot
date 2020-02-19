module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    execute(message, args) {
        reloadCommand(message, args);
    },
};


function reloadCommand(message, args) {
    if(!args.length) {
        return message.channel.send(`Didn't pass a command to reload, ${message.author}`);
    }

    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName);

    if(!command) {
        return message.channel.send(`There is no command with that name \`${commandName}\`, ${message.author}`);
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];

    try {
        const newCommand = require(`./${commandName}.js`);
        message.client.commands.set(newCommand.name, newCommand);
    }
    catch (error) {
        console.log(error);
        message.channel.send(`Error reloading command: \`${commandName}\``);
    }

    message.channel.send(`Command \`${commandName}\` reloaded`);
}