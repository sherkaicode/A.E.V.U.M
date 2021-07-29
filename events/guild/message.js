module.exports = (Discord, client, message) => {
    const prefix = '-';

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLocaleLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    try {
        command.execute(client, message, args, Discord, cmd);
    } catch (err) {
        message.reply("Error doing the command");
        console.log(err);
    }
}