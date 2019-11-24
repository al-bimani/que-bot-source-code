require("dotenv").config();

const Eris = require("eris-additions")(require("eris"));
const commands = require("./bot/commands");

const { prefix, token } = require("./bot/config");
const { getName } = require("./bot/utils")

const fs = require("fs")
const path = require("path")

const bot = new Eris(token);

bot.on("ready", () => {
    console.log("Ready!");
    bot.commands = commands;
});

const database = JSON.parse(fs.readFileSync(path.resolve(__dirname, "placeholder.json")))

bot.on("messageCreate", (message) => {
    if (message.author.bot) return;
    const DBGuild = database.guilds[message.guild.id]
    if (message.content.indexOf(DBGuild.prefix || prefix) != 0) return
    const [commandName, ...args] = message.content.slice(DBGuild.prefix.length || prefix.length).trim().split(/ +/g);
    const command = commands.find(({ name }) => getName(DBGuild.locale, name) === commandName);
    if (!command) return;
    command.exe(message, bot)
});

bot.connect().catch(console.log);
