const { Telegraf } = require('telegraf')

const poll = require('./features/poll.js')
const github = require('./features/github.js')
const dice = require('./features/dice.js')
const pin = require('./features/pin.js')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) =>
	ctx.reply(
		`Hello! I am ${bot.botInfo.first_name}`
	)
)

bot.use((ctx, next) => {
	if (ctx.chat.id > 0) return next()

	return ctx.telegram
		.getChatAdministrators(ctx.chat.id)
		.then(function (data) {
			if (!data || !data.length) return
			ctx.chat._admins = data
			ctx.from.isAdmin = data.some((adm) => adm.user.id === ctx.from.id)
		})
		.catch(console.log)
		.then((_) => next(ctx))
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
		pin.pin(ctx)
	} else {
		ctx.reply(
			'You are not an admin',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	}
})

bot.command('pinMsg', (ctx) => {
	if (ctx.from.isAdmin) {
		pin.pinMsg(ctx)
	} else {
		ctx.reply(
			'You are not an admin',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	}
})

bot.command('unpin', (ctx) => {
	if (ctx.from.isAdmin) {
		pin.unpin(ctx)
	} else {
		ctx.reply(
			'You are not an admin',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	}
})

bot.command('rolladice', (ctx) => {
	dice.dice(ctx)
})

bot.command('kick', (ctx) => {
	if (ctx.from.isAdmin) {
		ctx.telegram.kickChatMember(ctx.message.chat.id, ctx.message.reply_to_message.from.id)
	} else {
		ctx.reply(
			'You are not an admin you can`t kick people',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	}
})

bot.command('kickMe', (ctx) => {
	if (ctx.from.isAdmin) {
		ctx.reply(
			'You are an admin you can`t be kicked out rot here',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	} else {
		ctx.telegram.leaveChat(ctx.message.chat.id)
		ctx.leaveChat()
	}
})

bot.hears('I am admin', function (ctx) {
	if (ctx.from.isAdmin) {
		return ctx.reply(
			'Yep!',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	} else {
		return ctx.reply(
			'No, you are not',
			Telegraf.Extra.inReplyTo(ctx.message.message_id)
		)
	}
})

bot.on('text', function (ctx) {
	const msg = ctx.message.text.toLowerCase()
	if (msg == 'hi' || msg == 'hii' || msg == 'hello' || msg == 'hey') {
		ctx.telegram.sendMessage(ctx.message.chat.id, `Hello @${ctx.message.from.username}`)
	}
})

bot.catch((err, ctx) => {
	console.log(`Oops, encountered an error for ${ctx.updateType}`, err)
})

bot.launch()
