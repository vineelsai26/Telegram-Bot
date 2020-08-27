module.exports.help = function help(Telegraf, ctx, bot) {
    const helpMenu = Telegraf.Extra
        .markdown()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('Reply', 'conversation'),
            m.callbackButton('GitHub', 'github'),
            m.callbackButton('Roll Dice', 'dice'),
            m.callbackButton('Poll', 'poll'),
            m.callbackButton('Pin', 'pin'),
        ], {
            columns: 3
        }))

    ctx.reply('These are the actions supporterd by the bot', helpMenu)

    bot.action('conversation', (ctx) => ctx.answerCbQuery('Hi', false).then(() => {
        ctx.replyWithMarkdown('If you message Hi/Hello/Hey the bot will reply you with Hi and your user name')
    }))

    bot.action('github', (ctx) => ctx.answerCbQuery('GitHub', false).then(() => {
        ctx.replyWithMarkdown('*Commands :* \n- /github <username> : Get GitHub stats of any user by just using the command')
    }))

    bot.action('dice', (ctx) => ctx.answerCbQuery('Roll Dice', false).then(() => {
        ctx.replyWithMarkdown('*Commands :* \n- /rolladice : Roll a dice and get random number')
    }))

    bot.action('poll', (ctx) => ctx.answerCbQuery('Poll', false).then(() => {
        ctx.replyWithMarkdown('*Commands :* \n- /poll <question> <options> : Poll a question and remember to not use spaces in question or in options')
    }))

    bot.action('pin', (ctx) => ctx.answerCbQuery('Pin', false).then(() => {
        ctx.replyWithMarkdown('*Commands :* \n- /pin : Pin a message in group \n- /pinmsg <Text> : Pin Text in group \n- /unpin : unpin message which is currently pined in chat')
    }))
}