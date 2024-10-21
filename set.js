const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE44NldqMlF0TGR0Vzk4aE9VazU1V2w2TVlPMVdORlUyMzlwQVUzWTBHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQkViWmtmN01ZZXhuNHdQU0ZMeWlvUTdnRVdyYVdybXZkUmRlQS8xcGx6az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTHU2Y20zNmpYWC9nYXgrdDZtM1ZGcHh4bmo2c3lPcDg5STJvTEV2VUhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDUEc2UElxc0lNNHhQS2Z2Q0I2cjA2dUR1Q1RRYzBhMHY5SjBiUHVWdFVjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVCTXR0dGphd1lLYXpQYnQzZWh1QnRWcm9ISGlWdG1aaWRDaU0rSFl6VkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpvdDY0SG1ZcHNjOVN2Y1ZWU3JUaERvTzlST3BhaEg3bmlQaXVIQkVqazA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUdJV3RYWkI3cmk0ZFViQW84QWRCSVB6UmFyTjgwcWxwNVQxZ29IaGgwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEVVV3F2STZPS3pabVVvcmxaMVk1dXJYeUFwcWF1c0ZyR0JtQitpMTd5ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdmaUtXTTlaeU04Y0tuakVkcHk2dUZBVG1RUENMQ2lwdE1QamxDVG5XMGV2RVhTRlNOT2xzUTV5U2tlSS9kZURCVGM3VjlNQWZHZXhwcmIrR2JwempBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkyLCJhZHZTZWNyZXRLZXkiOiJPU2tMaDdEOWMzcmY3NkFNbnl1bDIrTmtxcVlQNm1pSmZQdDBGS3lMclc0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwNTU2NTM4NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwN0ZCMEIwOUI4RTUyOUExMTQ0NTg2ODk4NjZGNzg0NSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI5NTI5NDU1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MDU1NjUzODRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRDg3MzY2ODlDOUMzMjczODg2Q0QxREQ1ODVDQTA5QzQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyOTUyOTQ1Nn1dLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiNF9YYUYtWFVRZEcyRXRENVN1eDN5ZyIsInBob25lSWQiOiI4NTkxYTM4Yy0yNWQ1LTQyOTAtOTI1Ni1iYzQ0MTUxNGU5ZDAiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGozV0l3TkxFaHdlaWYwcTBNT3hXK0hXK1pJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikk4UmxIUzJyaUdBeEtUMmRKUEhGVHRNcjRpWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJQMkI4M1JIRiIsIm1lIjp7ImlkIjoiMjU0NzA1NTY1Mzg0OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQWxpY2UifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tHc3Jlc0NFT0NNMnJnR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Iloybnd5eDI4M2FzbXN0YmFQN0lKdFp3aHhIajFtZ1JBSjhKRTFUZEJpR3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRuV2hZMCtNTDJkblFZK2tFcHovd2N5UnJGMG04TFFPYVYxbThRSlJUUmhjUWt5ejROem9vOHgxaHNtR2VybzlwZDN1a2h1M1hzTUswQ1BZQ01FbkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0djRndms4NmpSVzJnYnZURjg2aHdkYmJ1MTN4SFN6VmEvWGsvZ3hlYUFkZFlyQmI2TFAreGlQWXk2d1Z2SGxuK2tLaFNKVVRva05wVkdPenEwbzVodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcwNTU2NTM4NDo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldkcDhNc2R2TjJySnJMVzJqK3lDYldjSWNSNDlab0VRQ2ZDUk5VM1FZaHIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk1Mjk0NTQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUHRMIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐂𝐚𝐬𝐞𝐲𝐫𝐡𝐨𝐝𝐞𝐬",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254786273945",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ggIBWn4.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
