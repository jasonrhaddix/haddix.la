<template>
    <!-- <div :class="['projects-item', hue]"> -->
    <div :class="['projects-item']">
        <div class="project__inner">

            <!-- <div
                class="image-container">
                <div
                    v-for="(item, index) in patterns[0].p"
                    :key="$uuid.v4()"
                    :class="`poly poly-${index}`"
                    :style="{clipPath:`polygon(${item})`}">
                    <v-img
                        contain
                        :src="image"></v-img>
                </div>
                <v-img
                    contain
                    class="hidden-img"
                    :src="image"></v-img>
            </div> -->

            <!-- <div class="title-container" >
                <div class="title-inner">
                    <div class="project-title">
                        <p>{{ client }}</p>
                        <h4>{{ title }}</h4>
                        <h5>{{ subtitle }}</h5>
                        <div class="divider" />
                        <app-btn
                            label="View Project"
                            @click.native.stop="clickItem"
                            @mouseover.native.stop="hover=true"
                            @mouseout.native.stop="hover=false"/>
                    </div>
                </div>
            </div> -->

			<div class="image__main">
                <v-img
					eager
					contain
					:src="image"></v-img>
                <div class="scrim"/>
            </div>

			<div class="title-container" >
                <div class="title-inner">
                    <div class="project-title">
                        <p>{{ client }}</p>
                        <h4>{{ title }}</h4>
                        <h5>{{ subtitle }}</h5>
                        <div class="divider" />
                        <app-btn
                            label="View Project"
                            @click.native.stop="clickItem"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
// import detectImageDark from '@/js/detectImageDark'

import AppButton from '@/components/_global/App_Button'

export default {
	name: 'projects-item',

	components: {
		'app-btn': AppButton
	},

	props: {
		id: {
			type: String,
			required: true,
			default: null
		},
		sessionId: {
			type: String,
			required: false,
			default: null
		},
		client: {
			type: String,
			required: true,
			default: null
		},
		title: {
			type: String,
			required: true,
			default: null
		},
		subtitle: {
			type: String,
			required: true,
			default: null
		},
		image: {
			type: String,
			required: true,
			default: null
		},
		isGuestProject: {
			type: Boolean,
			required: false,
			default: null
		},
		clickCallback: {
			type: [Function, Promise],
			required: false,
			default: null
		}
	},

	data: () => ({
		// hue: null,
		// visible: null
		/* hover: false,
		patterns: [
			{
				p: [
					'0% 0%, 20% 50%, 0% 100%',
					'0% 0%, 20% 0%, 50% 20%, 20% 50%',
					'20% 0%, 75% 0%, 50% 20%',
					'75% 0%, 100% 0%, 100% 20%, 90% 50%, 50% 20%',
					'50% 20%, 90% 50%, 75% 100%, 60% 100%, 20% 50%',
					'100% 20%, 100% 57%, 90% 50%',
					'90% 50%, 100% 57%, 100% 100%, 75% 100%',
					'20% 50%, 60% 100% , 75% 100%, 0% 100%'
				]

			}
		] */
	}),

	/* mounted () {
		detectImageDark(this.image, this.setHue)
	}, */

	methods: {
		/*  */setHue (val) { this.hue = val },

		/* itemHover (val) {
			this.hover = val
		}, */

		clickItem () {
			if (this.clickCallback) {
				this.clickCallback({
					project_id: this.id,
					session_id: this.sessionId,
					is_guest_project: this.isGuestProject,
					title: this.title
				})
			}
		}
	}
}
</script>
