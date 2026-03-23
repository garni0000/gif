const TelegramBot = require('node-telegram-bot-api');

// 🔴 REMPLACE PAR TON TOKEN ET LE NOM D'UTILISATEUR DE TON BOT
const token = '8199409809:AAHj_nOIjN04pbh-A0XAUPl4Z5h1QyxST8Y';
const botUsername = 'NomDeTonBot'; // ex: 'MonSuperEmojiBot'

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 
        "Salut ! Envoie-moi un fichier image (.png/.webp) ou une courte vidéo (.webm) pour que je l'ajoute à ton pack d'emojis Pro.\n\n" +
        "Rappel : Tu dois avoir Telegram Premium pour utiliser ces emojis ensuite !"
    );
});

// Écoute les documents (fichiers non compressés) envoyés au bot
bot.on('document', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const fileId = msg.document.file_id;
    
    // Le nom du pack DOIT obligatoirement se terminer par "_by_TonBotUsername"
    const packName = `custom_emojis_${userId}_by_${botUsername}`;
    const packTitle = `Emojis Pro de ${msg.from.first_name}`;

    bot.sendMessage(chatId, "⏳ Traitement de ton emoji en cours...");

    try {
        // Étape 1 : On vérifie si le pack de l'utilisateur existe déjà
        try {
            const stickerSet = await bot.getStickerSet(packName);
            
            // Si le pack existe, on ajoute le nouvel emoji
            await bot.addStickerToSet(userId, packName, {
                sticker: fileId,
                emoji_list: ['🔥'] // L'emoji clavier associé par défaut
            });
            
            bot.sendMessage(chatId, `✅ Nouvel emoji ajouté à ton pack existant !\nRetrouve-le ici : t.me/addstickers/${packName}`);
            
        } catch (error) {
            // Étape 2 : Si le pack n'existe pas, on le crée
            // Le sticker_type 'custom_emoji' est crucial ici !
            await bot.createNewStickerSet(userId, packName, packTitle, [
                {
                    sticker: fileId,
                    emoji_list: ['🚀']
                }
            ], 'custom_emoji');

            bot.sendMessage(chatId, `🎉 Ton pack d'emojis Pro a été créé avec succès !\nAjoute-le à Telegram ici : t.me/addstickers/${packName}`);
        }

    } catch (error) {
        console.error("Erreur API Telegram:", error.message);
        bot.sendMessage(chatId, 
            "❌ Une erreur est survenue.\n" +
            "Assure-toi d'envoyer un format valide :\n" +
            "- PNG/WEBP (100x100px) pour les images statiques.\n" +
            "- WEBM (VP9, sans son, max 3 secondes) pour les animés."
        );
    }
});

console.log("🤖 Le bot est en ligne !");
