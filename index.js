const TelegramBot = require('node-telegram-bot-api');

// 🔴 REMPLACE PAR TON TOKEN
const token = '8199409809:AAGfBC9IPCiKqb5xv5PnsX9P9losXdUnwxU';
const bot = new TelegramBot(token, { polling: true });

console.log("🚀 Bot Clonneur de Médias (Sans Légende) en ligne...");

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text && text.includes('t.me/')) {
        try {
            const url = new URL(text);
            const pathParts = url.pathname.split('/').filter(p => p !== ''); 
            
            const channelUsername = `@${pathParts[0]}`;
            const messageId = parseInt(pathParts[1]);

            bot.sendMessage(chatId, "⏳ Analyse du média...");

            // On récupère les infos du message source
            // Note: getChatPost est limité, donc on utilise forward temporairement pour "voir" le contenu
            const tempMsg = await bot.forwardMessage(chatId, channelUsername, messageId);

            // On identifie le média et on le renvoie SANS légende (caption)
            if (tempMsg.photo) {
                const photoId = tempMsg.photo[tempMsg.photo.length - 1].file_id;
                await bot.sendPhoto(chatId, photoId);
            } 
            else if (tempMsg.video) {
                await bot.sendVideo(chatId, tempMsg.video.file_id);
            } 
            else if (tempMsg.document) {
                await bot.sendDocument(chatId, tempMsg.document.file_id);
            } 
            else if (tempMsg.animation) {
                await bot.sendAnimation(chatId, tempMsg.animation.file_id);
            } else {
                bot.sendMessage(chatId, "ℹ️ Ce message ne contient pas d'image ou de vidéo compatible.");
            }

            // On supprime le message transféré pour ne laisser que le "clone" propre
            await bot.deleteMessage(chatId, tempMsg.message_id);

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ Erreur : Vérifie que le lien est PUBLIC. Si c'est un canal privé, je ne peux pas voir le contenu.");
        }
    }
});
