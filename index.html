require('dotenv').config();
const { Telegraf } = require('telegraf');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

// /start
bot.start((ctx) => {
  ctx.reply("Salut 👋 ! Envoie-moi du texte ou /create ton emoji premium et je le transforme en sticker animé.");
});

// /create <texte>
bot.command('create', async (ctx) => {
  const input = ctx.message.text.split(' ').slice(1).join(' ');
  if(!input) return ctx.reply("Merci de préciser le texte pour ton emoji/sticker.");

  // Création du canvas
  const width = 512;
  const height = 512;
  const canvas = createCanvas(width, height);
  const ctx2 = canvas.getContext('2d');

  // Fond transparent
  ctx2.clearRect(0, 0, width, height);

  // Fond couleur / dégradé
  const gradient = ctx2.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#ff00ff');
  gradient.addColorStop(1, '#00ffff');
  ctx2.fillStyle = gradient;
  ctx2.fillRect(0, 0, width, height);

  // Texte stylé
  ctx2.font = 'bold 100px Arial';
  ctx2.fillStyle = '#ffffff';
  ctx2.textAlign = 'center';
  ctx2.textBaseline = 'middle';
  ctx2.fillText(input, width / 2, height / 2);

  // Sauvegarde temporaire
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('sticker.png', buffer);

  // Envoi au user
  await ctx.replyWithPhoto({ source: 'sticker.png' });

  // Nettoyage
  fs.unlinkSync('sticker.png');
});

bot.launch();
console.log("Bot emojis premium lancé ✅");
