const Telegraf = require('telegraf')

const poll = require('./features/poll.js')
const github = require('./features/github.js')
const text = require('./features/text.js')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome! I am F.R.I.D.A.Y Bot not sure what you are looking for type /help to find what you can do'))

bot.help((ctx) => ctx.reply('- send Hi or Hello \n- send sticker \n- /poll question option1 option2 .. \n- /github username \n- /unpin'))

bot.use(function (ctx, next) {
    if (ctx.chat.id > 0) return next()

    return bot.telegram.getChatAdministrators(ctx.chat.id)
        .then(function (data) {
            if (!data || !data.length) return
            ctx.chat._admins = data
            ctx.from.isAdmin = data.some(adm => adm.user.id === ctx.from.id)
        })
        .catch(console.log)
        .then(_ => next(ctx))
})

bot.command('echo', (ctx) => {
    const msg = ctx.message.text.replace('/echo ', '')
    ctx.reply(msg)
})

bot.command('poll', (ctx) => {
    if (ctx.from.isAdmin) {
        poll.poll(ctx)
    } else {
        ctx.reply('You are not an admin')
    }
})

bot.command('github', (ctx) => {
    github.github(ctx)
})

bot.command('pin', (ctx) => {
    if (ctx.from.isAdmin) {
        bot.telegram.pinChatMessage(ctx.chat.id, ctx.message.message_id)
    } else {
        ctx.reply('You are not an admin')
    }
})

bot.command('unpin', (ctx) => {
    if (ctx.from.isAdmin){
        bot.telegram.unpinChatMessage(ctx.chat.id)
    } else {
        ctx.reply('You are not an admin')
    }
})

bot.hears('I\'m admin', function (ctx) {
    if (ctx.from.isAdmin) {
        return ctx.reply('Yep!')
    } else {
        return ctx.reply('No, you are not')
    }
})

bot.command('kickme', (ctx) => {
    if (ctx.from.isAdmin) {
        ctx.reply('You are an admin you can`t be kicked out rot here')
    } else {
        ctx.telegram.leaveChat(ctx.message.chat.id)
        ctx.leaveChat()
    }
})

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.on('text', (ctx) => {
    text.text(ctx)
})

bot.launch()
