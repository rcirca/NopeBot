const { token } = require('./config.json');

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

client.login(token);