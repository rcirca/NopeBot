module.exports = {
    name: 'ping',
    description: 'check latency of bot and API',
    execute(message) {
        message.channel.send('...')
            .then(msg => msg.edit(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ping)}ms`))
            .catch(console.error);
    },
};

