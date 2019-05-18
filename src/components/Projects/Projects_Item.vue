<template>
    <div class="projects-item--container">
        <div class="projects-item--inner">
            <div class="poly poly-1" />
            <div class="poly poly-2" />
            <div class="poly poly-3" />
            <div class="poly poly-4" />
        </div>
    </div>
</template>


<script>
    export default {
        
    }
</script>


<style lang="scss">
    .projects-item--container {
        margin-top: 10rem;

        .projects-item--inner {
            position: relative;
            height: 300px;
            width: 500px;
            margin: 0 auto;
            

            .poly {
                pointer-events: none;
                position: absolute;
                height: 100%;
                width: 100%;
                background: url('https://www.fillmurray.com/g/500/300') scroll no-repeat center center ;
                background-size: cover;
                transition: left 300ms ease-in-out, 
                            right 300ms ease-in-out,
                            top 300ms ease-in-out,
                            clip-path 300ms ease-in-out,
                            transform 300ms ease-in-out;
            
                &.poly-1 { 
                    left: -30px;
                    // transform: rotate(45deg);
                    // transform-origin: left center;
                    clip-path: polygon(0% 0%, 36% 50%, 0% 100%) }

                &.poly-2 {
                    left: 30px;
                    clip-path: polygon(0% 0%, 25% 0%, 59% 20%, 36% 50%); }

                &.poly-3 {
                    top: -30px;
                    clip-path: polygon(25% 0%, 75% 0%, 59% 20%); }
                
                &.poly-4 {
                    top: -30px;
                    right: 50px;
                    clip-path: polygon(75% 0%, 100% 0%, 100% 30%, 90% 50%, 59% 20%); }

            }

            &:hover {
                .poly-1 {
                    // transform: rotate(0deg);
                    clip-path: polygon(0% 0%, 16% 50%, 0% 100%);
                    left: 0px;
                }
                .poly-2 {
                    left: 0px;
                }
                .poly-3 {
                    top: 0px;
                }
                .poly-4 {
                    top: 0px;
                    right: 0px;
                }
            }
        }
    }
</style>

