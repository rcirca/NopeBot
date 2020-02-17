const message_content_parsing = require(`../HelperModules/message-content-parsing`);

module.exports = (client, message, args) =>{
    console.log(`${message.author.username}`);
    if(message.author.username != `Circa`) return;

    console.log(`${args[0]}`);
    if(args[0]){
        const user = message_content_parsing(client, args[0]);
        console.log(`${user.username}`);
        if(!user){
            return message.reply(`Please use a proper mention if you want to mute someone`);
        }
        
        return user.id;
    }
}