<template>
    <div>
        <!-- <img src="https://www.fillmurray.com/600/600" alt=""> -->
        <div style="color: red" @click="routeToAbout">ABOUT</div>
        <div style="color: red" @click="routeToContact">CONTACT</div>
    </div>
</template>


<script>
    export default {
        name : 'home-view',

        data : () => ({

        }),

        methods : {
            routeToAbout() {
                this.$router.push({ name:'about' })
            },
            routeToContact() {
                this.$router.push({ name:'contact' })
            }
        }
    }
</script>
