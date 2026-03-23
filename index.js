require('dotenv').config();
const { Telegraf } = require('telegraf');
const { createCanvas } = require('canvas');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("👋 Envoie /create TEXTE pour générer un emoji stylé !");
});

bot.command('create', async (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  if (!text) return ctx.reply("❌ Mets un texte !");

  const canvas = createCanvas(512, 512);
  const c = canvas.getContext('2d');

  // fond dégradé
  const grad = c.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#ff00ff');
  grad.addColorStop(1, '#00ffff');
  c.fillStyle = grad;
  c.fillRect(0, 0, 512, 512);

  // texte
  c.fillStyle = "#fff";
  c.font = "bold 80px Arial";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.fillText(text, 256, 256);

  const buffer = canvas.toBuffer();
  fs.writeFileSync('emoji.png', buffer);

  await ctx.replyWithPhoto({ source: 'emoji.png' });

  fs.unlinkSync('emoji.png');
});

bot.launch();
console.log("Bot canvas lancé ✅");
