<template>
	<div class="particle-text" ref="particleText"/>
</template>

<script>
	import { mapState } from 'vuex'

	class Particle {
		constructor (canvas, options, colors) {
			// let random = Math.random()

			this.canvas = canvas
			this.x = options.x
			this.y = options.y
			this.s = 0.5 + Math.random() * 0.5
			this.a = 0
			this.w = 700
			this.h = 170
			this.radius = 10 + Math.random() * 10

			/* if (colors) {
				this.color = this.radius > 15 ? `${colors[0]}` : `${colors[1]}`
			} else {
				this.color = '#000'
			} */

			// this.color = this.randomColor()
		}

		randomColor () {
			let colors = ['#FE8D36', '#FE6783', '#FB508E', '#C14294', '#57219C']
			return colors[this.randomIntFromInterval(0, colors.length - 1)]
		}

		randomIntFromInterval (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		}

		render (colors = ['#FF0000', '#000']) {
			this.canvas.beginPath()
			this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
			this.canvas.lineWidth = 2
			this.canvas.fillStyle = this.radius > 15 ? `${colors[0]}` : `${colors[1]}`
			this.canvas.fill()
			this.canvas.closePath()
		}

		move (colors) {
			this.x -= Math.cos(this.a) * this.s
			this.y += Math.sin(this.a) * this.s
			this.a += Math.random() * 0.8 - 0.4

			if (this.x < 0 || this.x > this.w - this.radius) return false
			if (this.y < 0 || this.y > this.h - this.radius + 75) return false

			this.render(colors)
			return true
		}
	}

	export default {
		name: 'particle-text',

		props: {
			text: {
				type: String,
				required: true,
				default: ''
			}
			/* autoStart: {
				type: [Boolean, Number],
				required: false,
				default: 0
			} */
		},

		data: () => ({
			interval: null,
			colorInterval: null,
			canvas: null,
			tela: null,
			c: [],
			particles: [],
			frequency: 20,
			particleColors: [
				['#3100BD', '#000000'],
				['#3100BD', '#FFFFFF'],
				['#FFFFFF', '#000000'],
				['#FF0099', '#00FFFF'],
				['#FF0099', '#00FF00'],
				['#FF0099', '#3100BD'],
				['#0000FF', '#3100BD']
			]
		}),

		computed: {
			...mapState({
				initialized: state => state.app.initialized
			})
		},

		mounted () {
			this.init()

			setTimeout(() => {
				clearInterval(this.colorInterval)
				clearInterval(this.interval)

				this.$refs.particleText.removeChild(this.c[2].canvas)

				this.interval = null
				this.c = []
				this.particles = []
				this.currentColor = []

				this.init()
			}, 100)
		},

		beforeDestroy () {
			clearInterval(this.colorInterval)
			clearInterval(this.interval)
		},

		methods: {
			init () {
				let canvasWidth = 600
				let canvasHeight = 190

				this.c[0] = this.createCanvas({ width: canvasWidth, height: canvasHeight })
				this.c[1] = this.createCanvas({ width: canvasWidth, height: canvasHeight })
				this.c[2] = this.createCanvas({ width: canvasWidth, height: canvasHeight })

				this.tela = this.c[0].canvas
				this.canvas = this.c[0].context

				this.writeText(this.c[1].canvas, this.c[1].context, `\n${this.text}`)
				this.$refs.particleText.appendChild(this.c[2].canvas)

				this.currentColor = this.particleColors[Math.floor(Math.random() * (this.particleColors.length - 0 + 1) + 0)]

				this.interval = setInterval(
					function () {
						this.populate()
					}.bind(this), this.frequency
				)

				// let i = 0
				this.colorInterval = setInterval(
					function () {
						// this.currentColor = this.particleColors[i]
						// return i = (i === this.particleColors.length-1) ? 0 : ++i

						this.currentColor = this.particleColors[Math.floor(Math.random() * (this.particleColors.length - 0 + 1) + 0)]
					}.bind(this), 40
				)

				this.update()
			},

			createCanvas (props) {
				let canvas = document.createElement('canvas')
					canvas.width = props.width
					canvas.height = props.height

				let context = canvas.getContext('2d')

				return {
					canvas: canvas,
					context: context
				}
			},

			writeText (canvas, context, text) {
				context.font = '200px DIN-CondBlack'
				context.fillStyle = '#000'
				context.textAlign = 'center'

				let lineheight = 110
				let lines = text.split('\n')

				for (let i = 0; i < lines.length; ++i) {
					context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - (lineheight * (lines.length - 1)) / 3)
				}
			},

			maskCanvas () {
				this.c[2].context.drawImage(this.c[1].canvas, 0, 0, this.c[1].canvas.width, this.c[1].canvas.height)
				this.c[2].context.globalCompositeOperation = 'source-atop'
				this.c[2].context.drawImage(this.c[0].canvas, 0, 0)
				this.blur(this.c[0].context, this.c[0].canvas, 2)
			},

			blur (ctx, canvas, amount) {
				ctx.filter = `blur(${amount}px)`
				ctx.drawImage(canvas, 0, 0)
				ctx.filter = 'none'
			},

			populate (colors) {
				this.particles.push(
					new Particle(this.canvas, {
						x: Math.random() * 600,
						y: 200
					}, colors)
				)

				return this.particles.length
			},

			clear () {
				this.canvas.globalAlpha = 0.02
				this.canvas.fillStyle = '#000'
				this.canvas.fillRect(0, 0, this.tela.width, this.tela.height)
				this.canvas.globalAlpha = 1
			},

			update () {
				this.clear()
				this.particles = this.particles.filter(p => p.move(this.currentColor))
				this.maskCanvas()
				requestAnimationFrame(this.update.bind(this.currentColor))
			}
		}
	}
</script>
