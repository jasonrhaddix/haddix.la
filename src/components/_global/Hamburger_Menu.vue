<template>
    <div :class="['hamburger-menu', {'open':menuState}]">
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="cross">
            <span></span>
            <span></span>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'hamburger-menu',

        props: {
            menuState: {
                type     : Boolean,
                required : true,
                default  : false
            }
        }
    }
</script>
