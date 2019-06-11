<template>
    <div class="attachment-item">
        <div class="item__inner">
            <div class="item__image">
                <img :src="data.preview" />
            </div>
            <div :class="['item__progress', data.status]">
                    <div class="progress">
                        <div class="progress__ind-background" />
                        <div class="progress__ind" :style="fileProgress"/>
                        <div class="progress__percentage">
                            <p>{{fileProgressPercent}}</p>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="item__actions">
                
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'image-list-item',

        props: {
            data: {
                type: Object,
                required: true
            }
        },

        computed: {
            fileProgressPercent() { 
                let total = this.data.progress.total
                let loaded = this.data.progress.loaded
                return (total) ? Math.round(loaded/total * 100) + "%" : "0%"
                // return (total) ? (loaded/total * 100).toFixed(1) + "%" : "0.0%"
            },

            fileProgress() { 
				let total = this.data.progress.total
				let loaded = this.data.progress.loaded
				
                if(!total) return 0
				return { transform:'scaleX(' + loaded/total + ')' }
            }
        }
    }
</script>