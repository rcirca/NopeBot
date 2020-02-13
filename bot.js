require('dotenv').config();

const fs = require ('fs');
fs.readdir('./events/', (err, files) =>{
    files.forEach(file =>{
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    });
});

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg =>{
    if(msg.content === 'ping')
        msg.reply('pong');
});

client.login(process.env.DISCORD_TOKEN);