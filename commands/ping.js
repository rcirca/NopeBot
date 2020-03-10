module.exports = {
    name: 'ping',
    execute(message) {
        message.channel.send('...')
            .then(msg => msg.edit(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ping)}ms`))
            .catch(console.error);
    },
};

