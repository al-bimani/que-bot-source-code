const { getCat, getName } = require("../utils");

const fs = require("fs")
const path = require("path")
const database = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "..", "placeholder.json")))

console.log(database)
module.exports = {
    name: "HELP",
    usage: "HELP_USAGE",
    hidden: true,
    exe: (message, client) => {
        const locale = database.guilds[message.guild.id].locale
        if (!client.commands) return;
        const info = getCat(locale, "INFO")
        const util = getCat(locale, "UTIL")
        const response = {
            [info]: [],
            [util]: []
        }
        client.commands.map((command) => {
            if (command.hidden) return; // if command should display in help list, then.
            response[getCat(locale, command.cat)] /* category */
                .push(
                    /*  get command name by locale (translation) */
                    getName(locale, command.name)
                )

        })
        message.channel.createMessage(
            Object.keys(response).map(cat => {
                const commands = response[cat].map(command => `\`${command}\``).join(" ")
                if (!commands) return; // notic: "admin" commands all is hidden, so this category commands is empty
                return `**${cat}:** ${commands}`
            }).join("\n")
        )
    }
}
