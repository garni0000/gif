require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Dictionnaires de styles
const styles = {
    bubbles: {
        a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', 
        n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ'
    },
    bold: {
        a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', 
        n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳'
    }
};

function applyStyle(text, alphabet) {
    return text.toLowerCase().split('').map(char => alphabet[char] || char).join('');
}

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Envoie-moi un mot et je vais le rendre stylé !");
});

bot.on('message', (msg) => {
    if (msg.text && !msg.text.startsWith('/')) {
        const text = msg.text;
        const resBubbles = applyStyle(text, styles.bubbles);
        const resBold = applyStyle(text, styles.bold);

        bot.sendMessage(msg.chat.id, `Voici ton texte stylé :\n\n` + 
            `Bulles : \`${resBubbles}\` (clique pour copier)\n` +
            `Gras : \`${resBold}\` (clique pour copier)`, { parse_mode: 'Markdown' });
    }
});

console.log("🚀 Bot de texte stylé démarré !");
