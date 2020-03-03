const permissions = require('../helper-modules/permissions.js');
module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    guildOnly: true,
    execute(message, args) {
        reloadCommand(message, args);
    },
};


function reloadCommand(message, args) {
    const { guild, member } = message;
    if(guild.ownerID !== member.id && !member.hasPermission(permissions.admin)) return;

    if(!args.length) {
        return message.author.send(`Didn't pass a command to reload, ${message.author}`);
    }

    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName);

    if(!command) {
        return message.author.send(`There is no command with that name \`${commandName}\`, ${message.author}`);
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];

    try {
        const newCommand = require(`./${commandName}.js`);
        message.client.commands.set(newCommand.name, newCommand);
    }
    catch (error) {
        console.log(error);
        message.author.send(`Error reloading command: \`${commandName}\``);
    }

    message.author.send(`Command \`${commandName}\` reloaded`);
    return message.delete();
}