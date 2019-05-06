<template>
    <div class="navigation-container">
        <div>
            <!-- LOGO -->
            <!-- HAMBURGER -->
        </div>
        <div class="navigation-poly">
            <nav>
                <ul>

                </ul>
            </nav>
        </div>
    </div>
</template>


<script>

    import sitenav from '@/config/sitenav'

    export default {
        name: 'navigation',

        components: {

        },

        data:() => ({
            navItems: sitenav
        })
    }
</script>
