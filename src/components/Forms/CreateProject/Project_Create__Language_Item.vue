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
                        v-model="languageLocal"/>
                </div>
                <div class="content__percentage">
                    <v-text-field
                        filled
                        label="Percentage"
                        type="number"
                        v-model="valueLocal"
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
            'language-graph' : LanguageGraph
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

        data:() => ({
            languageLocal : {},
            valueLocal    : 0 
        }),

        computed: {
            ...mapState({
                projectLanguages : state => state.config.projectLanguages
            }),

            ...mapGetters({
                getPropertyByKey : 'getPropertyByKey'
            }),

            languageName() {
                if (!this.language) return ""
                return this.getPropertyByKey('projectLanguages', this.language, 'value', 'name')
            }
        },

        updated() {
            if (this.value) this.valueLocal = this.value
            if (this.language) this.languageLocal = this.language
        },

        methods: {
            remove() {
                this.removeCallback(this.id)
            }
        },

        watch: {
            valueLocal: {
                handler(value) {
                    if (this.valueCallback) 
                        this.valueCallback({
                            id : this.id,
                            value : value
                        })
                }
            },
            languageLocal: {
                handler(value) {
                    if (this.languageCallback) 
                        this.languageCallback({
                            id : this.id,
                            language : value
                        })
                }
            }
        }
    }
</script>