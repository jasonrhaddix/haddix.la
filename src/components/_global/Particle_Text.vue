<template>
	<!-- <div> -->
		<div class="particle-text" ref="particleText"/>
	<!-- </div> -->
</template>

<script>
	class Particle {
		constructor(canvas, options) {
			let random = Math.random()

			this.canvas = canvas
			this.x = options.x
			this.y = options.y
			this.s = (2 + Math.random())
			this.a = 0
			this.w = 700
			this.h = 170
			this.radius = 6 + Math.random() * 12
			// this.color = this.radius > 13 ? '#FFFFFF' : '#3100BD'
			this.color = this.randomColor()
		}

		randomColor() {
			let colors = ["#FFF", "#FFF", '#3100BD', '#3100BD', '#3100BD']
			return colors[this.randomIntFromInterval(0,colors.length-1)];
  		}

		randomIntFromInterval(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		}

		render(){
			this.canvas.beginPath()
			this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
			this.canvas.lineWidth = 2
			this.canvas.fillStyle = this.color
			this.canvas.fill()
			this.canvas.closePath()
		}

		move() {
			this.x -= Math.cos(this.a) * this.s
			this.y += Math.sin(this.a) * this.s
			this.a += Math.random() * 0.8 - 0.4

			if (this.x < 0 || this.x > this.w - this.radius) return false
			if (this.y < 0 || this.y > this.h - this.radius + 30) return false

			this.render()
			return true
		}
	}

	export default {
		name: 'particle-text',

		props: {
			text: {
				type: String,
				required: true,
				default: ""
			},
			/* autoStart: {
				type: [Boolean, Number],
				required: false,
				default: 0
			} */
		},

		data:() => ({
			interval: null,
			canvas: null,
			tela: null,
			c: [],
			particles: [],
			frequency: 20
		}),

		mounted() {
			this.init()

			this.interval = setInterval(
				function(){
					this.populate()
				}.bind(this), this.frequency
			)
		},

		beforeDestroy() {
			clearInterval(this.interval)
		},

		methods: {
			init() {
				let canvasWidth = 600
				let canvasHeight = 190

				this.c[0] = this.createCanvas({width: canvasWidth, height: canvasHeight})
				this.c[1] = this.createCanvas({width: canvasWidth, height: canvasHeight})
				this.c[2] = this.createCanvas({width: canvasWidth, height: canvasHeight})
				// this.c[3] = this.createCanvas({width: canvasWidth, height: canvasHeight})

				this.tela = this.c[0].canvas
				this.canvas = this.c[0].context

				this.$refs.particleText.appendChild(this.c[2].canvas)
				this.writeText(this.c[1].canvas, this.c[1].context, `\n${this.text}`)

				this.update()
			},

			createCanvas(props) {
				let canvas = document.createElement('canvas')
					canvas.width = props.width
					canvas.height = props.height

				let context = canvas.getContext('2d')

				return {
					canvas: canvas,
					context: context
				}
			},

			writeText(canvas, context, text) {
				let size = 200

				context.font = '' + size + 'px DIN-CondBlack'
				context.fillStyle = '#000'
				context.textAlign = 'center'

				let lineheight = 110
				let lines = text.split('\n')

				for (let i = 0; i < lines.length; ++i) {
					context.fillText(lines[i], canvas.width/2, canvas.height/2 + lineheight*i - (lineheight*(lines.length-1))/3)
				}
			},

			maskCanvas() {
				this.c[2].context.drawImage(this.c[1].canvas, 0, 0, this.c[1].canvas.width, this.c[1].canvas.height)
				this.c[2].context.globalCompositeOperation = 'source-atop'
				this.c[2].context.drawImage(this.c[0].canvas, 0, 0)
				this.blur(this.c[0].context, this.c[0].canvas, 2)
			},

			blur(ctx, canvas, amount) {
				ctx.filter = `blur(${amount}px)`
				ctx.drawImage(canvas, 0, 0)
				ctx.filter = 'none'
			},

			populate() {
				this.particles.push(
					new Particle( this.canvas, {
						x: Math.random() * 600,
						y: 180
					})
				)

				return this.particles.length
			},

			clear() {
				this.canvas.globalAlpha = 0.02;
				this.canvas.fillStyle = '#000';
				this.canvas.fillRect(0, 0, this.tela.width, this.tela.height);
				this.canvas.globalAlpha = 1;
			},

			update() {
				this.clear()
				this.particles = this.particles.filter(p => p.move())
				this.maskCanvas()
  				requestAnimationFrame(this.update.bind(this))
			}
		}
	}
</script>
