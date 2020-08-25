module.exports.pin = function pin(ctx) {
    const msg = ctx.message.text.replace('/pin ', '').trim()
    ctx.telegram.sendMessage(ctx.chat.id, msg).then(({ message_id }) => ctx.telegram.pinChatMessage(ctx.chat.id, message_id))
}

module.exports.unpin = function unpin(ctx) {
    ctx.telegram.unpinChatMessage(ctx.chat.id)
}
