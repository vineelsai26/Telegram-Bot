module.exports.releaseBliss = function releaseBliss(ctx) {
	const msg = ctx.message.text.replace('/releaseBliss ', '').trim().split(' ')

	var rom = new Array()
	msg.forEach((element) => {
		if (element.trim() != '') {
			rom.push(element)
		}
	})

	const version = rom[0]
	const downloadLink = rom[1]
	const ChangelogLink = rom[2]

	ctx.replyWithPhoto(
		'https://drive.google.com/file/d/1ybOyYntwUpWvljKaAlT9BCIqXpaVbET2/view?usp=sharing',
		{
			caption: `
*BlissROM Onclite Official*

*Bliss ROM ${version} | 10 Q*
By @vineelsai

*Download :* [XDA](https://forum.xda-developers.com/redmi-7/development/bliss-rom-redmi-7-y3-t4142445) | [Other](${downloadLink})

*Changelog :* [ROM](${ChangelogLink}) | [Device](https://gist.github.com/vineelsai26/c6183521968bee0ac7a8d4537bc4ea08#file-bliss-change-log>)

*Follow* 👉🏻 [Bliss Official Channel](http://t.me/BlissROM_Updates)
*Join* 👉🏻 [Bliss Support Group](https://t.me/Team_Bliss_Community)
*Join* 👉🏻 [Device Specific Support](https://t.me/BissOnclite)
`,
			parse_mode: 'Markdown',
		}
	)
}
