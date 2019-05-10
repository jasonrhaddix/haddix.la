<template>
    <div class="sphere-bg-container">
        <div ref="threeContainer" id="threeContainer" data-focus="true" />
    </div>
</template>


<script>
    import ThreeRender_Opt from '@/js/threejs/three-optimize.js'

    export default {
        name: 'sphere-bg-container',

        mounted() {
            this.$refs.threeContainer.appendChild(ThreeRender_Opt)
        }
    }
</script>
