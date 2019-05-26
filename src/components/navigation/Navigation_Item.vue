<template>
    <div class="navigation-item">
        <div class="nav-item nav-item__left">
            <h1 :style="styles">{{text}}</h1>
        </div>
        <div class="nav-item nav-item__right">
            <h1 :style="styles">{{text}}</h1>
        </div>
        <div class="nav-item nav-item__hidden">
            <h1 :style="styles">{{text}}</h1>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'navigation-item',
        
        props: {
            text: {
                type: String,
                required: true,
                default: null
            },
            styles: {
                type: Object,
                required: false,
                default: () => {}
            }
        }
    }
</script>