<template>
    <div>
        <!-- <img src="https://www.fillmurray.com/400/500" alt=""> -->
        <div style="color:red" @click="routeTohome">HOME</div>
    </div>
</template>


<script>
    export default {
        name: 'about-view',

        data:() => ({

        }),

        methods: {
            routeTohome() {
                this.$router.push({ path:'/' })
            }
        }
    }
</script>