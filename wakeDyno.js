const https = require('https')

const wakeUpDyno = (url, interval = 15, callback) => {
	const milliseconds = interval * 60000
	setTimeout(() => {
		try {
			console.log(`setTimeout called.`)
			https.get(url, () => console.log(`Fetching ${url}.`))
		} catch (err) {
			console.log(
				'Error fetching ${url}: ${err.message} Will try again in ${interval} minutes...'
			)
		} finally {
			try {
				callback()
			} catch (e) {
				callback ? console.log('Callback failed: ', e.message) : null
			} finally {
				return wakeUpDyno(url, interval, callback)
			}
		}
	}, milliseconds)
}

module.exports = wakeUpDyno
