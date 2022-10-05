import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@/assets/icons/style.css'
import '@/assets/css/styleguide.css';

Vue.use(Vuetify);
const opts = {
    iconfont: 'md || mdi || fa || ub',
    theme:{
      themes:{
        dark:{
          background: 'red',
          primary: 'red',
          secondary: 'red',
          accent: 'red',
          error: '#D83934',
          info: 'red',
          success: '#4EC275',
          warning: 'red',
          alabaster: '#fafafb',
          bittersweet: '#f47975',
          black: '#000000',
          bonjour: '#e0e0e0',
          brightGray: '#2c3f4d',
          emerald: '#4dc175',
          emeraldtwo: '#20a789',
          emeraldthree: '#E8FBF5',
          green: '#1cb554',
          harlequin: '#33cc00',
          hawkesBlue: '#e4e0fb',
          hummingBird: '#d0f7eb',
          mystic: '#e4e7ec',
          romance: '#fcfcfd',
          santasGray: '#98a1b2',
          santasgraytwo: '#F6F7F8',
          white: '#ffffff',
          darkGreen:'#176E5D',
        },
        light:{
          success: '#4EC275',
          error: '#D83934',
          alabaster: '#fafafb',
          bittersweet: '#f47975',
          black: '#000000',
          bonjour: '#e0e0e0',
          brightGray: '#2c3f4d',
          emerald: '#4dc175',
          emeraldtwo: '#20a789',
          emeraldthree: '#E8FBF5',
          green: '#1cb554',
          harlequin: '#33cc00',
          hawkesBlue: '#e4e0fb',
          hummingBird: '#d0f7eb',
          mystic: '#e4e7ec',
          romance: '#fcfcfd',
          santasGray: '#98a1b2',
          santasgraytwo: '#F6F7F8',
          white: '#ffffff',
          darkGreen:'#176E5D',
        }
      }
    }
  }
  export default new Vuetify(opts)
