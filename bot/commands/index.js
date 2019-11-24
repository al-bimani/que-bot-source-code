require("dotenv").config()

const fs = require("fs");
const path = require("path");
// for debug 
const nodeDebugger = require("debug")
const debug = nodeDebugger("Commands:")

const commandsPath = path.join("bot", "commands")

const
    CMD_NOT_EXP = "empty export found, skipping %o",
    CMD_MISS_PROP = "command exportd at %o missng property %o",
    CMD_IT_LOD = "loading commands from %o",
    CMD_IT_SCUS = "successfuly added command %o",
    INDEX = "index",
    NAME = "name",
    STRING = "string"

var
    commands = [],
    cwd,
    files,
    filePath,
    fileInfo

const readDirCommands = (dirname) => {
    cwd = process.cwd()
    files = loadFiles(cwd, dirname)
    return files.map(file => {
        if (file.split(".").shift() === INDEX) return
        filePath = path.join(dirname, file)
        fileInfo = fs.statSync(filePath)
        if (fileInfo.isDirectory()) readDirCommands(filePath)
        else addCommand(cwd, dirname, file)
    })
}

const loadFiles = (cwd, dirname) => {
    debug(CMD_IT_LOD, dirname);
    return fs.readdirSync(path.join(cwd, dirname));
}

const addCommand = (cwd, dirname, file) => {
    const command = require(path.join(cwd, dirname, file))
    // to make sure this file not empty
    const isExportedEmpty = Object.entries(command).length === 0
    if (isExportedEmpty) return debug(CMD_NO_EXP, file);
    // chack is something missing e.g. command name
    [NAME].map((requirement) => {
        const missingProp = typeof command[requirement] !== STRING
        if (missingProp) debug(CMD_MISS_PROP, file, requirement)
        else {
            commands.push(command);
            debug(CMD_IT_SCUS, command.name)
        }
    })
}

readDirCommands(commandsPath)
module.exports = commands;