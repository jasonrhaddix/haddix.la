<template>
    <div class="contact-view">
       <div class="contact-view--inner">
            <div class="contact-view--content">
                
                <contact-form />

                <div class="contact--map">
                    <google-map />
                </div>
            </div>
       </div>
    </div>
</template>


<script>
    import ContactForm from '@/components/Forms/Contact/Contact_Form'
    import GoogleMap from '@/components/_global/Google_Map'
   
    export default {
        name: 'contact-view',

        components: {
            'contact-form' : ContactForm,
            'google-map'   : GoogleMap
        }
    }
</script>