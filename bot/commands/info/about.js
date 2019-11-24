const { version, prefix } = require("../../config");
module.exports = {
    name: "ABOUT",
    usage: "ABOUT_USAGE",
    cat: "INFO",
    /**
     * @param {import('eris/lib/Client')} client
     */
    exe(message, client) {
        message.channel.createMessage([
            `:id: **I'm ${client.user.username}!**`,
            ":black_small_square: **My Authors:** albimani, Julian, NouNouDZ",
            // ":black_small_square: **My Artist:** Sprit", 
            ":black_small_square: **Library:** Eris",
            `:black_small_square: **Version:** ${version}`,
            ":black_small_square: **Official Support:** https://discord.gg/gc47R2D",
            `:black_small_square: **Info and Commands:** Use \`${prefix}help\` for a list of my commands!`,
            // ":black_small_square: **My Home**: <https://discord.gg/gc47R2D>"
        ].join("\n"));
    }
}
