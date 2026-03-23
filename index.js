const TelegramBot = require('node-telegram-bot-api');

// 🔴 METS TON TOKEN ICI
const token = '8199409809:AAGfBC9IPCiKqb5xv5PnsX9P9losXdUnwxU';
const bot = new TelegramBot(token, { polling: true });

console.log("🚀 Bot de clonage public en ligne...");

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // On cherche un lien t.me (ex: https://t.me/nom_du_canal/123)
    if (text && text.includes('t.me/')) {
        try {
            // Nettoyage du lien pour extraire les infos
            const url = new URL(text);
            const pathParts = url.pathname.split('/').filter(p => p !== ''); 
            
            // pathParts[0] = le nom du canal (ex: durov)
            // pathParts[1] = l'ID du message (ex: 209)
            const channelUsername = `@${pathParts[0]}`;
            const messageId = pathParts[1];

            if (!messageId) {
                return bot.sendMessage(chatId, "❌ Le lien doit pointer vers un message précis (ex: https://t.me/username/123)");
            }

            bot.sendMessage(chatId, `🔄 Clonage du message ${messageId} depuis ${channelUsername}...`);

            // La méthode magique : copyMessage
            // Contrairement à forwardMessage, copyMessage ne montre pas la source originale.
            await bot.copyMessage(chatId, channelUsername, messageId);

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "⚠️ Impossible de cloner. Vérifie que le canal est bien PUBLIC et que le lien est correct.");
        }
    } else if (text === '/start') {
        bot.sendMessage(chatId, "Envoyez-moi un lien de message d'un canal PUBLIC pour que je le copie ici !");
    }
});
