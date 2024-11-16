const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUNyalgwM2ZqUUFoTU0yeEZPNjRZWFYrNFprQUU4WUpLaTgyYXpZRVIyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2JBZVI3bkcwZ0RQSzN6RlVwaG5QclNqbkI5UWJHdHVQelpPZWR5anMxST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQnR2WEtucytObHVYOGYvczhSUmp0VzFGMHdRenBweWRObmNvbVNwYVhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXL3hNWnE5U1FOTURYeWRRa09yU3Y4bC9PdDk0QlNvczJKUTN4bVpQTGpvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllCaHVwYUw3TUFOMVNxa2ZmZU1pZVI3blQrS05NUU9LeHBVZGwxVEtqM289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im05dzdXUnZ6TUJsQnM2SHUxRlg5WGhDbTM3eWlObWJCa3BoTDltaVNmM0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NRRWhOcVpEQ0tlamx4SXN0bU9OQUNObjljK1UvZ002UlJwdGRmb1ZGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNWRoUGRibFNxVk9xTnczeDl4TUs1Z284c1dOSTZnN1BIcUt1QTB5cmhqVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR2VC9ldzlDU0xMTWVhY01HVzBQUFc4UjY3bis4RmxjVkg4a3lULy9sUGRDRFgyUlVVTFZFcm9TN0VtWGZRNHFtQ1ZLWWFhd1RzMXlrRS96L1JMK2lnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQzLCJhZHZTZWNyZXRLZXkiOiI2ZVNRQXNjY1FROHI0THY0QlJPdnQrSUNlVVVaRnJtZjdnODUxVHNmbklvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrdGFoNUlyRFR6Q3liRnVhekJRVUlRIiwicGhvbmVJZCI6ImIxODAwY2I0LTBjN2YtNDJiMS04Y2I5LTA5M2MwOTc2Nzk4MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJMGhjOUFjV211enBFTzYyd25hRnZNZzF0cUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGZVY1ZnZU9ZZDNYVWdPV2dpc1hvY2FNQzgwPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpTWjU3MVpSIiwibWUiOnsiaWQiOiI5NDcwNjM2OTcyODo4OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLDl+KAouKAovCdmb3htIfhtJvKnOG0jcmqybThtIAg8J2QjvCdmbXwnZmy4oCi4oCiw5cifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01XVS9KVUVFUHp4NHJrR0dBMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5VK2h1d2x3SjBUWWNiK1ZJN2N4aUIxeXZQcUIxZFE1VC9DSXFxWUNOSFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJZenAyK0NtNmREZUFTMjU3RjhROXlkN1J2c21TS2l2T0lhVVZMem5RM2pteTRpWno0T09FendtZGZ1cmdrS1BNUVd6OEhKcEgzcERyM1o2VlRmbkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUY3VYa2o1dWEwUE44OWdzS0RodFhhTGpwb0RBZmlzTU9oWTFQYjhucEQzd3BkSWFmVXVGNTBETG1lcTJsMnc2OHVnWnJncXJobEFmcnlOM3JPREpoUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzA2MzY5NzI4Ojg4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQloxUG9ic0pjQ2RFMkhHL2xTTzNNWWdkY3J6NmdkWFVPVS93aUtxbUFqUjAifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE3NzA2MzV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  dexter  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94706369728",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
