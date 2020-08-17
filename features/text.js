module.exports.text = function text(ctx) {
    const msg = ctx.message.text.toLowerCase()
    if (msg == 'hi' || msg == 'hii' || msg == 'hello' || msg == 'hey') {
        console.log(ctx.message.text.toLowerCase())
        if (ctx.from.username == 'vineelsai') {
            ctx.reply('Hi Boss')
        } else {
            ctx.reply('Hi' + ctx.from.first_name)
        }
    }
}
