<template>
    <div class="app-button--container">
        <div class="app-button light">
            <div class="inner">
                <div class="app-button--text">{{ label }}</div>
                <div class="app-button--bg-under"/>
                <div class="app-button--bg"/>
                <div class="app-button--text-animated">{{ label }}</div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name : 'app-button',
        
        props : {
            label : {
                type     : String,
                required : true
            }
        }
    }
</script>