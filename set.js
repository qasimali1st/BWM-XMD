const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0VZUVhZKzBlb0pkOTd3QnZLbVlYaWd2MHZyYXU2WklvTThvQ09CdnJYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0MxUVVteGtjeTEzM3RFTDBxdkh6bEFuUG5Yei9FZlEvbVNvWGJPVUxWYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnRWVGZ2FDcExuL0g4aWZON0lRVklaYVcxWVFzSFh4ZFZOZXZXZm5jNVZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoQlFXeVJ6R29JNi9MU2JmelI3cEd2Ylg5Z2syTzNvSmFOVUU3cGtIWmd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndERWtZVnNUYWx0ZVlSN1dZL2JQa2xQZXk4STNaTHpHWEdTWlBmNUJEazA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikw0ZlI5dm1DcnIwZk05R0dLU2pYNzA1TmxXeERGSnptUEdUbU5DblVTbFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU8vYTBuZ24zUG4vcStBUC9KMDc2YmpkV0hGc2NHTW1jdDNHUXFhQW5XVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFZUXlvaFdPeUU0TmQxUGxHY2paYkMwTjBtL1MxUHR1WFF5dWplNmRHbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImF2RmJNWWh6a0RSRlppdkFRZDU2SmEyMGJ4Mm5PaTRIVjhxeE1sc3V4cWhjaVR3c1pzMmxicUFrUGhPYXRNQlZnT3FDUHBUb091MG10WjRnZEc5Y0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IlVIU0dxNUZOTHFua2RkTHBJVHkyUjFMbEtBM01Ndm0wWWs1dWo4Q3U3dDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzNDQ0ODQ0MDYwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBBNkRGOUFCN0Y1MzMwQTBFM0U2MkNFRjJGNENCRjIzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjIyMDY4Nzh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkyMzQ0NDg0NDA2MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RENFNEJFQkNERDYzNjhFQ0U3MTU0MjUxRTFBMkM1QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMjA2ODc4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrQ3RFN1hNZVF1ZXN1ZHZ5SnJNQVBRIiwicGhvbmVJZCI6IjdhYTEzOGE2LTI4ZWMtNDliYS1hZjI3LTIwMzA4YmY1ODMwZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0VVBleEhNaUZ5R0JXb0RwSmZHS2g1bG1xVXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3VqN0NNZlRBTXlWbGl2ay9nSlNKcTN4bkJzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNKOVhKOUNYIiwibWUiOnsiaWQiOiI5MjM0NDQ4NDQwNjA6NDVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU3RyYW5nZXIg4q2QIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKanQ4WlFIRUpDVm03VUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqU3NobUxYdUliaWlXSjk4UmxGbFlpYi9BTUVVZjJ4S1kreklnODcwcXlFPSIsImFjY291bnRTaWduYXR1cmUiOiJQQTdNTnZqNkQwWlQwbVA2c2lDYUZ1UVU4YTBvazFZR1FHWFJvSUpKSEpETW54QlBWeTZVTEl3QWlRczVRenFQTlJaVWg5RHRPWEQrakpqOFEvZkFCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQmh5MXI0L0s5K3NpVUhsM0ExUVRuTDlkdDFxa1F2alB5TEptRXYzL3IrTVVCeXA4SWVNV21pT1phclRhTWZwa1JIMjRlTlVoUHhFWm5PRzFNbTZZQ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjM0NDQ4NDQwNjA6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWTBySVppMTdpRzRvbGlmZkVaUlpXSW0vd0RCRkg5c1NtUHN5SVBPOUtzaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjIwNjg3NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOdEMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "STRANGER",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923444844060",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'KHARAL-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/d6b48bca7758119ef0652.jpg',
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
