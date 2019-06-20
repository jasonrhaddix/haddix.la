<template>
    <div class="create-language-item">
        <div class="language__graph">
            <language-graph
                :value="parseFloat(value)"
                :language="language"/>
        </div>
        <div class="language__content">
            <div class="content__inner">
                <div class="content__type">
                    <v-select
                        box
                        dense
                        label="Language"
                        item-text="name"
                        :items="projectLanguages"
                        v-model="language"/>
                </div>
                <div class="content__percentage">
                    <v-text-field
                        box
                        label="Percentage"
                        type="number"
                        v-model="value"
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
    import { mapState } from 'vuex'
    
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
            languageValue: {
                type: Number,
                required: false
            },
            valueCallback: {
                type: Function,
                required: false
            },
            languageName: {
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
            language : '',
            value    : 0 
        }),

        computed: {
            ...mapState({
                projectLanguages : state => state.config.projectLanguages
            }),
        },

        mounted() {
            if (this.languageValue) this.value = this.languageValue
            if (this.languageName) this.language = this.languageName
        },

        methods: {
            remove() {
                this.removeCallback(this.id)
            }
        },

        watch: {
            value: {
                handler(value) {
                    if (this.valueCallback) 
                        this.valueCallback({
                            id : this.id,
                            value : value
                        })
                }
            },
            resource: {
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