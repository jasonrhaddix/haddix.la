const detectImageDark = (src, callback) => {
	let fuzzy = 0.1
	let img = document.createElement('img')
	img.src = src
	img.style.display = 'none'
	document.body.append(img)

	img.onload = function () {
		let canvas = document.createElement('canvas')
		canvas.width = this.width
		canvas.height = this.height

		let ctx = canvas.getContext('2d')
		ctx.drawImage(this, 0, 0)

		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		let data = imageData.data
		let r, g, b
		let light = 0; let dark = 0

		for (var x = 0, len = data.length; x < len; x += 4) {
			r = data[x]
			g = data[x + 1]
			b = data[x + 2]

			let maxRgb = Math.max(Math.max(r, g), b)
			if (maxRgb < 128) { dark++ } else { light++ }
		}

		let dlDiff = ((light - dark) / (this.width * this.height))
		let val = (dlDiff + fuzzy < 0) ? 'dark' : 'light'
		callback(val)
	}
}

export default detectImageDark
