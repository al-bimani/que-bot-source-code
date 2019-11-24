module.exports = {
    name: "PING",
    usage: "PING_USAGE",
    cat: "INFO",
    /**
     * @param {import('eris/lib/Client')} client
     */
    exe(message, client) {
        let shard = message.channel.guild ? message.channel.guild.shard : client.shards.get(0);
        let latency = Math.round(shard.latency);
        message.channel.createMessage(`**${message.author.username}**, Pong!\nTime taken: \`${Math.round(Date.now() - message.timestamp)}\` ms | Shard ${shard.id}: \`${latency}\` ms`);
    }
}
