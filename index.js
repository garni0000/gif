const TelegramBot = require('node-telegram-bot-api');

// Remplace par ton Token
const token = '8199409809:AAGfBC9IPCiKqb5xv5PnsX9P9losXdUnwxU';
const bot = new TelegramBot(token, { polling: true });

console.log("🚀 Bot actif. Envoie-moi un lien public...");

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text && text.includes('t.me/')) {
        try {
            // Extraction propre de l'ID et du Username
            const urlParts = text.split('/');
            const messageId = parseInt(urlParts.pop());
            const channelUsername = `@${urlParts.pop()}`;

            console.log(`Analyse de : ${channelUsername} / ID: ${messageId}`);

            // ÉTAPE 1 : On fait un forward temporaire (c'est la seule façon de "voir" le média)
            const forward = await bot.forwardMessage(chatId, channelUsername, messageId);

            // ÉTAPE 2 : On détecte le média et on le renvoie sans légende (caption)
            let fileId;
            if (forward.photo) {
                fileId = forward.photo[forward.photo.length - 1].file_id;
                await bot.sendPhoto(chatId, fileId);
            } else if (forward.video) {
                fileId = forward.video.file_id;
                await bot.sendVideo(chatId, fileId);
            } else if (forward.animation) { // Pour les GIFs
                fileId = forward.animation.file_id;
                await bot.sendAnimation(chatId, fileId);
            } else if (forward.document) {
                fileId = forward.document.file_id;
                await bot.sendDocument(chatId, fileId);
            }

            // ÉTAPE 3 : On supprime le message de forward pour que ce soit propre
            await bot.deleteMessage(chatId, forward.message_id);

        } catch (error) {
            console.error("Erreur de clonage :", error.response?.body || error.message);
            bot.sendMessage(chatId, "❌ Impossible de cloner. Vérifie que le canal est bien PUBLIC.");
        }
    }
});
