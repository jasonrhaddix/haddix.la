<template>
    <div class="create-resource-item">
        <div class="resource__graph">
            <resource-graph
                :value="parseFloat(value)"
                :resource="resource"/>
        </div>
        <div class="resource__content">
            <div class="content__inner">
                <div class="content__type">
                    <v-select
                        box
                        dense
                        label="Resource Type"
                        item-text="name"
                        :items="projectResourceTypes"
                        v-model="resource"/>
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
    
    import ResourceGraph from '@/components/_global/Resource_Graph'

    export default {
        name: 'create-resource-item',

        components: {
            'resource-graph' : ResourceGraph
        },

        props: {
            id: {
                type: String,
                required: true
            },
            resourceValue: {
                type: Number,
                required: false
            },
            valueCallback: {
                type: Function,
                required: false
            },
            resourceName: {
                type: String,
                required: false
            },
            resourceCallback: {
                type: Function,
                required: false
            },
            
            removeCallback: {
                type: Function,
                default: null
            }
        },

        data:() => ({
            resource : '',
            value    : 0 
        }),

        computed: {
            ...mapState({
                projectResourceTypes : state => state.config.projectResourceTypes
            }),
        },

        mounted() {
            if (this.resourceValue) this.value = this.resourceValue
            if (this.resourceName) this.resource = this.resourceName
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
                    if (this.resourceCallback) 
                        this.resourceCallback({
                            id : this.id,
                            resource : value
                        })
                }
            }
        }
    }
</script>