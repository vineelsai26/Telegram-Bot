const octonode = require('octonode')

module.exports.github = function github(ctx) {
	const userName = ctx.message.text.replace('/github', '').trim()
	const client = octonode.client()
	const url = '/users/' + userName

	if (userName == '') {
		ctx.reply('command should be in formate /github username')
	} else if (userName.split(' ').length > 1) {
		ctx.reply('command should have only one argument')
	} else {
		client.get(url, {}, function (err, status, body, headers) {
			if (err !== null) {
				ctx.reply(err)
			}
			ctx.replyWithPhoto(body.avatar_url, {
				caption:
					'Id : ' +
					body.id +
					'\n' +
					'Name : ' +
					body.name +
					'\n' +
					'User Name : ' +
					body.login +
					'\n' +
					'Profile : ' +
					'https://github.com/' +
					body.login +
					'\n' +
					'Followers : ' +
					body.followers +
					'\n' +
					'Repositories : ' +
					body.public_repos,
			})
		})
	}
}
