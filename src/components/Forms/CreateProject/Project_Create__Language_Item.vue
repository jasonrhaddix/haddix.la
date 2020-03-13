<template>
    <div class="create-language-item">
        <div class="language__graph">
            <language-graph
                :value="parseFloat(value)"
                :language="languageName"/>
        </div>
        <div class="language__content">
            <div class="content__inner">
                <div class="content__type">
                    <v-select
                        filled
                        dense
                        label="Language"
                        item-text="name"
                        :items="projectLanguages"
                        v-model="localLang"/>
                </div>
                <div class="content__percentage">
                    <v-text-field
                        filled
						dense
                        label="Percentage"
                        :type="computedValue >= 100 ? '' : 'number'"
                        v-model="computedValue"
                        :value="0"/>
                </div>
                <div class="content__actions">
                    <v-btn
                        fab small
                        color="grey darken-3"
                        @click="remove">
                        <v-icon>remove</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import LanguageGraph from '@/components/_global/Language_Graph'

export default {
	name: 'create-language-item',

	components: {
		'language-graph': LanguageGraph
	},

	props: {
		id: {
			type: String,
			required: true
		},
		value: {
			type: [String, Number],
			required: false
		},
		valueCallback: {
			type: Function,
			required: false
		},
		language: {
			type: String,
			required: false
		},
		languageCallback: {
			type: Function,
			required: false
		},

		removeCallback: {
			type: Function,
			default: null
		}
	},

	data: () => ({
		localLang: {},
		localValue: 0
	}),

	computed: {
		...mapState({
			projectLanguages: state => state.config.projectLanguages
		}),

		...mapGetters({
			getPropertyByKey: 'getPropertyByKey'
		}),

		languageName () {
			if (!this.language) return ''
			return this.getPropertyByKey('projectLanguages', this.language, 'value', 'name')
		},

		computedValue: {
			get () { return this.localValue },
			set (val) {
				this.localValue = (val >= 100) ? 100 : val
			}
		}
	},

	updated () {
		if (this.value) this.localValue = this.value
		if (this.language) this.localLang = this.language
	},

	methods: {
		remove () {
			this.removeCallback(this.id)
		}
	},

	watch: {
		localValue: {
			handler (value) {
				if (this.valueCallback) {
					this.valueCallback({
						id: this.id,
						value: value
					})
				}
			}
		},
		localLang: {
			handler (value) {
				if (this.languageCallback) {
					this.languageCallback({
						id: this.id,
						language: value
					})
				}
			}
		}
	}
}
</script>
