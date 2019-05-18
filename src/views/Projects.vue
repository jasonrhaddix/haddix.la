<template>
    <div class="projects-view--container">
        <projects-item />
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