const fs = require ('fs');
const { token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const ServerManager = require('./models/server-config.js/index.js');
const servers = new ServerManager.Servers();

fs.readdir('./events/', (err, files) =>{
    files.forEach(file =>{
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    });
});

client.servers = servers;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

client.login(token);