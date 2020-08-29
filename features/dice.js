module.exports.dice = function dice(ctx) {
	randomNumber = Math.floor(Math.random() * 6) + 1
	if (randomNumber == 1) {
		ctx.reply('1️⃣')
	} else if (randomNumber == 2) {
		ctx.reply('2️⃣')
	} else if (randomNumber == 3) {
		ctx.reply('3️⃣')
	} else if (randomNumber == 4) {
		ctx.reply('4️⃣')
	} else if (randomNumber == 5) {
		ctx.reply('5️⃣')
	} else if (randomNumber == 6) {
		ctx.reply('6️⃣')
	}
}
