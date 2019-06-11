<template>
    <div class="app-button__container">
        <div :class="['app-button', {'light':light}]">
            <div class="inner">
                <div class="text app-button__text">{{ label }}</div>
                <div class="app-button__bg-under"/>
                <div class="app-button__bg"/>
                <div class="text app-button__text-animated">{{ label }}</div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name : 'app-button',
        
        props: {
            label: {
                type : String,
                required : true
            },

            light: {
                type : Boolean,
                required : false,
                default: false
            }
        }
    }
</script>