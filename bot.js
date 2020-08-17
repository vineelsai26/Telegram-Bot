const Telegraf = require('telegraf')

const poll = require('./features/poll.js')
const github = require('./features/github.js')
const text = require('./features/text.js')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome! I am F.R.I.D.A.Y Bot not sure what you are looking for type /help to find what you can do'))

bot.help((ctx) => ctx.reply('- send Hi or Hello \n- send sticker \n- /poll question option1 option2 .. \n- /github username'))

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.command('echo', (ctx) => {
    const msg = ctx.message.text.replace('/echo ', '')
    ctx.reply(msg)
})

bot.command('poll', (ctx) => {
    poll.poll(ctx)
})

bot.command('github', (ctx) => {
    github.github(ctx)
})

bot.on('text', (ctx) => {
    text.text(ctx)
})

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.command('quit', (ctx) => {
    ctx.telegram.leaveChat(ctx.message.chat.id)
    ctx.leaveChat()
})

bot.launch()
