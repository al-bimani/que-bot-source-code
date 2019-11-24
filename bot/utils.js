module.exports = {
    /**
     * 
     * @param {String} locale default "en"
     * @param {String} id 
     * @returns {String} command category
     * @example getCat("en", "INFO") // info
     */
    getCat(locale="en", id) {
        const cats = require(`./locale/${locale}/cats`);
        return cats[id];
    },
    /**
     * 
     * @param {String} locale default "en"
     * @param {String} id 
     * @returns {String} command name
     * @example getName("en", "PING") // ping
     */
    getName(locale="en", id) {
        const names = require(`./locale/${locale}/names`);
        return names[id]
    },
    /**
     * 
     * @param {String} locale default "en"
     * @param {String} id 
     * @returns {String} command usage
     * @example getUsage("en", "BAN") ban [user] <days> <reason>
     */
    getUsage(locale="en", id) {
        const usages = require(`./locale/${locale}/usages`);
        return usages[id]
    }
}