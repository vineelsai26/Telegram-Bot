const Telegraf = require('telegraf')
const fetch = require('node-fetch')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome!'))

bot.help((ctx) => ctx.reply('- send Hi or Hello \n- send sticker \n- /poll question option1 option2 ..'))

bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.command('poll', (ctx) => {
    const msg = ctx.message.text.replace('/poll ', '')
    var poll = msg.trim().split(" ")
    var options = poll.slice(1)
    var option = new Array()
    options.forEach(element => {
        if (element.trim() != "") {
            option.push(element)
        }
    });
    if (options.length != 0 && options.length != 1) {
        ctx.replyWithPoll(
            poll[0],
            option,
            { is_anonymous: false }
        )
    } else if (options.length == 1) {
        ctx.reply('/poll Should have atleast two options')
    } else {
        ctx.reply('/poll question option1 option2 ...')
    }
})

bot.command('echo', (ctx) => {
    const msg = ctx.message.text.replace('/echo ', '')
    ctx.reply(msg)
})

bot.on('text', (ctx) => {
    const msg = ctx.message.text.toLowerCase()
    if (msg == 'hi' || msg == 'hii' || msg == 'hello' || msg == 'hey') {
        console.log(ctx.message.text.toLowerCase())
        if (ctx.from.username == 'vineelsai') {
            ctx.reply('Hi Boss')
        } else {
            ctx.reply('Hi' + ctx.from.first_name)
        }
    }
})

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.command('quit', (ctx) => {
    ctx.telegram.leaveChat(ctx.message.chat.id)
    ctx.leaveChat()
})

bot.launch()
