<template>
    <div class="contact-view">
       <div class="contact-view--inner">
            <div class="contact-view--content">
                <div class="contact--title">
                    <h2>Drop Me a Line</h2>
                </div>
                <div class="contact--form">
                    <div class="form-row form-flield--name">
                        <v-text-field
                            box
                            label="First Name" />
                        <v-text-field
                            box
                            label="Last Name" />
                    </div>
                    <div class="form-row">
                         <v-text-field
                            box
                            label="Email" />
                    </div>
                    <div class="form-row">
                         <v-textarea
                            box
                            no-resize
                            label="Message" />
                    </div>
                    <div class="form-row form-submit--container">
                        <app-btn
                        class="form-submit--btn"
                        light
                        label="Submit"
                        @click.native="navigateToRoute('contact')"/>
                    </div>
                </div>
                <div class="contact--map">
                    <google-map />
                </div>
            </div>
       </div>
    </div>
</template>


<script>
    import GoogleMap from '@/components/_global/Google_Map'
    import AppButton from '@/components/_global/App_Button'

    export default {
        name: 'Contact-view',

        components: {
            'google-map' : GoogleMap,
            'app-btn' : AppButton
        },

        data:() => ({

        }),
    }
</script>