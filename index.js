require('dotenv').config();
const { Telegraf } = require('telegraf');
const sharp = require('sharp');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("🔥 Envoie /create TEXTE pour générer ton emoji !");
});

bot.command('create', async (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  if (!text) return ctx.reply("❌ Mets un texte");

  try {
    const svg = `
    <svg width="512" height="512">
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stop-color="#ff00ff"/>
          <stop offset="100%" stop-color="#00ffff"/>
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#grad)"/>
      <text x="50%" y="50%" font-size="80" fill="white"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-weight="bold">
        ${text}
      </text>
    </svg>
    `;

    const img = await sharp(Buffer.from(svg)).png().toBuffer();

    await ctx.replyWithPhoto({ source: img });

  } catch (e) {
    console.log(e);
    ctx.reply("Erreur ❌");
  }
});

bot.launch();
console.log("Bot lancé ✅");
