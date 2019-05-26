<template>
    <div class="projects-view">
        <projects-item
            client="The Gary Group"
            title="Christmas Card"
            :image="require('@/assets/app/images/projects/christmas_card/img-1.jpg')" />
        <projects-item
            client="Skechers"
            title="Wayfinder Kiosk"
            :image="require('@/assets/app/images/projects/skechers_kiosk/img-1.png')" />
    </div>
</template>


<script>
    import ProjectsItem from '@/components/Projects/Projects_Item.vue'
    export default {
       name : 'projects-view',
       
       components: {
           'projects-item' : ProjectsItem
       }
    }
</script>