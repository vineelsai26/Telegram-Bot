module.exports.poll = function poll(ctx) {
	const msg = ctx.message.text.replace('/poll ', '')
	var poll = msg.trim().split(' ')
	var options = poll.slice(1)
	var option = new Array()
	options.forEach((element) => {
		if (element.trim() != '') {
			option.push(element)
		}
	})
	if (options.length != 0 && options.length != 1) {
		ctx.replyWithPoll(poll[0], option, { is_anonymous: false })
	} else if (options.length == 1) {
		ctx.reply('/poll Should have at least two options')
	} else {
		ctx.reply('/poll question option1 option2 ...')
	}
}
