import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3100BD',
        accent: '#3100BD'
      },
      dark: {
        primary: '#3100BD',
        accent: '#3100BD'
      }
    }
  }
})
