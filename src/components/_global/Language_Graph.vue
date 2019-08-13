<template>
    <div class="language-graph">
        <canvas class="language-graph__canvas" ref="languageGraphCanvas" height="130" width="130"></canvas>
        <div class="language-graph__text">
            <p class="value">{{languageValue}}<span>%</span></p>
            <p class="language">{{language}}</p>
        </div>
    </div>
</template>

<script>
export default {
	name: 'language-graph',

	props: {
		value: {
			type: [String, Number],
			required: true,
			default: 0
		},
		language: {
			type: String,
			required: true,
			default: '--'
		}
	},

	data: () => ({
		canvas_context: null
	}),

	computed: {
		languageValue () {
			let value = parseInt(this.value)

			if (!value) return 0
			if (value >= 100) return value.toFixed(0)
			return (value.toFixed(1) % 1 != 0) ? value.toFixed(1) : parseInt(value.toFixed(1).toString().substring(0, value.toFixed(1).length - 1))
		}
	},

	mounted () {
		this.createGraph()
	},

	methods: {
		createGraph () {
			let percent = this.value

			let canvas = this.$refs.languageGraphCanvas
			this.canvas_context = canvas.getContext('2d')

			this.canvas_context.clearRect(0, 0, canvas.width, canvas.height)

			let percentToRadian = (360 * (Math.PI / 180) / 100)

			let x = canvas.width / 2
			let y = canvas.height / 2
			let startAngle = 0 * Math.PI
			let counterClockwise = false

			var endAngle = 100 * percentToRadian
			var radius = 47
			this.canvas_context.beginPath()
			this.canvas_context.arc(x, y, radius, startAngle, endAngle, counterClockwise)
			this.canvas_context.lineWidth = 6
			this.canvas_context.strokeStyle = '#3100BD'
			this.canvas_context.stroke()

			var endAngle = 100 * percentToRadian
			var radius = 40
			this.canvas_context.beginPath()
			this.canvas_context.arc(x, y, radius, startAngle, endAngle, counterClockwise)
			this.canvas_context.lineWidth = 6
			this.canvas_context.strokeStyle = 'rgba(255,100,0,0.2)'
			this.canvas_context.stroke()

			var endAngle = percent * percentToRadian
			var radius = 40
			this.canvas_context.beginPath()
			this.canvas_context.arc(x, y, radius, startAngle, endAngle, counterClockwise)
			this.canvas_context.lineWidth = 6
			this.canvas_context.strokeStyle = '#FF6400'
			this.canvas_context.stroke()
		}
	},

	watch: {
		value: {
			handler (val) {
				this.createGraph()
			}
		}
	}
}
</script>
